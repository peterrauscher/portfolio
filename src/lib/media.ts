import { XMLParser } from "fast-xml-parser";

// --- Types ---

export type GoodreadsBook = {
  title: string;
  author: string;
  coverUrl: string;
  link: string;
  shelf: "currently-reading" | "read";
};

export type LastFmTrack = {
  name: string;
  artist: string;
  album: string;
  albumArtUrl: string;
  url: string;
  nowPlaying: boolean;
  playedAt: string | null;
};

export type TraktEntry =
  | {
      type: "movie";
      title: string;
      year: number;
      watchedAt: string;
      slug: string;
      tmdbId: number | null;
      posterUrl: string | null;
    }
  | {
      type: "episode";
      showTitle: string;
      episodeTitle: string;
      season: number;
      episode: number;
      watchedAt: string;
      slug: string;
      tmdbId: number | null;
      posterUrl: string | null;
    };

// --- Goodreads ---

export async function getGoodreadsBooks(userId: string): Promise<GoodreadsBook[]> {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

  async function fetchShelf(shelf: "currently-reading" | "read"): Promise<GoodreadsBook[]> {
    try {
      const res = await fetch(
        `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return [];
      const xml = await res.text();
      const parsed = parser.parse(xml);
      const items: unknown[] = parsed?.rss?.channel?.item ?? [];
      const arr = Array.isArray(items) ? items : [items];
      return arr.slice(0, 1).map((item) => {
        const i = item as Record<string, unknown>;
        return {
          title: String(i.title ?? "").replace(/\s+by\s+.*$/, "").trim(),
          author: String(i.author_name ?? ""),
          coverUrl: String(i.book_image_url ?? i.book_small_image_url ?? ""),
          link: String(i.link ?? ""),
          shelf,
        };
      });
    } catch {
      return [];
    }
  }

  const [current, recent] = await Promise.all([
    fetchShelf("currently-reading"),
    fetchShelf("read"),
  ]);

  // prefer currently-reading; fall back to most recently read
  return (current.length > 0 ? current : recent).slice(0, 1);
}

// --- Last.fm ---

export async function getLastFmTracks(
  username: string,
  apiKey: string
): Promise<LastFmTrack[]> {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json&limit=1`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const tracks: unknown[] = data?.recenttracks?.track ?? [];
    const arr = Array.isArray(tracks) ? tracks : [tracks];
    return arr.slice(0, 1).map((t) => {
      const track = t as Record<string, unknown>;
      const attrs = track["@attr"] as Record<string, string> | undefined;
      const images = track.image as Array<Record<string, string>> | undefined;
      const mediumImg = images?.find((img) => img.size === "medium")?.[
        "#text"
      ] ?? "";
      const largeImg = images?.find((img) => img.size === "large")?.[
        "#text"
      ] ?? "";
      const artist = track.artist as Record<string, string> | undefined;
      const album = track.album as Record<string, string> | undefined;
      const date = track.date as Record<string, string> | undefined;
      return {
        name: String(track.name ?? ""),
        artist: artist?.["#text"] ?? "",
        album: album?.["#text"] ?? "",
        albumArtUrl: largeImg || mediumImg,
        url: String(track.url ?? ""),
        nowPlaying: attrs?.nowplaying === "true",
        playedAt: date?.["#text"] ?? null,
      };
    });
  } catch {
    return [];
  }
}

// --- Trakt.tv ---

async function fetchTmdbPoster(tmdbId: number, type: "movie" | "tv", apiKey: string): Promise<string | null> {
  try {
    const endpoint = type === "movie"
      ? `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${apiKey}`;
    const res = await fetch(endpoint, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json() as Record<string, unknown>;
    const path = String(data.poster_path ?? "");
    return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
  } catch {
    return null;
  }
}

export async function getTraktHistory(
  username: string,
  clientId: string
): Promise<TraktEntry[]> {
  const tmdbApiKey = process.env.TMDB_API_KEY ?? "";
  try {
    const res = await fetch(
      `https://api.trakt.tv/users/${encodeURIComponent(username)}/history?limit=1`,
      {
        headers: {
          "trakt-api-version": "2",
          "trakt-api-key": clientId,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Array<Record<string, unknown>>;
    const entries: TraktEntry[] = [];
    for (const item of data) {
      if (entries.length >= 1) break;
      const watchedAt = String(item.watched_at ?? "");
      if (item.type === "movie") {
        const movie = item.movie as Record<string, unknown> | undefined;
        if (!movie) continue;
        const ids = movie.ids as Record<string, unknown> | undefined;
        const tmdbId = ids?.tmdb ? Number(ids.tmdb) : null;
        const posterUrl = tmdbId && tmdbApiKey
          ? await fetchTmdbPoster(tmdbId, "movie", tmdbApiKey)
          : null;
        entries.push({
          type: "movie",
          title: String(movie.title ?? ""),
          year: Number(movie.year ?? 0),
          watchedAt,
          slug: String(ids?.slug ?? ""),
          tmdbId,
          posterUrl,
        });
      } else if (item.type === "episode") {
        const show = item.show as Record<string, unknown> | undefined;
        const ep = item.episode as Record<string, unknown> | undefined;
        if (!show || !ep) continue;
        const showIds = show.ids as Record<string, unknown> | undefined;
        const tmdbId = showIds?.tmdb ? Number(showIds.tmdb) : null;
        const posterUrl = tmdbId && tmdbApiKey
          ? await fetchTmdbPoster(tmdbId, "tv", tmdbApiKey)
          : null;
        entries.push({
          type: "episode",
          showTitle: String(show.title ?? ""),
          episodeTitle: String(ep.title ?? ""),
          season: Number(ep.season ?? 0),
          episode: Number(ep.number ?? 0),
          watchedAt,
          slug: String(showIds?.slug ?? ""),
          tmdbId,
          posterUrl,
        });
      }
    }
    return entries;
  } catch {
    return [];
  }
}

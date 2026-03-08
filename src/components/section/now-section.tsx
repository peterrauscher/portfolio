/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import Link from "next/link";
import { Tv } from "lucide-react";

function GoodreadsIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.346.026c.422-.083.859.037 1.179.325.346.284.55.705.557 1.153-.023.457-.247.88-.612 1.156l-2.182 1.748a.601.601 0 0 0-.255.43.52.52 0 0 0 .11.424 5.886 5.886 0 0 1 .832 6.58c-1.394 2.79-4.503 3.99-7.501 2.927a.792.792 0 0 0-.499-.01c-.224.07-.303.18-.453.383l-.014.02-.941 1.254s-.792.985.457.935c3.027-.119 3.817-.119 5.439-.01 2.641.18 3.806 1.903 3.806 3.275 0 1.623-1.036 3.383-3.809 3.383a117.46 117.46 0 0 0-5.517-.03c-.31.005-.597.013-.835.02-.228.006-.41.011-.52.011-.712 0-1.648-.186-1.66-1.068-.008-.729.624-1.12 1.11-1.172.43-.045.815.007 1.24.064.252.034.518.07.815.088.185.011.366.025.552.038.53.038 1.102.08 1.926.087.427.005.759.01 1.025.015.695.012.941.016 1.28-.015 1.248-.112 1.832-.61 1.832-1.376 0-.805-.584-1.264-1.698-1.414-1.564-.213-2.33-.163-3.72-.074a87.66 87.66 0 0 1-1.669.095c-.608.029-2.449.026-2.682-1.492-.053-.416-.073-1.116.807-2.325l.75-1.003c.36-.49.582-.898.053-1.559 0 0-.39-.468-.52-.638-1.215-1.587-1.512-4.08-.448-6.114 1.577-3.011 5.4-4.26 8.37-2.581.253.143.438.203.655.163.201-.032.27-.167.363-.344.02-.04.042-.082.067-.126.004-.01.241-.465.535-1.028l.734-1.41a1.493 1.493 0 0 1 1.041-.785ZM9.193 13.243c1.854.903 3.912.208 5.254-2.47 1.352-2.699.827-5.11-1.041-6.023C10.918 3.537 8.81 5.831 8.017 7.41c-1.355 2.698-.717 4.886 1.147 5.818Z" />
    </svg>
  );
}

function TraktIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="m15.082 15.107-.73-.73 9.578-9.583a4.499 4.499 0 0 0-.115-.575L13.662 14.382l1.08 1.08-.73.73-1.81-1.81L23.422 3.144c-.075-.15-.155-.3-.25-.44L11.508 14.377l2.154 2.155-.73.73-7.193-7.199.73-.73 4.309 4.31L22.546 1.86A5.618 5.618 0 0 0 18.362 0H5.635A5.637 5.637 0 0 0 0 5.634V18.37A5.632 5.632 0 0 0 5.635 24h12.732C21.477 24 24 21.48 24 18.37V6.19l-8.913 8.918zm-4.314-2.155L6.814 8.988l.73-.73 3.954 3.96zm1.075-1.084-3.954-3.96.73-.73 3.959 3.96zm9.853 5.688a4.141 4.141 0 0 1-4.14 4.14H6.438a4.144 4.144 0 0 1-4.139-4.14V6.438A4.141 4.141 0 0 1 6.44 2.3h10.387v1.04H6.438c-1.71 0-3.099 1.39-3.099 3.1V17.55c0 1.71 1.39 3.105 3.1 3.105h11.117c1.71 0 3.1-1.395 3.1-3.105v-1.754h1.04v1.754z" />
    </svg>
  );
}

function YoutubeMusicIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
    </svg>
  );
}
import {
  getGoodreadsBooks,
  getTraktHistory,
  type GoodreadsBook,
  type TraktEntry,
} from "@/lib/media";

// --- Skeleton ---

function WidgetSkeleton() {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 min-h-[220px]">
      <div className="flex items-center gap-2 pb-2 border-b">
        <div className="size-4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
      </div>
      {[...Array(1)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="size-10 rounded bg-muted animate-pulse flex-none" />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Goodreads Widget ---

async function GoodreadsWidget() {
  const userId = process.env.GOODREADS_USER_ID;
  const books: GoodreadsBook[] = userId ? await getGoodreadsBooks(userId) : [];

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between pb-2 border-b gap-2">
        <div className="flex items-center gap-2">
          <GoodreadsIcon className="size-4 text-amber-500" />
          <span className="text-sm font-semibold">Reading</span>
        </div>
        {userId && (
          <Link
            href={`https://www.goodreads.com/user/show/${userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Goodreads →
          </Link>
        )}
      </div>
      {books.length === 0 ? (
        <p className="text-xs text-muted-foreground py-2">Nothing to show yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {books.map((book, i) => (
            <li key={i}>
              <Link
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="size-10 rounded object-cover flex-none shadow-sm ring-1 ring-border"
                  />
                ) : (
                  <div className="size-10 rounded bg-muted flex-none" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium leading-tight truncate group-hover:underline underline-offset-2">
                    {book.title}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {book.author}
                  </span>
                  {book.shelf === "currently-reading" && (
                    <span className="text-[10px] text-amber-500 font-medium mt-0.5">
                      reading now
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Listening Widget ---

const LISTENING_TRACK = {
  name: "Bangladesh",
  artist: "The Sound of Animals Fighting",
  url: "https://music.youtube.com/watch?v=NHqCfPvP5o4",
  albumArtUrl: "/bangladesh-album.png",
};

function ListeningWidget() {
  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between pb-2 border-b gap-2">
        <div className="flex items-center gap-2">
          <YoutubeMusicIcon className="size-4 text-red-500" />
          <span className="text-sm font-semibold">Listening</span>
        </div>
        <Link
          href={LISTENING_TRACK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          YT Music →
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href={LISTENING_TRACK.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <img
              src={LISTENING_TRACK.albumArtUrl}
              alt={LISTENING_TRACK.name}
              className="size-10 rounded object-cover flex-none shadow-sm ring-1 ring-border"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium leading-tight truncate group-hover:underline underline-offset-2">
                {LISTENING_TRACK.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {LISTENING_TRACK.artist}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

// --- Trakt Widget ---

function formatWatchedAt(iso: string): string {
  try {
    const d = new Date(iso);
    const now = Date.now();
    const diff = Math.floor((now - d.getTime()) / 1000);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

async function TraktWidget() {
  const username = process.env.TRAKT_USERNAME;
  const clientId = process.env.TRAKT_CLIENT_ID;
  const history: TraktEntry[] =
    username && clientId ? await getTraktHistory(username, clientId) : [];

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2 h-full">
      <div className="flex items-center justify-between pb-2 border-b gap-2">
        <div className="flex items-center gap-2">
          <TraktIcon className="size-4 text-red-500" />
          <span className="text-sm font-semibold">Watching</span>
        </div>
        {username && (
          <Link
            href={`https://trakt.tv/users/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Trakt →
          </Link>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-xs text-muted-foreground py-2">Nothing to show yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((entry, i) => {
            const href =
              entry.type === "movie"
                ? `https://trakt.tv/movies/${entry.slug}`
                : `https://trakt.tv/shows/${entry.slug}`;
            const title =
              entry.type === "movie"
                ? `${entry.title} (${entry.year})`
                : entry.showTitle;
            const subtitle =
              entry.type === "movie"
                ? "movie"
                : `S${String(entry.season).padStart(2, "0")}E${String(entry.episode).padStart(2, "0")} · ${entry.episodeTitle}`;

            return (
              <li key={i}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  {entry.posterUrl ? (
                    <img
                      src={entry.posterUrl}
                      alt={entry.type === "movie" ? entry.title : entry.showTitle}
                      className="size-10 rounded object-cover flex-none shadow-sm ring-1 ring-border"
                    />
                  ) : (
                    <div className="size-10 rounded bg-muted flex-none flex items-center justify-center">
                      <Tv className="size-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-medium leading-tight truncate group-hover:underline underline-offset-2">
                      {title}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {subtitle}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      {formatWatchedAt(entry.watchedAt)}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// --- Section ---

export default function NowSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <div className="flex items-center w-full gap-3">
        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <h2 className="text-xl font-bold whitespace-nowrap">Now</h2>
        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Suspense fallback={<WidgetSkeleton />}>
          <GoodreadsWidget />
        </Suspense>
        <ListeningWidget />
        <Suspense fallback={<WidgetSkeleton />}>
          <TraktWidget />
        </Suspense>
      </div>
    </div>
  );
}

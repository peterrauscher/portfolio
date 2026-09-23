import { XMLParser } from "fast-xml-parser";

// --- Types ---

export type GoodreadsBook = {
  title: string;
  author: string;
  coverUrl: string;
  link: string;
  shelf: "currently-reading" | "read";
};

// --- Goodreads ---

export async function getGoodreadsBooks(
  userId: string,
): Promise<GoodreadsBook[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  async function fetchShelf(
    shelf: "currently-reading" | "read",
  ): Promise<GoodreadsBook[]> {
    try {
      const res = await fetch(
        `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) return [];
      const xml = await res.text();
      const parsed = parser.parse(xml);
      const items: unknown[] = parsed?.rss?.channel?.item ?? [];
      const arr = Array.isArray(items) ? items : [items];
      return arr.slice(0, 1).map((item) => {
        const i = item as Record<string, unknown>;
        return {
          title: String(i.title ?? "")
            .replace(/\s+by\s+.*$/, "")
            .trim(),
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

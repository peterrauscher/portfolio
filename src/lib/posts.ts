export function sortPostsByDate<
  T extends { publishedAt: string; _meta: { path: string } },
>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => {
    const publishedAtA = new Date(a.publishedAt).getTime();
    const publishedAtB = new Date(b.publishedAt).getTime();

    if (publishedAtA !== publishedAtB) {
      return publishedAtB - publishedAtA;
    }

    return a._meta.path.localeCompare(b._meta.path);
  });
}

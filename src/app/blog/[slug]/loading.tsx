export default function BlogPostLoading() {
  return (
    <section id="blog" aria-busy="true" aria-label="Loading post">
      <div className="border-border bg-muted/50 mb-6 h-8 w-28 animate-pulse rounded-lg border" />
      <div className="flex flex-col gap-4">
        <div className="bg-muted h-10 w-full max-w-xl animate-pulse rounded-md" />
        <div className="bg-muted h-4 w-32 animate-pulse rounded-md" />
      </div>
      <div className="bg-border my-6 h-px w-full" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted h-4 animate-pulse rounded-md"
            style={{ width: `${85 - (i % 3) * 12}%` }}
          />
        ))}
      </div>
    </section>
  );
}

export default function BlogLoading() {
  return (
    <section id="blog" aria-busy="true" aria-label="Loading blog">
      <div className="bg-muted mb-2 h-8 w-40 animate-pulse rounded-md" />
      <div className="bg-muted mb-8 h-4 w-72 max-w-full animate-pulse rounded-md" />
      <div className="flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-x-2">
            <div className="bg-muted mt-1 h-3 w-6 shrink-0 animate-pulse rounded" />
            <div className="flex flex-1 flex-col gap-y-2">
              <div className="bg-muted h-5 w-3/4 max-w-md animate-pulse rounded-md" />
              <div className="bg-muted h-3 w-24 animate-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */

interface MediaContainerProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  className?: string;
}

export function MediaContainer({
  src,
  alt = "",
  type = "image",
  className = "",
}: MediaContainerProps) {
  return (
    <div
      className={`ring-muted flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg ring-4 ${className}`}
    >
      {type === "image" ? (
        <img
          src={src}
          alt={alt}
          className="h-full max-h-full w-full max-w-full object-cover object-center"
        />
      ) : (
        <video
          src={src}
          className="h-full max-h-full w-full max-w-full object-cover object-center"
          controls
        />
      )}
    </div>
  );
}

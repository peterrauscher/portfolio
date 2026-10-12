import manifestList from "./photos-manifest.json";

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  year?: string;
  favorite?: boolean;
  width?: number;
  height?: number;
  aspect?: "landscape" | "portrait";
};

// All synced and optimized personal photos from content/photos/
export const ALL_PHOTOS: Photo[] = manifestList.map((item) => ({
  src: item.src,
  alt: item.caption || "Personal capture",
  caption: item.caption || "untitled",
  year: item.year || "2026",
  favorite: item.favorite || false,
  width: item.width,
  height: item.height,
  aspect: item.aspect as "landscape" | "portrait",
}));

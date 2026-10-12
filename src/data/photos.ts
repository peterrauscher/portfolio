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

// Backward compatibility map for lab prototypes
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const PHOTOS = {
  // Map old shot keys to top photos in manifest
  shot1: ALL_PHOTOS[0] ?? {
    src: "/photos/nuremberg.webp",
    alt: "Nuremberg",
    caption: "Nuremberg",
    credit: "Peter Rauscher",
  },
  shot2: ALL_PHOTOS[1] ?? {
    src: "/photos/prague.webp",
    alt: "Prague",
    caption: "Prague",
    credit: "Peter Rauscher",
  },
  shot3: ALL_PHOTOS[2] ?? {
    src: "/photos/barnegat.webp",
    alt: "Barnegat Bay",
    caption: "Barnegat Bay, NJ",
    credit: "Peter Rauscher",
  },
  shot4: ALL_PHOTOS[3] ?? {
    src: "/photos/munich.webp",
    alt: "Oktoberfest",
    caption: "Oktoberfest, Munich",
    credit: "Peter Rauscher",
  },
  shot5: ALL_PHOTOS[4] ?? {
    src: "/photos/toms-river.webp",
    alt: "Toms River",
    caption: "Toms River, NJ",
    credit: "Peter Rauscher",
  },
  hill: {
    src: unsplash("1522463475764-0fe09a698cef"),
    alt: "A white house on an orange hill against a blue sky",
    caption: "House on a hill",
    credit: "Unsplash",
  },
  curve: {
    src: unsplash("1552053090-cca79db0ff7f"),
    alt: "Pastel curved walls under a pale green sky",
    caption: "Curve, pastel stucco",
    credit: "Unsplash",
  },
  runner: {
    src: unsplash("1652447198049-d70d2b77ddb1"),
    alt: "A runner in a grey jacket, motion blurred against a wall",
    caption: "Runner, long shutter",
    credit: "Unsplash",
  },
  river: {
    src: unsplash("1707094703510-370a47e7dd97"),
    alt: "A city skyline seen across a river in hazy light",
    caption: "City across a river",
    credit: "Unsplash",
  },
  spiral: {
    src: unsplash("1609090219933-efdc50f12a5a"),
    alt: "White spiral stairs against concrete, black and white",
    caption: "Spiral stair",
    credit: "Unsplash",
  },
  oculus: {
    src: unsplash("1770885492430-848df9bc5378"),
    alt: "Warm light falling through a round opening onto a dark wall",
    caption: "Oculus, late light",
    credit: "Unsplash",
  },
  bird: {
    src: unsplash("1527286607633-84a4b8297928"),
    alt: "A small bird on the roof of a white concrete building",
    caption: "Window, with bird",
    credit: "Unsplash",
  },
  slats: {
    src: unsplash("1725197953105-cde488f3f5bf"),
    alt: "Sunlight through wooden slats on a warm floor",
    caption: "Slat shadows",
    credit: "Unsplash",
  },
  dresser: {
    src: unsplash("1780644453921-efd25244e244"),
    alt: "Warm sunset light on a dresser with a laptop",
    caption: "Desk at dusk",
    credit: "Unsplash",
  },
  lamp: {
    src: unsplash("1766431015004-315aa01141f9"),
    alt: "A wooden desk with a lamp beside a window",
    caption: "Workbench",
    credit: "Unsplash",
  },
  stairwell: {
    src: unsplash("1641999164451-c001c719c04d"),
    alt: "A concrete stairwell lit from above",
    caption: "Stairwell",
    credit: "Unsplash",
  },
  window: {
    src: unsplash("1712249363853-47098b4a62ae"),
    alt: "An orange window shadow on a dark wall",
    caption: "Window light",
    credit: "Unsplash",
  },
  crowd: {
    src: unsplash("1506787497326-c2736dde1bef"),
    alt: "People walking toward a modern building, black and white",
    caption: "Commuters",
    credit: "Unsplash",
  },
  courtyard: {
    src: unsplash("1602128110234-2d11c0aaadfe"),
    alt: "Two trees beside a white concrete wall in soft light",
    caption: "Courtyard",
    credit: "Unsplash",
  },
  cyclist: {
    src: unsplash("1531259960912-746d0c872ee6"),
    alt: "A cyclist photographed with a panning motion blur",
    caption: "Cyclist, panned",
    credit: "Unsplash",
  },
} as const;

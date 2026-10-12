import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RAW_DIR = path.join(process.cwd(), "content/photos");
const OUT_DIR = path.join(process.cwd(), "public/photos");
const MANIFEST_PATH = path.join(RAW_DIR, "manifest.json");
const GENERATED_DATA_PATH = path.join(
  process.cwd(),
  "src/data/photos-manifest.json",
);

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

export type PhotoManifestEntry = {
  file: string;
  caption?: string;
  year?: string;
  favorite?: boolean;
};

// 1. Load or create manifest
let manifest: PhotoManifestEntry[] = [];
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch (err) {
    console.error("Warning: Could not parse manifest.json, rebuilding:", err);
  }
}

const existingByFile = new Map<string, PhotoManifestEntry>(
  manifest.map((item) => [item.file, item]),
);

// 2. Discover all raw images in content/photos/
const supportedExts = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".tiff",
]);
const rawFiles = fs.readdirSync(RAW_DIR).filter((f) => {
  if (f.startsWith(".") || f === "manifest.json") return false;
  return supportedExts.has(path.extname(f).toLowerCase());
});

console.log(`📸 Processing ${rawFiles.length} photos in content/photos/ ...`);

// Helper to sanitize filename into clean webp basename
function toWebpBasename(filename: string): string {
  const parsed = path.parse(filename);
  // Clean special chars, timestamps, guids into clean lowercase identifier
  const clean = parsed.name
    .replace(/[^\w-]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
  return `${clean}.webp`;
}

// 3. Process each photo with sharp (auto-rotate EXIF, resize max 1200px, WebP quality 84)
const processedList = [];

for (const rawFile of rawFiles) {
  const rawPath = path.join(RAW_DIR, rawFile);
  const outWebpName = toWebpBasename(rawFile);
  const outPath = path.join(OUT_DIR, outWebpName);

  let existing = existingByFile.get(rawFile);
  if (!existing) {
    // Generate clean placeholder caption from filename or EXIF
    existing = {
      file: rawFile,
      caption: "",
      year: "2026",
      favorite: false,
    };
    existingByFile.set(rawFile, existing);
  }

  // Extract EXIF date if year is missing
  let metaWidth = 1200;
  let metaHeight = 900;

  try {
    const img = sharp(rawPath);
    const meta = await img.metadata();

    // Auto-extract year from EXIF if not set
    if (!existing.year && meta.exif) {
      const exifStr = meta.exif.toString("latin1");
      const match = exifStr.match(/(\d{4}):\d{2}:\d{2}/);
      if (match && match[1]) {
        existing.year = match[1];
      }
    }

    // Process & write to public/photos if missing or raw is newer
    let needsProcess = true;
    if (fs.existsSync(outPath)) {
      const rawMtime = fs.statSync(rawPath).mtimeMs;
      const outMtime = fs.statSync(outPath).mtimeMs;
      if (outMtime > rawMtime) {
        needsProcess = false;
      }
    }

    if (needsProcess) {
      const processed = await sharp(rawPath)
        .rotate() // auto-orient by EXIF orientation!
        .resize({
          width: 1200,
          height: 1200,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 84, effort: 4 })
        .toFile(outPath);

      metaWidth = processed.width;
      metaHeight = processed.height;
      const outKB = Math.round(processed.size / 1024);
      console.log(`  ✓ Optimized ${rawFile} -> ${outWebpName} (${outKB} KB)`);
    } else {
      const outMeta = await sharp(outPath).metadata();
      metaWidth = outMeta.width ?? 1200;
      metaHeight = outMeta.height ?? 900;
    }
  } catch (err) {
    console.error(`  ✕ Error processing ${rawFile}:`, err);
    continue;
  }

  processedList.push({
    rawFile,
    src: `/photos/${outWebpName}`,
    caption: existing.caption || rawFile.replace(/\.[^.]+$/, ""),
    year: existing.year || "2026",
    favorite: existing.favorite ?? false,
    width: metaWidth,
    height: metaHeight,
    aspect: metaWidth / metaHeight >= 1 ? "landscape" : "portrait",
  });
}

// 4. Update manifest.json with all files (preserving existing human edits)
const updatedManifest: PhotoManifestEntry[] = rawFiles.map((file) => {
  const entry = existingByFile.get(file)!;
  return {
    file: entry.file,
    caption: entry.caption || "",
    year: entry.year || "2026",
    favorite: entry.favorite ?? false,
  };
});

fs.writeFileSync(
  MANIFEST_PATH,
  JSON.stringify(updatedManifest, null, 2),
  "utf-8",
);

// 5. Write generated data file for the Next.js app to import cleanly
fs.mkdirSync(path.dirname(GENERATED_DATA_PATH), { recursive: true });
fs.writeFileSync(
  GENERATED_DATA_PATH,
  JSON.stringify(processedList, null, 2),
  "utf-8",
);

console.log(
  `\n✨ Success: ${processedList.length} photos synced and optimized in public/photos/`,
);
console.log(
  `📝 Manifest updated at ${path.relative(process.cwd(), MANIFEST_PATH)}`,
);

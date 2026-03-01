import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const PUBLIC_DIR = './public';
const MAX_WIDTH = 400; // Max width for logos
const QUALITY = 85; // JPEG/WebP quality

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();

  // Skip SVG files
  if (ext === '.svg') {
    console.log(`⏭️  Skipping SVG: ${filePath}`);
    return;
  }

  // Only process image files
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    console.log(`📸 Processing: ${filePath} (${metadata.width}x${metadata.height}, ${(metadata.size / 1024).toFixed(2)}KB)`);

    // Resize if image is too large
    let pipeline = image.clone();
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to appropriate format and optimize
    if (ext === '.png') {
      await pipeline
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toFile(filePath + '.optimized');
    } else {
      await pipeline
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(filePath + '.optimized');
    }

    // Get size of optimized file
    const optimizedStats = await stat(filePath + '.optimized');
    const originalStats = await stat(filePath);
    const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(2);

    console.log(`✅ Optimized: ${(optimizedStats.size / 1024).toFixed(2)}KB (${savings}% reduction)`);

    // Rename optimized file to replace original
    await sharp(filePath + '.optimized').toFile(filePath + '.tmp');
    const { rename, unlink } = await import('fs/promises');
    await unlink(filePath + '.optimized');
    await unlink(filePath);
    await rename(filePath + '.tmp', filePath);

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  const files = await readdir(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!file.startsWith('.') && file !== 'node_modules') {
        await processDirectory(filePath);
      }
    } else if (stats.isFile()) {
      await optimizeImage(filePath);
    }
  }
}

console.log('🚀 Starting image optimization...\n');
await processDirectory(PUBLIC_DIR);
console.log('\n✨ Image optimization complete!');

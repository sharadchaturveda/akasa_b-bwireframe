const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const publicImagesDir = path.join(__dirname, '../public/images');

// List of images to convert, based on the previous report where variants were missing.
// These paths are relative to the 'public' directory, so they start with 'images/'.
const imagesToConvert = [
  'images/menu/hero/gallery-3.jpg',
  'images/menu/hero/gallery-6.jpg',
  'images/menu/drinks/hero/hero.jpg',
  'images/menu/vegan/hero/hero.jpg',
  'images/menu/bar-bites/hero/hero.jpg',
  'images/menu/a-la-carte/hero/hero.jpg',
  'images/menu/soul-food-weekends/hero/hero.jpg',
  'images/menu/tasting-menu/hero/hero.jpg',
  'images/menu/set-lunch/hero/hero.jpg',
  'images/menu/hero/gallery-1.jpg',
  'images/home/testimonials/background-alt.jpg',
  'images/home/gallery/awards.jpg',
  'images/home/hero/carousel/hero1.jpg',
];

const conversionReport = {
  converted: [],
  failed: [],
  skipped: [],
};

async function checkAndConvertImage(imagePathRelative) {
  const fullImagePath = path.join(__dirname, '../public', imagePathRelative);
  const { dir, name, ext } = path.parse(fullImagePath);

  const avifPath = path.join(dir, `${name}.avif`);
  const webpPath = path.join(dir, `${name}.webp`);

  const avifExists = await fs.pathExists(avifPath);
  const webpExists = await fs.pathExists(webpPath);

  if (avifExists && webpExists) {
    conversionReport.skipped.push({ image: imagePathRelative, reason: 'AVIF and WebP variants already exist.' });
    return;
  }

  // Create backup subfolder
  const backupDir = path.join(dir, '.backup');
  await fs.ensureDir(backupDir);
  const backupPath = path.join(backupDir, `${name}${ext}`);

  try {
    // Backup original
    await fs.copy(fullImagePath, backupPath);

    // Convert to AVIF
    const tempAvifPath = path.join(dir, `${name}.temp.avif`);
    await sharp(fullImagePath)
      .toFormat('avif')
      .toFile(tempAvifPath);

    // Convert to WebP
    const tempWebpPath = path.join(dir, `${name}.temp.webp`);
    await sharp(fullImagePath)
      .toFormat('webp')
      .toFile(tempWebpPath);

    // Validate temp files
    const avifStats = await fs.stat(tempAvifPath);
    const webpStats = await fs.stat(tempWebpPath);

    if (avifStats.size > 0 && webpStats.size > 0) {
      // Atomically rename
      await fs.rename(tempAvifPath, avifPath);
      await fs.rename(tempWebpPath, webpPath);

      conversionReport.converted.push({ image: imagePathRelative, avif: !avifExists, webp: !webpExists });
    } else {
      throw new Error('Converted file size is 0 bytes.');
    }
  } catch (error) {
    console.error(`Failed to convert ${imagePathRelative}: ${error.message}`);
    conversionReport.failed.push({ image: imagePathRelative, reason: error.message });

    // Clean up temp files and restore original if necessary
    await fs.remove(path.join(dir, `${name}.temp.avif`)).catch(() => {});
    await fs.remove(path.join(dir, `${name}.temp.webp`)).catch(() => {});
    // If the original was somehow affected (though copy should prevent this), restore from backup
    // This part is more for robustness, as copy doesn't alter the original.
    if (await fs.pathExists(backupPath)) {
        // Potentially restore if original was deleted/corrupted, though not expected with fs.copy
        // await fs.copy(backupPath, fullImagePath);
        await fs.remove(backupPath); // Clean up backup after failure if no restore needed
    }
  } finally {
    // Ensure backup is cleaned up if conversion was successful
    if (conversionReport.converted.some(item => item.image === imagePathRelative)) {
      await fs.remove(backupPath).catch(() => {});
    }
  }
}

async function main() {
  console.log('Starting image conversion process...');
  for (const imagePath of imagesToConvert) {
    await checkAndConvertImage(imagePath);
  }

  console.log('\n--- Conversion Report ---');
  if (conversionReport.converted.length > 0) {
    console.log('\nSuccessfully Converted:');
    conversionReport.converted.forEach(item => {
      console.log(`  - ${item.image} (AVIF: ${item.avif ? 'New' : 'Existing'}, WebP: ${item.webp ? 'New' : 'Existing'})`);
    });
  }

  if (conversionReport.failed.length > 0) {
    console.log('\nFailed Conversions:');
    conversionReport.failed.forEach(item => {
      console.log(`  - ${item.image}: ${item.reason}`);
    });
  }

  if (conversionReport.skipped.length > 0) {
    console.log('\nSkipped Images (variants already exist):');
    conversionReport.skipped.forEach(item => {
      console.log(`  - ${item.image}: ${item.reason}`);
    });
  }

  console.log('\nConversion process finished.');
}

main();

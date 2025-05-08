/**
 * This script compresses the hero mobile video to make it smaller and more suitable for mobile devices.
 * 
 * Requirements:
 * - Node.js
 * - FFmpeg installed and available in PATH
 * 
 * Usage:
 * node scripts/compress-video.js
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Paths
const inputVideo = path.join(__dirname, '../public/images/home/hero/mobile-video/heromobilevid.mp4');
const outputSmall = path.join(__dirname, '../public/images/home/hero/mobile-video/heromobilevid-small.mp4');
const outputCompressed = path.join(__dirname, '../public/images/home/hero/mobile-video/heromobilevid-compressed.mp4');

// Check if input file exists
if (!fs.existsSync(inputVideo)) {
  console.error(`Input video not found: ${inputVideo}`);
  process.exit(1);
}

// Create smaller version (reduced resolution)
console.log('Creating smaller version...');
exec(`ffmpeg -i "${inputVideo}" -vf "scale=720:-1" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k "${outputSmall}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating smaller version: ${error.message}`);
    return;
  }
  console.log(`Successfully created smaller version: ${outputSmall}`);
  
  // Get file sizes
  const originalSize = fs.statSync(inputVideo).size / (1024 * 1024);
  const smallSize = fs.statSync(outputSmall).size / (1024 * 1024);
  console.log(`Original size: ${originalSize.toFixed(2)} MB`);
  console.log(`Small version size: ${smallSize.toFixed(2)} MB`);
  console.log(`Reduction: ${(100 - (smallSize / originalSize) * 100).toFixed(2)}%`);
});

// Create compressed version (same resolution, higher compression)
console.log('Creating compressed version...');
exec(`ffmpeg -i "${inputVideo}" -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k "${outputCompressed}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating compressed version: ${error.message}`);
    return;
  }
  console.log(`Successfully created compressed version: ${outputCompressed}`);
  
  // Get file sizes
  const originalSize = fs.statSync(inputVideo).size / (1024 * 1024);
  const compressedSize = fs.statSync(outputCompressed).size / (1024 * 1024);
  console.log(`Original size: ${originalSize.toFixed(2)} MB`);
  console.log(`Compressed version size: ${compressedSize.toFixed(2)} MB`);
  console.log(`Reduction: ${(100 - (compressedSize / originalSize) * 100).toFixed(2)}%`);
});

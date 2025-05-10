/**
 * Convert large JPG/PNG images to AVIF format
 * 
 * This script finds large image files and converts them to AVIF format
 * for better performance. It preserves the original files and creates
 * optimized versions in the same directory with .avif extension.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const MIN_SIZE_KB = 300; // Only convert files larger than this size
const QUALITY = 75; // AVIF quality (0-100)
const IMAGE_DIRS = [
  'public/images/home/hero',
  'public/images/menu',
  'public/images/events',
  'public/images/offers',
];

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('Error: sharp module is not installed. Please install it with:');
  console.error('npm install sharp');
  process.exit(1);
}

// Import sharp after checking
const sharp = require('sharp');

// Function to get file size in KB
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / 1024;
}

// Function to convert a file to AVIF
async function convertToAVIF(filePath) {
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath, path.extname(filePath));
  const outputPath = path.join(fileDir, `${fileName}.avif`);
  
  // Skip if AVIF already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${filePath} - AVIF already exists`);
    return;
  }
  
  try {
    await sharp(filePath)
      .avif({ quality: QUALITY })
      .toFile(outputPath);
    
    const originalSize = getFileSizeInKB(filePath);
    const newSize = getFileSizeInKB(outputPath);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`Converted ${filePath} to AVIF`);
    console.log(`  Original: ${originalSize.toFixed(2)} KB`);
    console.log(`  AVIF: ${newSize.toFixed(2)} KB`);
    console.log(`  Savings: ${savings}%`);
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
  }
}

// Function to find and convert large images
async function findAndConvertLargeImages() {
  let totalFiles = 0;
  let convertedFiles = 0;
  
  for (const dir of IMAGE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}`);
      continue;
    }
    
    // Find all JPG and PNG files recursively
    const findCmd = process.platform === 'win32'
      ? `dir /s /b "${dir}\\*.jpg" "${dir}\\*.jpeg" "${dir}\\*.png"`
      : `find "${dir}" -type f \\( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \\)`;
    
    try {
      const files = execSync(findCmd, { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean);
      
      for (const file of files) {
        totalFiles++;
        const fileSize = getFileSizeInKB(file);
        
        if (fileSize >= MIN_SIZE_KB) {
          await convertToAVIF(file);
          convertedFiles++;
        }
      }
    } catch (error) {
      console.error(`Error finding files in ${dir}:`, error);
    }
  }
  
  console.log(`\nSummary:`);
  console.log(`  Total image files: ${totalFiles}`);
  console.log(`  Converted to AVIF: ${convertedFiles}`);
}

// Run the script
console.log('Starting image conversion to AVIF...');
findAndConvertLargeImages().then(() => {
  console.log('Conversion complete!');
});

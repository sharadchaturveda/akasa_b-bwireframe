/**
 * Update image references to use AVIF format
 * 
 * This script finds image references in the codebase and updates them
 * to use AVIF format when available. It only updates references to
 * images that have been converted to AVIF.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = 'src';
const PUBLIC_DIR = 'public';
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Function to find all AVIF images
function findAvifImages() {
  const avifImages = new Set();
  
  const findCmd = process.platform === 'win32'
    ? `dir /s /b "${PUBLIC_DIR}\\*.avif"`
    : `find "${PUBLIC_DIR}" -type f -name "*.avif"`;
  
  try {
    const files = execSync(findCmd, { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    
    for (const file of files) {
      // Get the path relative to the public directory
      const relativePath = file.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
      // Get the base name without extension
      const baseName = path.basename(relativePath, '.avif');
      // Get the directory
      const dirName = path.dirname(relativePath);
      // Add the base path (without extension) to the set
      avifImages.add(`${dirName}/${baseName}`);
    }
  } catch (error) {
    console.error('Error finding AVIF images:', error);
  }
  
  return avifImages;
}

// Function to find all source files
function findSourceFiles() {
  const sourceFiles = [];
  
  const findCmd = process.platform === 'win32'
    ? `dir /s /b "${SRC_DIR}\\*.*"`
    : `find "${SRC_DIR}" -type f`;
  
  try {
    const files = execSync(findCmd, { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        sourceFiles.push(file);
      }
    }
  } catch (error) {
    console.error('Error finding source files:', error);
  }
  
  return sourceFiles;
}

// Function to update image references in a file
function updateImageReferences(filePath, avifImages) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Find image references
    const imgRegex = /src=["']([^"']+\.(jpg|jpeg|png))["']/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      const [fullMatch, imgPath, ext] = match;
      
      // Skip if already using AVIF
      if (imgPath.endsWith('.avif')) {
        continue;
      }
      
      // Normalize the path
      const normalizedPath = imgPath.startsWith('/')
        ? imgPath
        : `/${imgPath}`;
      
      // Get the base path without extension
      const basePath = normalizedPath.substring(0, normalizedPath.lastIndexOf('.'));
      
      // Check if we have an AVIF version
      if (avifImages.has(basePath)) {
        // Replace the extension with .avif
        const avifPath = `${basePath}.avif`;
        const newReference = fullMatch.replace(imgPath, avifPath);
        
        // Replace in the content
        content = content.replace(fullMatch, newReference);
        modified = true;
        
        console.log(`Updated in ${filePath}:`);
        console.log(`  ${imgPath} -> ${avifPath}`);
      }
    }
    
    // Save the file if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Saved changes to ${filePath}`);
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
  }
}

// Main function
async function main() {
  console.log('Finding AVIF images...');
  const avifImages = findAvifImages();
  console.log(`Found ${avifImages.size} AVIF images`);
  
  console.log('Finding source files...');
  const sourceFiles = findSourceFiles();
  console.log(`Found ${sourceFiles.length} source files`);
  
  console.log('Updating image references...');
  let updatedFiles = 0;
  
  for (const file of sourceFiles) {
    const before = fs.readFileSync(file, 'utf8');
    updateImageReferences(file, avifImages);
    const after = fs.readFileSync(file, 'utf8');
    
    if (before !== after) {
      updatedFiles++;
    }
  }
  
  console.log(`\nSummary:`);
  console.log(`  Updated ${updatedFiles} files`);
}

// Run the script
console.log('Starting image reference update...');
main().then(() => {
  console.log('Update complete!');
});

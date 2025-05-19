/**
 * Cleanup Script for Performance Optimization
 * 
 * This script creates backup directories and moves redundant files there.
 */

const fs = require('fs');
const path = require('path');

// Create backup directories
const createBackupDirs = () => {
  const dirs = [
    'public/scripts/__deprecated',
    'public/styles/__deprecated',
    'src/styles/__deprecated'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } else {
      console.log(`Directory already exists: ${dir}`);
    }
  });
};

// Move a file to the backup directory
const moveFile = (source, destDir) => {
  if (!fs.existsSync(source)) {
    console.log(`File not found: ${source}`);
    return;
  }
  
  const fileName = path.basename(source);
  const destination = path.join(destDir, fileName);
  
  try {
    // Create a backup copy instead of moving
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  } catch (error) {
    console.error(`Error copying ${source}: ${error.message}`);
  }
};

// Files to backup
const filesToBackup = [
  // Scripts
  { source: 'public/scripts/mobileVideoOptimization.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/mobileVideoOptimization.debug.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/prevent-image-flicker.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/fix-nextjs-images.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/memory-cleanup.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/image-loaded-class.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/scrollOptimization.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/mobile-image-optimization.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/videoFix.js', dest: 'public/scripts/__deprecated' },
  { source: 'public/scripts/disable-video-blocking.js', dest: 'public/scripts/__deprecated' },
  
  // Public styles
  { source: 'public/styles/image-loading-fix.css', dest: 'public/styles/__deprecated' },
  { source: 'public/styles/mobile-video-brightness.css', dest: 'public/styles/__deprecated' },
  { source: 'public/styles/prevent-image-flicker.css', dest: 'public/styles/__deprecated' },
  { source: 'public/styles/video-playback-fix.css', dest: 'public/styles/__deprecated' },
  
  // Source styles
  { source: 'src/styles/image-loading-fix.css', dest: 'src/styles/__deprecated' },
  { source: 'src/styles/mobile-video-brightness.css', dest: 'src/styles/__deprecated' },
  { source: 'src/styles/scroll-performance.css', dest: 'src/styles/__deprecated' },
  { source: 'src/styles/hero-loading-fix.css', dest: 'src/styles/__deprecated' }
];

// Run the script
console.log('Starting cleanup process...');
createBackupDirs();

filesToBackup.forEach(file => {
  moveFile(file.source, file.dest);
});

console.log('Cleanup process completed.');
console.log('Please test the website thoroughly before deleting the backup files.');

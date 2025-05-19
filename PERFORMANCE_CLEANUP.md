# Performance Cleanup

This document lists files that should be removed or disabled to improve website performance.

## Scripts to Remove

These scripts are now redundant as their functionality has been consolidated into `performance-optimizations.js`:

1. `public\scripts\mobileVideoOptimization.js` - Replaced by `mobile-video-autoplay.js`
2. `public\scripts\mobileVideoOptimization.debug.js` - Debug version, no longer needed
3. `public\scripts\prevent-image-flicker.js` - Functionality moved to consolidated script
4. `public\scripts\fix-nextjs-images.js` - Functionality moved to consolidated script
5. `public\scripts\memory-cleanup.js` - Functionality moved to consolidated script
6. `public\scripts\image-loaded-class.js` - Functionality moved to consolidated script
7. `public\scripts\scrollOptimization.js` - Functionality moved to consolidated script
8. `public\scripts\mobile-image-optimization.js` - Functionality moved to consolidated script
9. `public\scripts\videoFix.js` - Functionality moved to consolidated script
10. `public\scripts\disable-video-blocking.js` - No longer needed with new approach

## CSS Files to Remove

These CSS files are now redundant as their functionality has been consolidated into `performance-optimizations.css`:

1. `public\styles\image-loading-fix.css` - Functionality moved to consolidated CSS
2. `public\styles\mobile-video-brightness.css` - Functionality moved to consolidated CSS
3. `public\styles\prevent-image-flicker.css` - Functionality moved to consolidated CSS
4. `public\styles\video-playback-fix.css` - Functionality moved to consolidated CSS

## Source Files to Remove

These files in the src directory are now redundant:

1. `src\styles\image-loading-fix.css` - Functionality moved to consolidated CSS
2. `src\styles\mobile-video-brightness.css` - Functionality moved to consolidated CSS
3. `src\styles\scroll-performance.css` - Functionality moved to consolidated CSS
4. `src\styles\hero-loading-fix.css` - Functionality moved to consolidated CSS

## Test Files to Remove

These test files are no longer needed:

1. `public\mobile-video.html` - Test file, not needed in production
2. `public\mobile-video-test.html` - Test file, not needed in production

## How to Safely Remove These Files

Instead of deleting these files immediately, you can:

1. Create a backup directory: `public\scripts\__deprecated\` and `public\styles\__deprecated\`
2. Move the files there instead of deleting them
3. Test the website thoroughly after making these changes
4. Delete the files only after confirming everything works correctly

## Additional Optimizations

1. Ensure all images are properly optimized and use the correct format (AVIF/WebP)
2. Convert videos to WebM format with appropriate compression
3. Remove any console.log statements in production code
4. Ensure all scripts have the `async` attribute when appropriate
5. Consider using the `fetchpriority` attribute for critical resources

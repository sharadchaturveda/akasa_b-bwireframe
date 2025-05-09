# Performance Optimization Scripts

This directory contains scripts to help with performance optimization, including video compression, image optimization, and more.

## Compress Video Script

The `compress-video.js` script compresses the hero mobile video to make it smaller and more suitable for mobile devices.

### Requirements

- Node.js
- FFmpeg installed and available in PATH

### Installation

1. Install FFmpeg:
   - Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH
   - Mac: `brew install ffmpeg`
   - Linux: `sudo apt install ffmpeg` or equivalent

### Usage

Run the script from the project root:

```bash
node scripts/compress-video.js
```

This will create two new files:
- `heromobilevid-small.mp4` - A smaller version with reduced resolution
- `heromobilevid-compressed.mp4` - A more compressed version

### Manual Compression

If you prefer to run the commands manually:

```bash
# Create smaller version (reduced resolution)
ffmpeg -i public/images/home/hero/mobile-video/heromobilevid.mp4 -vf "scale=720:-1" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k public/images/home/hero/mobile-video/heromobilevid-small.mp4

# Create compressed version (same resolution, higher compression)
ffmpeg -i public/images/home/hero/mobile-video/heromobilevid.mp4 -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k public/images/home/hero/mobile-video/heromobilevid-compressed.mp4
```

## Testing Video Playback

You can test video playback directly by opening:

```
http://localhost:3000/mobile-video.html
```

This page provides controls to play, pause, and reload the video for testing purposes.

## Troubleshooting

If the video still freezes after compression:

1. Try a more aggressive compression:
   ```bash
   ffmpeg -i heromobilevid.mp4 -vf "scale=480:-1" -c:v libx264 -crf 32 -preset fast -c:a aac -b:a 64k heromobilevid-tiny.mp4
   ```

2. Try converting to WebM format:
   ```bash
   ffmpeg -i heromobilevid.mp4 -c:v libvpx-vp9 -b:v 1M -c:a libopus -b:a 64k heromobilevid.webm
   ```

3. Try removing audio completely:
   ```bash
   ffmpeg -i heromobilevid.mp4 -an -c:v libx264 -crf 28 -preset medium heromobilevid-noaudio.mp4
   ```

## Image Optimization

### Convert to AVIF

The `convert-to-avif.js` script converts large JPG and PNG images to AVIF format for better performance.

#### Prerequisites

Install the required dependencies:

```bash
npm install sharp
```

#### Usage

```bash
node scripts/convert-to-avif.js
```

This script:
- Finds all JPG and PNG images in the specified directories
- Converts images larger than 300KB to AVIF format
- Preserves the original files
- Creates optimized versions with .avif extension

### Update Image References

The `update-image-references.js` script updates image references in the codebase to use AVIF format when available.

#### Usage

```bash
node scripts/update-image-references.js
```

This script:
- Finds all AVIF images in the public directory
- Scans the source code for image references
- Updates references to use AVIF format when available

## Performance Best Practices

### Images

- Use the Next.js Image component for all images
- Set proper width and height attributes
- Use priority={true} for above-the-fold images
- Use loading="lazy" for below-the-fold images
- Use AVIF or WebP format for better compression

### JavaScript

- Use dynamic imports for non-critical components
- Use throttling for scroll and resize event handlers
- Use requestAnimationFrame for animations
- Avoid using transition-all in favor of specific transitions

### CSS

- Avoid using backdrop-blur-sm for better performance
- Use will-change-transform for elements that will be animated
- Use content-visibility: auto for below-the-fold content

### Fonts

- Only load the font weights you actually use
- Use display: swap for better font loading
- Preload critical fonts

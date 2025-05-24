# Performance Optimization Scripts

This directory contains scripts to help with performance optimization, including video compression, image optimization, and more.

## Compress Video Script

The `compress-video.js` script compresses the hero mobile video for smaller file sizes.

### Requirements

-   Node.js
-   FFmpeg installed and available in PATH

### Installation

1.  Install FFmpeg:
    -   Windows: Download from [ffmpeg.org](https://ffmpeg.org/download.html) and add to PATH.
    -   Mac: `brew install ffmpeg`.
    -   Linux: `sudo apt install ffmpeg` or equivalent.

### Usage

Run the script from the project root:

```bash
node scripts/compress-video.js
```

This creates smaller, compressed versions of the video.

### Troubleshooting

If video issues persist after compression:

1.  Try more aggressive compression (e.g., lower resolution, higher CRF).
2.  Consider converting to WebM format.
3.  Try removing audio.

## Image Optimization

### Convert to AVIF

The `convert-to-avif.js` script converts large JPG and PNG images to AVIF format.

#### Prerequisites

Install `sharp`:

```bash
npm install sharp
```

#### Usage

```bash
node scripts/convert-to-avif.js
```

This script finds and converts images larger than 300KB to AVIF, preserving originals.

### Update Image References

The `update-image-references.js` script updates image references in the codebase to use AVIF format when available.

#### Usage

```bash
node scripts/update-image-references.js
```

This script scans the public directory for AVIF images and updates corresponding references in the source code.

## Performance Best Practices

### Images

-   Use the Next.js `Image` component.
-   Set proper `width` and `height` attributes.
-   Use `priority={true}` for above-the-fold images.
-   Use `loading="lazy"` for below-the-fold images.
-   Prefer AVIF or WebP formats.

### JavaScript

-   Use dynamic imports for non-critical components.
-   Throttle scroll and resize event handlers.
-   Use `requestAnimationFrame` for animations.
-   Avoid `transition-all` in favor of specific transitions.

### CSS

-   Avoid `backdrop-blur-sm`.
-   Use `will-change-transform` for animated elements.
-   Use `content-visibility: auto` for below-the-fold content.

### Fonts

-   Load only necessary font weights.
-   Use `display: swap`.
-   Preload critical fonts.

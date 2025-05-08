# Mobile Video Optimization

This document provides instructions for optimizing the mobile hero video to prevent freezing issues.

## Video Files

- `heromobilevid.mp4` - Original video file (34MB)
- `heromobilevid-small.mp4` - Smaller version of the video (create this file)
- `heromobilevid-compressed.mp4` - Compressed version of the video (create this file)

## Creating Optimized Video Files

To create the optimized video files, you can use FFmpeg:

### Creating a smaller version (reduced resolution)

```bash
ffmpeg -i heromobilevid.mp4 -vf "scale=720:-1" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k heromobilevid-small.mp4
```

### Creating a compressed version (same resolution, higher compression)

```bash
ffmpeg -i heromobilevid.mp4 -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k heromobilevid-compressed.mp4
```

## Recommended Video Specifications

For optimal mobile performance:

- Resolution: 720p or lower
- Bitrate: 1-2 Mbps
- Format: MP4 with H.264 encoding
- Audio: AAC, 128kbps or lower (or no audio)
- Duration: Keep under 30 seconds if possible
- File size: Aim for under 5MB

## Troubleshooting Video Freezing

If the video freezes after a few seconds:

1. **Reduce file size**: The current video is 34MB which is too large for mobile
2. **Lower resolution**: Try reducing to 720p or even 480p for mobile
3. **Increase compression**: Use a higher CRF value (28-30) for more compression
4. **Use hardware acceleration**: Add `-hwaccel auto` to the FFmpeg command
5. **Convert to WebM**: Try converting to WebM format which may work better on some devices

## Example WebM Conversion

```bash
ffmpeg -i heromobilevid.mp4 -c:v libvpx-vp9 -b:v 1M -c:a libopus -b:a 64k heromobilevid.webm
```

Then add this source to the video element:

```html
<source src="/images/home/hero/mobile-video/heromobilevid.webm" type="video/webm" />
```

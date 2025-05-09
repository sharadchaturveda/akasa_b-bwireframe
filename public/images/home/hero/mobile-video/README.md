# Mobile Hero Video

This directory contains the video file used for the mobile hero section background.

## Video Specifications

### WebM Format (Primary)
- **Filename**: `heromobilevid.webm`
- **Dimensions**: 1080 x 1920 pixels (portrait orientation)
- **Frame Rate**: 30 fps
- **Format**: WebM with VP9 encoding
- **Duration**: Recommended 10-15 seconds (looped playback)
- **File Size**: 4.9MB (significantly smaller than MP4)

### MP4 Format (Fallback)
- **Filename**: `heromobilevid.mp4`
- **Dimensions**: 1080 x 1920 pixels (portrait orientation)
- **Frame Rate**: 30 fps
- **Format**: MP4 with H.264 encoding
- **Duration**: Recommended 10-15 seconds (looped playback)
- **File Size**: 15MB (used as fallback for browsers without WebM support)

## Usage

This video is automatically displayed as the background for the hero section on mobile devices only. Desktop devices will continue to use the image carousel.

## Optimization Tips

- Use WebM format as the primary video format for better compression
- Provide MP4 as a fallback for browsers without WebM support
- Compress videos to reduce file size while maintaining quality
- Consider using FFmpeg for compression and format conversion
- Use a moderate bitrate (1-2 Mbps) to balance quality and file size
- Ensure the video has good contrast to work with the text overlay

## WebM Conversion Command

To convert MP4 to WebM format with good compression:

```bash
ffmpeg -i heromobilevid.mp4 -c:v libvpx-vp9 -b:v 1M -c:a libopus -b:a 64k heromobilevid.webm
```

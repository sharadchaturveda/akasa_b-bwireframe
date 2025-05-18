# SEO Images

This directory contains images specifically optimized for SEO and social sharing purposes.

## Directory Contents

- `og-image.jpg` - The default Open Graph image used for social media sharing (1200x630px)
- `twitter-card.jpg` - The default Twitter Card image (1200x600px)
- `favicon.ico` - The website favicon

## Image Specifications

### Open Graph Image

- **Filename**: `og-image.jpg`
- **Dimensions**: 1200x630 pixels (1.91:1 ratio)
- **Format**: JPG
- **Quality**: 85%
- **File Size**: Keep under 300KB for optimal performance
- **Content**: Should include the Akasa logo and a high-quality background image

### Twitter Card Image

- **Filename**: `twitter-card.jpg`
- **Dimensions**: 1200x600 pixels (2:1 ratio)
- **Format**: JPG
- **Quality**: 85%
- **File Size**: Keep under 300KB for optimal performance
- **Content**: Should include the Akasa logo and a high-quality background image

## Usage

These images are referenced in the metadata configuration in `src/app/layout.tsx` for site-wide defaults.

For page-specific Open Graph images, update the metadata in the respective page's metadata configuration.

## Best Practices

1. Keep file sizes small for faster loading
2. Use high-quality, visually appealing images that represent the brand
3. Include the logo and relevant text if appropriate
4. Test how images appear when shared on various social platforms
5. Update images periodically to keep content fresh

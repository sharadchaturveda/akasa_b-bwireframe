# Background Images Restoration

This document explains the changes made to restore the background images for the testimonials and inquiry sections on the Events page while maintaining good performance.

## Changes Made

### 1. TestimonialsSection Component

#### Before:
```jsx
<section className="w-full bg-[#0A0A0A] pb-16 relative">
  {/* Simplified background for better performance */}
  <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0A0A0A]"></div>
</section>
```

#### After:
```jsx
<section className="w-full bg-black pb-16 relative">
  {/* Background image with optimized opacity */}
  <div 
    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/menu/hero/gallery-3.jpg')"
    }}
    aria-hidden="true"
  ></div>

  {/* Dark overlay to improve text readability over the background image */}
  <div className="absolute inset-0 bg-black/80"></div>
</section>
```

### 2. InquiryFormSection Component

#### Before:
```jsx
<section id="inquiry" className="w-full bg-[#0A0A0A] pb-16 relative">
  {/* Simplified background for better performance */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-black"></div>
</section>
```

#### After:
```jsx
<section id="inquiry" className="w-full bg-black pb-16 relative">
  {/* Background image with optimized opacity */}
  <div 
    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/menu/hero/gallery-6.jpg')"
    }}
    aria-hidden="true"
  ></div>

  {/* Dark overlay to improve text readability over the background image */}
  <div className="absolute inset-0 bg-black/85"></div>
</section>
```

## Performance Optimizations Maintained

While restoring the background images, we've maintained several performance optimizations:

1. **Reduced Opacity**: Set the background image opacity to 20% to reduce rendering cost
2. **Dark Overlay**: Added a dark overlay with high opacity (80-85%) to reduce the visual impact of the background image
3. **No Backdrop Blur**: Avoided using backdrop-blur effects which are performance-intensive
4. **No Animation**: Kept the background static without animations
5. **No Parallax**: Avoided parallax effects which can cause performance issues

## Visual Impact

The restored background images provide subtle texture and visual interest to the sections while maintaining good performance. The dark overlays ensure that the text remains highly readable against the background.

## Additional Considerations

If performance issues persist, consider the following alternatives:

1. **Lower Resolution Images**: Use smaller, more compressed images for the backgrounds
2. **WebP Format**: Convert background images to WebP format for better compression
3. **CSS Patterns**: Use CSS-generated patterns instead of images for texture
4. **Gradient Overlays**: Add more complex gradients to create visual interest without images

The current implementation strikes a balance between visual appeal and performance, with the background images providing subtle texture without significantly impacting page performance.

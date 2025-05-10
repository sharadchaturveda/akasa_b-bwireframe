# Event Buttons Update

This document outlines the changes made to add "Event Menu" buttons to all event description cards and rename the networking-events.pdf file to event-menu.pdf.

## Changes Made

### 1. PDF File Changes

- Created a new `event-menu.pdf` file by copying the existing `networking-events.pdf` file
- Both files are now available in the `/public/menus/` directory
- Updated references in the code to point to the new file name

### 2. EventListingsSection Component Updates

#### Before:
- Each event card had a single button
- For regular events: "Inquire Now" button linking to the inquiry form
- For networking events: "View Event Menu" button linking to the networking-events.pdf file

#### After:
- Each event card now has two buttons:
  1. "Inquire Now" button linking to the inquiry form
  2. "View Event Menu" button linking to the event-menu.pdf file
- Buttons are arranged in a column on mobile and a row on desktop
- Consistent styling and positioning maintained across all event cards

### 3. Button Container Layout

```jsx
{/* Buttons container - flex row for desktop, column for mobile */}
<div className="flex flex-col md:flex-row gap-3 md:gap-4">
  {/* Inquire Now button */}
  <Link href="#inquiry" prefetch={true}>
    <button className="...">
      <span className="relative flex-1 text-center">
        Inquire Now
      </span>
    </button>
  </Link>

  {/* Event Menu button */}
  <Link href="/menus/event-menu.pdf" prefetch={true} target="_blank" rel="noopener noreferrer">
    <button className="...">
      <span className="relative flex-1 text-center">
        View Event Menu
      </span>
    </button>
  </Link>
</div>
```

### 4. Events Data Update

Updated the networking event data to reference the new PDF file:

```javascript
{
  id: 5,
  title: "Networking Events",
  description: "Host networking events that leave a lasting impression!...",
  image: "/images/events/listings/networking-events.jpg",
  category: "networking",
  features: ["Professional setup", "Audio-visual equipment", "Networking-friendly layout", "Catering options available"],
  price: "Contact for pricing",
  pdfMenu: "/menus/event-menu.pdf"  // Updated from networking-events.pdf
}
```

## Responsive Design Considerations

- On mobile devices, buttons are stacked vertically with appropriate spacing (gap-3)
- On desktop devices, buttons are arranged horizontally with appropriate spacing (gap-4)
- Button sizes are consistent across all viewports
- Text size adjusts appropriately for different screen sizes

## Performance Optimizations

- Used `prefetch={true}` for faster navigation
- Maintained the existing performance optimizations for buttons
- Used appropriate target and rel attributes for external links

## Visual Consistency

- Maintained the same button styling across all event cards
- Ensured consistent spacing and alignment
- Preserved the hover effects and transitions
- Kept the same color scheme and typography

These changes ensure that all event cards now have both "Inquire Now" and "View Event Menu" buttons, with the networking event card maintaining the same layout as the other cards.

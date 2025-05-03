# Data

This directory contains data files used throughout the application. These files provide static data that is used to render content.

## Available Data Files

### Menu Data

- **aLaCarteMenu.ts**: Data for the à la carte menu.
- **barBitesMenu.ts**: Data for the bar bites menu.
- **drinksMenu.ts**: Data for the drinks menu.
- **setLunchMenu.ts**: Data for the set lunch menu.
- **soulFoodMenu.ts**: Data for the soul food weekends menu.

### Event Data

- **eventCategories.ts**: Categories for events.
- **events.ts**: Event listings.

### Testimonial Data

- **testimonials.ts**: Customer testimonials.

## Data Structure

Each data file should export a constant with a descriptive name:

```tsx
/**
 * Data name and description
 * 
 * Detailed description of the data's purpose.
 */
export const DATA_NAME = [
  {
    id: "unique-id",
    // Other properties
  },
  // More items
];
```

## Data Guidelines

### Naming Conventions

- Use UPPER_SNAKE_CASE for constant names (e.g., `MENU_ITEMS`, `EVENT_CATEGORIES`).
- Use camelCase for property names (e.g., `id`, `name`, `description`).
- Use descriptive names that reflect the data's purpose.

### Best Practices

1. **Use TypeScript**: Define proper types for data structures.

2. **Document Data**: Add JSDoc comments to explain the purpose of data.

3. **Use Unique IDs**: Ensure each item has a unique ID.

4. **Keep Data Consistent**: Use consistent property names across similar data structures.

5. **Separate Data from Logic**: Keep data separate from the components that use it.

6. **Export Data as Constants**: Export data as named constants, not default exports.

7. **Group Related Data**: Group related data in the same file.

8. **Use Enums for Fixed Values**: Use TypeScript enums for fixed values.

9. **Use Interfaces for Data Structures**: Define interfaces for data structures.

10. **Keep Data Immutable**: Treat data as immutable to prevent unintended changes.

## Creating New Data Files

1. Create a new file in the `data/` directory with a descriptive name (e.g., `newData.ts`).
2. Define the data structure with TypeScript interfaces.
3. Create and export the data as a named constant.
4. Import and use the data where needed.
5. Document the data with JSDoc comments.

## Using Data

### Importing Data

```tsx
import { DATA_NAME } from "@/data/fileName";
```

### Using Data in Components

```tsx
function Component() {
  return (
    <div>
      {DATA_NAME.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### Filtering Data

```tsx
const filteredData = DATA_NAME.filter((item) => item.category === "category");
```

### Finding Data

```tsx
const item = DATA_NAME.find((item) => item.id === "unique-id");
```

### Sorting Data

```tsx
const sortedData = [...DATA_NAME].sort((a, b) => a.name.localeCompare(b.name));
```

# Data Documentation Template

This file provides a template for documenting data files in the Akasa website project. Use this template when creating new data files or updating existing ones.

## File Header Template

```typescript
/**
 * Data Name
 *
 * This file contains data for [specific purpose].
 * This data is used in [specific components or pages].
 */
```

## Type Documentation Template

```typescript
/**
 * Represents a single item in the data collection
 */
export interface ItemType {
  /**
   * Unique identifier for the item
   * @required
   */
  id: string | number;
  
  /**
   * Name or title of the item
   * @required
   */
  name: string;
  
  /**
   * Description of the item
   */
  description?: string;
  
  /**
   * Whether the item is featured
   * @default false
   */
  isFeatured?: boolean;
  
  /**
   * Additional properties specific to this item type
   */
  additionalProp?: any;
}

/**
 * Represents a category containing multiple items
 */
export interface CategoryType {
  /**
   * Name of the category
   * @required
   */
  category_name: string;
  
  /**
   * Additional notes about the category
   */
  category_notes?: string[];
  
  /**
   * Items in this category
   * @required
   */
  items: ItemType[];
}
```

## Data Documentation Template

```typescript
/**
 * Collection of data items
 * 
 * This constant contains all the data items used in [specific components or pages].
 * The data is organized by [organization principle, e.g., category, date, etc.].
 */
export const DATA_NAME: DataType = {
  // Data content
};
```

## Example Data File with Documentation

```typescript
/**
 * À La Carte Menu Data
 *
 * This file contains data for the À La Carte menu.
 * This data is used in the À La Carte menu page and menu components.
 */

import { Menu } from '@/types/menu';

/**
 * À La Carte Menu
 * 
 * This constant contains all the menu items for the À La Carte menu.
 * The menu is organized by categories (e.g., Soup and Appetizer, Main Course, etc.).
 * Each item includes name, price, description, and vegetarian status.
 */
export const alacarteMenu: Menu = {
  "menu_name": "A La Carte Menu",
  "source_url": "https://akasa.sg/menu-a-la-carte",
  "categories": [
    {
      "category_name": "SOUP AND APPETIZER",
      "items": [
        {
          "name": "Mutton Broth",
          "price": "$16",
          "description": "Australian Mutton | Saffron | Kashmiri Chilli",
          "vegetarian": false
        },
        {
          "name": "Seasonal Vegetable and Chickpea Broth",
          "price": "$13",
          "description": "Vegetable Broth | Chickpeas | Indian Spices",
          "vegetarian": true
        },
        {
          "name": "Tandoori Paneer Kebab",
          "price": "$24",
          "description": "Char Roasted Cottage Cheese | Crushed Nuts | Yogurt | Dhani Chilli",
          "vegetarian": true
        }
      ]
    },
    {
      "category_name": "MAIN COURSE",
      "items": [
        {
          "name": "Akasa-E-Lobster",
          "price": "$72",
          "description": "Whole Lobster | Tomato Gravy | Kashmiri Chilli | Ginger",
          "vegetarian": false
        },
        {
          "name": "Tandoori Prawns",
          "price": "$32",
          "description": "Tiger Prawns | Yogurt | Kashmiri Chilli | Ginger | Garlic",
          "vegetarian": false
        },
        {
          "name": "Dal-E-Akasa",
          "price": "$22",
          "description": "Black Lentils | Tomato | Ginger | Garlic | Cream",
          "vegetarian": true
        }
      ]
    },
    {
      "category_name": "BREAD",
      "items": [
        {
          "name": "Paronthia Naan",
          "price": "$8",
          "description": "Refined Flour | Butter | Herbs",
          "vegetarian": true
        },
        {
          "name": "Garlic Naan",
          "price": "$7",
          "description": "Refined Flour | Garlic | Butter",
          "vegetarian": true
        }
      ]
    },
    {
      "category_name": "RICE",
      "items": [
        {
          "name": "AKASA-E-Dum Biryani",
          "price": "$25",
          "description": "Basmati Rice | Saffron | Whole Spices | Served with Raita",
          "vegetarian": false
        },
        {
          "name": "Vegetable Biryani",
          "price": "$22",
          "description": "Basmati Rice | Seasonal Vegetables | Saffron | Whole Spices | Served with Raita",
          "vegetarian": true
        }
      ]
    }
  ]
};
```

## Data Organization Guidelines

When organizing data, follow these guidelines:

1. **Use Meaningful Categories**: Organize data into meaningful categories that make sense for the content.

2. **Include Unique IDs**: Ensure each item has a unique identifier for easy reference.

3. **Consistent Property Names**: Use consistent property names across similar data structures.

4. **Vegetarian Indicators**: For food items, always include a `vegetarian` property to indicate whether the item is vegetarian.

5. **Pricing Information**: For priced items, include clear pricing information in a consistent format.

6. **Descriptive Text**: Provide detailed descriptions that give users a clear understanding of the item.

7. **Featured Items**: Use an `isFeatured` property to mark items that should be highlighted.

8. **Sorting Order**: Consider the natural sorting order of items within categories (e.g., vegetarian dishes before non-vegetarian).

## Conclusion

Following these documentation standards ensures that all data files are well-documented and easy to understand for new developers joining the project. Consistent documentation also makes maintenance easier and helps prevent bugs caused by misunderstanding data structures.

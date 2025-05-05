# Type Documentation Template

This file provides a template for documenting TypeScript types in the Akasa website project. Use this template when creating new types or updating existing ones.

## File Header Template

```typescript
/**
 * Type Name
 *
 * This file contains TypeScript types for [specific purpose].
 * These types are used in [specific components, data files, or utilities].
 */
```

## Type Documentation Template

```typescript
/**
 * Represents a specific entity or concept in the application
 * 
 * Detailed description of what this type represents and how it's used.
 * Include any important constraints or relationships with other types.
 */
export type TypeName = string | number;
```

## Interface Documentation Template

```typescript
/**
 * Represents a specific entity or concept in the application
 * 
 * Detailed description of what this interface represents and how it's used.
 * Include any important constraints or relationships with other interfaces.
 */
export interface InterfaceName {
  /**
   * Description of this property
   * @required
   */
  requiredProperty: string;
  
  /**
   * Description of this optional property
   * Include any constraints or validation rules
   */
  optionalProperty?: number;
  
  /**
   * Description of this property with a default value
   * @default defaultValue
   */
  propertyWithDefault?: boolean;
  
  /**
   * Description of this nested property
   * Explain the structure and purpose of nested objects
   */
  nestedProperty?: {
    /**
     * Description of this nested property
     */
    nestedValue: string;
  };
}
```

## Enum Documentation Template

```typescript
/**
 * Represents a set of named constants
 * 
 * Detailed description of what this enum represents and how it's used.
 * Include any important constraints or relationships with other types.
 */
export enum EnumName {
  /**
   * Description of this enum value
   */
  VALUE_ONE = 'value_one',
  
  /**
   * Description of this enum value
   */
  VALUE_TWO = 'value_two',
  
  /**
   * Description of this enum value
   */
  VALUE_THREE = 'value_three',
}
```

## Generic Type Documentation Template

```typescript
/**
 * A generic type that represents a specific concept
 * 
 * Detailed description of what this generic type represents and how it's used.
 * Include any important constraints or relationships with other types.
 * 
 * @template T - Description of the type parameter
 */
export type GenericType<T> = {
  /**
   * Description of this property
   * Explain how the generic type parameter is used
   */
  value: T;
  
  /**
   * Description of this property
   */
  id: string;
};
```

## Union Type Documentation Template

```typescript
/**
 * Represents a value that can be one of several types
 * 
 * Detailed description of what this union type represents and how it's used.
 * Include any important constraints or relationships with other types.
 */
export type UnionType = 
  | string 
  | number 
  | { 
      /**
       * Description of this property
       */
      property: string;
    };
```

## Example Type File with Documentation

```typescript
/**
 * Menu Types
 *
 * This file contains TypeScript types for menu data.
 * These types are used in menu data files, menu components, and menu pages.
 */

/**
 * Represents price options for menu items
 * 
 * Some menu items (particularly drinks) may have different prices
 * for glass and bottle options.
 */
export interface PriceOption {
  /**
   * Price for a glass
   */
  glass?: string;
  
  /**
   * Price for a bottle
   */
  bottle?: string;
}

/**
 * Represents a single menu item
 * 
 * Menu items are the individual dishes or drinks available on the menu.
 * Each item has a name, price, description, and vegetarian status.
 */
export interface MenuItem {
  /**
   * Name of the menu item
   * @required
   */
  name: string;
  
  /**
   * Price of the menu item
   * Can be a simple string (e.g., "$25") or a PriceOption object
   * for items with multiple pricing options
   * @required
   */
  price: string | PriceOption;
  
  /**
   * Description of the menu item
   * Usually formatted as "Ingredient | Ingredient | Ingredient"
   */
  description: string | null;
  
  /**
   * Whether the menu item is vegetarian
   * Used for displaying vegetarian indicators (🟢)
   * @default false
   */
  vegetarian?: boolean;
  
  /**
   * Alternative property name for vegetarian status
   * Some data sources use is_vegetarian instead of vegetarian
   * @default false
   */
  is_vegetarian?: boolean;
}

/**
 * Represents a category of menu items
 * 
 * Menu categories group related menu items together.
 * Examples include "SOUP AND APPETIZER", "MAIN COURSE", etc.
 */
export interface MenuCategory {
  /**
   * Name of the category
   * @required
   */
  category_name: string;
  
  /**
   * Additional notes about the category
   * Used for special information like "Available weekends only"
   */
  category_notes?: string[];
  
  /**
   * Menu items in this category
   * @required
   */
  items: MenuItem[];
}

/**
 * Represents a complete menu
 * 
 * A menu contains multiple categories of menu items.
 * Examples include "A La Carte Menu", "Drinks Menu", etc.
 */
export interface Menu {
  /**
   * Name of the menu
   * @required
   */
  menu_name: string;
  
  /**
   * URL to the source of the menu data
   * Used for attribution or linking to external sources
   */
  source_url?: string;
  
  /**
   * Categories in this menu
   * @required
   */
  categories: MenuCategory[];
}
```

## Type Organization Guidelines

When organizing types, follow these guidelines:

1. **Group Related Types**: Keep related types in the same file.

2. **Use Descriptive Names**: Use clear, descriptive names for types and interfaces.

3. **Document All Properties**: Add JSDoc comments to all properties explaining their purpose.

4. **Mark Required Properties**: Clearly indicate which properties are required.

5. **Specify Default Values**: Document default values for optional properties.

6. **Use Consistent Naming**: Use consistent naming conventions across all types.

7. **Avoid Any Type**: Avoid using the `any` type whenever possible.

8. **Use Generics Appropriately**: Use generic types when a type needs to be flexible.

9. **Export All Types**: Export all types that will be used outside the file.

10. **Import Types**: Import types from other files rather than redefining them.

## Conclusion

Following these documentation standards ensures that all types are well-documented and easy to understand for new developers joining the project. Consistent documentation also makes maintenance easier and helps prevent bugs caused by misunderstanding type structures.

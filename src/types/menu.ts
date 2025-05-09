export interface PriceOption {
  glass?: string;
  bottle?: string;
  pour_30ml?: string;
  bottle_larger?: string;
  bottle_500ml?: string;
}

export interface Variant {
  type: string;
  price: string | number;
}

export interface MenuItem {
  name: string;
  price: string | PriceOption;
  description: string | null;
  vegetarian?: boolean;
  is_vegetarian?: boolean;
  variants?: Variant[];
}

export interface MenuCategory {
  category_name: string;
  category_notes?: string[];
  pourNote?: string;
  items: MenuItem[];
}

export interface Menu {
  menu_name: string;
  source_url?: string;
  categories: MenuCategory[];
}

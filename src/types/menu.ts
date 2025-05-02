export interface PriceOption {
  glass?: string;
  bottle?: string;
}

export interface MenuItem {
  name: string;
  price: string | PriceOption;
  description: string | null;
  vegetarian?: boolean;
  is_vegetarian?: boolean;
}

export interface MenuCategory {
  category_name: string;
  category_notes?: string[];
  items: MenuItem[];
}

export interface Menu {
  menu_name: string;
  source_url?: string;
  categories: MenuCategory[];
}

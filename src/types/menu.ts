export interface MenuItem {
  name: string;
  price: string;
  description: string;
  vegetarian: boolean;
}

export interface MenuCategory {
  category_name: string;
  items: MenuItem[];
}

export interface Menu {
  menu_name: string;
  source_url: string;
  categories: MenuCategory[];
}

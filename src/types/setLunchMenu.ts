export interface MenuOption {
  name: string;
  description: string | null;
  is_vegetarian: boolean;
  surcharge: string | null;
}

export interface FixedMenuItem {
  name: string;
  description: string | null;
  is_vegetarian: boolean;
}

export interface Course {
  course_name: string;
  selection_type: 'choice' | 'fixed';
  description?: string;
  options?: MenuOption[];
  item?: FixedMenuItem;
}

export interface DailyMenu {
  side_vegetable: string;
  dal: string;
  rice: string;
  is_vegetarian: boolean;
}

export interface IncludedSides {
  description: string;
  daily_menu: {
    monday: DailyMenu;
    tuesday: DailyMenu;
    wednesday: DailyMenu;
    thursday: DailyMenu;
    friday: DailyMenu;
  };
}

export interface SetLunchMenu {
  menu_name: string;
  menu_type: string;
  price: string;
  description: string;
  courses: Course[];
  included_sides: IncludedSides;
}

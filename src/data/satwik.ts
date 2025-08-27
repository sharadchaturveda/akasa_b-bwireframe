import { Menu } from "@/types/menu";

export const satwikMenu: Menu = {
  menu_name: "Satwik Menu",
  categories: [
    {
      category_name: "APPETIZER",
      items: [
        {
          name: "Kela aur Shakarkand Kebab",
          price: "$22",
          description: "Banana | Cottage Cheese | Green Chili | Coriander | Spices",
          is_vegetarian: true,
        }
      ],
    },
    {
      category_name: "MAIN COURSE",
      items: [
        {
          name: "Safed Paneer Masala",
          price: "$26",
          description: "Cottage Cheese | Green Chili | Cream | Indian Spices",
          is_vegetarian: true,
        },
        {
          name: "Kheera aur Channa Subzi",
          price: "$24",
          description: "Cucumber | Bengal gram | Tomato | Yoghurt | Indian Spices",
          is_vegetarian: true,
        },
        {
          name: "Tamatar Sev ki Subzi",
          price: "$22",
          description: "Tomato | Green Chili | Cashew Nuts | Indian Spices",
          is_vegetarian: true,
        },
      ],
    },
    {
      category_name: "BREAD",
      items: [
        {
          name: "Kuttu Roti",
          price: "$7",
          description: "Indian bread made from Buckwheat Flour",
          is_vegetarian: true,
        },
      ],
    },
    {
      category_name: "RICE",
      items: [
        {
          name: "Dalia Khichdi",
          price: "$22",
          description: "Wholesome cracked wheat khichdi",
          is_vegetarian: true,
        },
      ],
    },
    {
      category_name: "DESSERT",
      items: [
        {
          name: "Bhatt Angoori Rabdi",
          price: "$16",
          description: "Rice | Milk | Saffron | Nuts",
          is_vegetarian: true,
        },
      ],
    },
    // {
    //   category_name: "SPECIAL",
    //   items: [
    //     {
    //       name: "Whole Satwik Thali",
    //       price: "$28++",
    //       description: "Includes all dishes from the Satwik menu",
    //       is_vegetarian: true,
    //     },
    //   ],
    // },
  ],
  disclaimer:
    "All Prices are subject to 10% service charge and prevailing GST.",
};

import { Menu } from "@/types/menu";

export const mithaiMenu: Menu = {
  menu_name: "Mithai Menu",
  categories: [
    {
      category_name: "TRADITIONAL SWEETS",
      items: [
        {
          name: "Methi Ladoo",
          // price: "$12",
          description: "Wheat | Moongdal | Jaggery | Dried Dates | Halim Seeds | Dink | Methi (Fenugreek Seeds) | Cashew nuts | Almonds | Cow Ghee",
          is_vegetarian: true,
          allergens: "Gluten | Cashew Nuts | Almonds"
        },
        {
          name: "Multigrain Ladoo",
          // price: "$14",
          description: "Wheat | Raagi Seeds (Finger Millet) | Moongdal | Chana Dal | Oats | Jaggery | Dried Dates | Halim Seeds | Dink | Methi | Cashew nuts | Almonds | Cow Ghee",
          is_vegetarian: true,
          allergens: "Gluten | Cashew Nuts | Almonds | Gramflour Dal"
        },
        {
          name: "Dry Fruit Ladoo",
          // price: "$16",
          description: "Pistachios | Dates | Dried Figs | Watermelon Seeds | Pumpkin Seeds | Raisins | Cashew nuts | Almonds | Cow Ghee",
          is_vegetarian: true,
          allergens: "Cashew Nuts | Almonds | Pistachios"
        },
        {
          name: "Moong Ladoo",
          // price: "$12",
          description: "Whole Green Moong | Jaggery | Cashew nuts | Almonds | Cow Ghee",
          is_vegetarian: true,
          allergens: "Cashew Nuts | Almonds"
        },
        {
          name: "Atta Gud Pinni",
          // price: "$14",
          description: "Wheat | Jaggery | Pumpkin Seeds | Melon Seeds | Ginger Powder | Cashew nuts | Almonds | Cow Ghee",
          is_vegetarian: true,
          allergens: "Gluten | Cashew Nuts | Almonds"
        },
        {
          name: "Bajra Gud Roti",
          // price: "$12",
          description: "Bajra Atta | Sesame Seeds | Fennel Seeds | Dry Coconut | Jaggery | Cow Ghee",
          is_vegetarian: true,
          allergens: "Sesame Seeds"
        },
        {
          name: "Roasted Chana Badam Barfi",
          // price: "$14",
          description: "Roasted chana dal | Roasted Almonds | Cow Ghee",
          is_vegetarian: true,
          allergens: "Nuts Almonds | Bengal gram"
        }
      ]
    }
  ],
  disclaimer: "All prices are subject to 10% service charge and prevailing GST. Please inform our staff if you have any food allergies or special dietary requirements."
};

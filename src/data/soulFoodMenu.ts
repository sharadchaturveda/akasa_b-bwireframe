import { Menu } from '@/types/menu';

export const soulFoodMenu: Menu = {
  "menu_name": "Soul Food Weekend Menu",
  "categories": [
    {
      "category_name": "Chaat",
      "category_notes": [
        "Unlimited Chaat available Fri & Sat, 12 PM - 3 PM, until 30th April 2025 - $32++"
      ],
      "items": [
        {
          "name": "PAPADI CHAAT",
          "price": "$12",
          "description": "Puri | Potato | Onion | Yoghurt | Mint Chutney | Tamarind Chutney | Homemade Indian Spices",
          "vegetarian": true
        },
        {
          "name": "PANI POORI",
          "price": "$12",
          "description": "Puri Shell | Potatoes | Onion | Homemade Mint and Tamarind Mix",
          "vegetarian": true
        },
        {
          "name": "MUMBAI VADA PAV",
          "price": "$12",
          "description": "Potato Patty | Bread Bun | Garlic Chutney | Mint Chutney",
          "vegetarian": true
        }
      ]
    },
    {
      "category_name": "Appetizer",
      "items": [
        {
          "name": "PANEER KOLI WADA",
          "price": "$22",
          "description": "Crispy Fried Cottage Cheese | Spicy Red Chilli Sauce",
          "vegetarian": true
        },
        {
          "name": "ACHARI ALOO TIKKA",
          "price": "$20",
          "description": "Potato Tikki | Pickled Spices",
          "vegetarian": true
        },
        {
          "name": "CHICKEN PAKORA",
          "price": "$24",
          "description": "Crispy Fried Chicken | Homemade Spices",
          "vegetarian": false
        },
        {
          "name": "CHICKEN KALI MIRCHI",
          "price": "$26",
          "description": "Chicken | Black Pepper | Yoghurt | Indian Spices",
          "vegetarian": false
        },
        {
          "name": "CHAPLI KEBAB",
          "price": "$28",
          "description": "Minced Mutton | Homemade Indian Spices",
          "vegetarian": false
        },
        {
          "name": "MUTTON SEEKH KEBAB NANZA",
          "price": "$32",
          "description": "Minced Mutton | Stuffed in White Flour Naan",
          "vegetarian": false
        },
        {
          "name": "PRAWN PEPPER FRY",
          "price": "$32",
          "description": "Fresh Prawns | South Indian Style",
          "vegetarian": false
        },
        {
          "name": "TANDOORI ANGAREE MACHLI",
          "price": "$26",
          "description": "Sea Bass | Yoghurt | Red Chilli | Home made Indian Spices",
          "vegetarian": false
        }
      ]
    },
    {
      "category_name": "Breads",
      "items": [
        {
          "name": "AMRITSARI KULCHA",
          "price": "$8",
          "description": "Traditional Punjabi bread stuffed with spiced potatoes",
          "vegetarian": true
        },
        {
          "name": "HARIMIRCHI PARANTHA",
          "price": "$7",
          "description": "Whole wheat bread with green chili",
          "vegetarian": true
        },
        {
          "name": "KHAMIRI ROTI",
          "price": "$7",
          "description": "Fermented wheat bread",
          "vegetarian": true
        },
        {
          "name": "MAKKI KI ROTI",
          "price": "$7",
          "description": "Traditional Punjabi cornmeal bread",
          "vegetarian": true
        }
      ]
    },
    {
      "category_name": "DESSERTS",
      "items": [
        {
          "name": "GAJJAR KI BARFI",
          "price": "$16",
          "description": "Carrot | Milk",
          "vegetarian": true
        }
      ]
    }
  ]
};

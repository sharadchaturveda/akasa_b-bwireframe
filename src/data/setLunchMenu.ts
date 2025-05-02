import { SetLunchMenu } from '@/types/setLunchMenu';

export const setLunchMenu: SetLunchMenu = {
  "menu_name": "Set Lunch Menu",
  "menu_type": "set_menu",
  "price": "$20++",
  "description": "The 3-Course Weekday Set Lunch",
  "courses": [
    {
      "course_name": "Appetizer",
      "selection_type": "choice",
      "description": "Our kebabs are marinated in specially selected spices and grilled in our in-house tandoor.",
      "options": [
        {
          "name": "Vegetarian Kebab",
          "description": "Cottage Cheese",
          "is_vegetarian": true,
          "surcharge": null
        },
        {
          "name": "Chicken Kebab",
          "description": "Marinated Chicken",
          "is_vegetarian": false,
          "surcharge": null
        }
      ]
    },
    {
      "course_name": "Main Course",
      "selection_type": "choice",
      "description": "Served with your choice of Roti, Nan, or Laccha Paratha.",
      "options": [
        {
          "name": "Balai Lababdar",
          "description": "Decadent tomato gravy cooked with Cottage cheese, Kashmiri chili & cashew",
          "is_vegetarian": true,
          "surcharge": null
        },
        {
          "name": "Murgh Tariwala",
          "description": "Home-made Curry Chicken cooked with Kashmiri chili",
          "is_vegetarian": false,
          "surcharge": null
        },
        {
          "name": "Akasa-e-Zaika Mass",
          "description": "Signature Awadh style dum cooked mutton with Mathiana Chili, Saffron, Cold pressed mustard oil",
          "is_vegetarian": false,
          "surcharge": "+$2"
        },
        {
          "name": "Jheenga Sunehri",
          "description": "Fresh large prawns | Fenugreek Seeds",
          "is_vegetarian": false,
          "surcharge": "+$3"
        }
      ]
    },
    {
      "course_name": "Dessert",
      "selection_type": "fixed",
      "item": {
        "name": "Gulab Jamun",
        "description": null,
        "is_vegetarian": true
      }
    }
  ],
  "included_sides": {
    "description": "Every day features a different dal, rice, and side vegetable (served with Main Course).",
    "daily_menu": {
      "monday": {
        "side_vegetable": "Baingan Tamatar Aloo Masala",
        "dal": "Dal Hingh Tadka",
        "rice": "Ghee Chawal Rice",
        "is_vegetarian": true
      },
      "tuesday": {
        "side_vegetable": "Bhindi Bhujia",
        "dal": "Rajma Rasila",
        "rice": "Brown Rice",
        "is_vegetarian": true
      },
      "wednesday": {
        "side_vegetable": "Bhuna Pyaz Palak",
        "dal": "Kadhi Pakora",
        "rice": "Masuri Rice",
        "is_vegetarian": true
      },
      "thursday": {
        "side_vegetable": "Methi Aloo",
        "dal": "Palak Dal",
        "rice": "Jeera Rice",
        "is_vegetarian": true
      },
      "friday": {
        "side_vegetable": "Gobi Matter Subzi",
        "dal": "Malka Dal Tadka",
        "rice": "Steamed Rice",
        "is_vegetarian": true
      }
    }
  }
};

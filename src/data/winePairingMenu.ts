// Wine Pairing Menu data
export const winePairingMenu = {
  menu_name: "Festive Wine Pairing Menu",
  subtitle: "A Symphony of Flavors",
  price: "",
  season: "Festive Season Special",
  description:
    "Indulge in an exquisite culinary journey where Chef Akhilesh Pathak's authentic Indian cuisine meets carefully selected international wines, creating perfect harmony on your palate.",
  courses: [
    {
      course_name: "AMUSE-BOUCHE",
      dish: {
        name: "Yoghurt Kebab",
        description: "Seared Hung Yogurt | Cardamom | Green Chilli",
        is_vegetarian: true,
      },
      wine: {
        name: "Teresa Rizzi Prosecco DOC",
        type: "Sparkling Wine",
        origin: "Italy",
        description: "Light, crisp bubbles perfectly complement the creamy yogurt and subtle spices",
        color: "sparkling",
      },
    },
    {
      course_name: "SOUP",
      dish: {
        name: "Basil and Fox Nut Broth",
        description: "Basil | Fox Nuts | Vegetable Broth",
        is_vegetarian: true,
      },
      wine: {
        name: "Teresa Rizzi Prosecco DOC",
        type: "Sparkling Wine",
        origin: "Italy",
        description: "The effervescence cleanses the palate while enhancing the herbal notes",
        color: "sparkling",
      },
    },
    {
      course_name: "APPETIZER",
      dishes: [
        {
          name: "Tandoori Prawns",
          description: "Char-grilled Tiger Prawns | Methaina Chilli | Rajwada (Royal) Spices",
          is_vegetarian: false,
        },
        {
          name: "Cottage Cheese Kebab",
          description: "Cottage Cheese | Dried Nuts | Dhania Chilli",
          is_vegetarian: true,
        },
      ],
      wine: {
        name: "Journey's End Haystack Chardonnay",
        type: "White Wine",
        origin: "South Africa",
        description: "Buttery Chardonnay balances the char-grilled spices and adds richness to the smoky flavors",
        color: "white",
      },
    },
    {
      course_name: "MAIN COURSE",
      dishes: [
        {
          name: "Mutton Pasinda Dum with Gilafi Naan",
          description: "Australian Mutton Chops | Onion | Tomato | Indian Spices",
          is_vegetarian: false,
        },
        {
          name: "Spinach and Cottage Cheese Kofta with Gilafi Naan",
          description: "Spinach | Cottage Cheese | Akasa Signature Spices",
          is_vegetarian: true,
        },
      ],
      wine: {
        name: "Errazuriz Estate Cabernet Sauvignon",
        type: "Red Wine",
        origin: "Chile",
        description: "Bold tannins and dark fruit notes complement the rich, spiced curry and tender mutton perfectly",
        color: "red",
      },
    },
    {
      course_name: "DESSERT",
      dish: {
        name: "Shahi Double Meetha",
        description: "Akasa Signature Bread Pudding | Condensed Milk | Saffron",
        is_vegetarian: true,
      },
      wine: {
        name: "Penfolds Koonunga Hill Autumn Riesling",
        type: "Riesling Wine",
        origin: "Australia",
        description: "Sweet Riesling with honeyed notes and floral aromas elevates the saffron-infused dessert",
        color: "white",
      },
    },
  ],
};

// Wine pairing images
export const winePairingImages = [
  {
    src: "/images/menu/wine-pairing/hero-1.jpg",
    alt: "Wine Pairing Experience",
  },
  {
    src: "/images/menu/wine-pairing/hero-2.jpg",
    alt: "Fine Dining",
  },
  {
    src: "/images/menu/wine-pairing/hero-3.jpg",
    alt: "Wine Selection",
  },
];

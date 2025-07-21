import { Menu } from '@/types/menu';

export const drinksMenu: Menu = {
  "menu_name": "Drinks Menu",
  "categories": [
    {
      "category_name": "TEA",
      "items": [
        {
          "name": "HOME MADE MASALA CHAI",
          "description": "Please allow 6 mins preparation time",
          "price": "$5",
          "is_vegetarian": true
        },
        {
          "name": "GIFEL TEA - non caffeine blends",
          "description": "Chamomile Dream | Organic Yoga Chai | Akasa Blend (Hibiscus & Apple)",
          "price": "$5",
          "is_vegetarian": true
        },
        {
          "name": "GIFEL TEA - green/white tea blends",
          "description": "Oriental Sencha | White Ginger Pear",
          "price": "$5",
          "is_vegetarian": true
        },
        {
          "name": "GIFEL TEA - black tea blends",
          "description": "Melon Oolong | Black Tea Cocoa | Singapore Dream | Supreme Earl Grey",
          "price": "$5",
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "COFFEE",
      "items": [
        {
          "name": "ESPRESSO",
          "description": "",
          "price": "$3",
          "is_vegetarian": true
        },
        {
          "name": "AMERICANO / LONG BLACK",
          "description": "Iced +1",
          "price": "$5",
          "is_vegetarian": true
        },
        {
          "name": "CAPPUCCINO / LATTE / FLAT WHITE",
          "description": "Iced +1",
          "price": "$6",
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "BEER",
      "items": [
        {
          "name": "ASAHI LAGER ON TAP",
          "price": "$13",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "PERONI LAGER ON TAP",
          "price": "$13",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GUINNESS MICRODRAUGHT",
          "price": "$16",
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "HOUSE COCKTAIL",
      "items": [
        {
          "name": "MOJITO",
          "description": "Dark Rum | Mint | Lime | Soda",
          "price": "$15",
          "is_vegetarian": true
        },
        {
          "name": "MIMOSA",
          "description": "Orange Juice | Prosecco",
          "price": "$16",
          "is_vegetarian": true
        },
        {
          "name": "SINGAPORE SLING",
          "description": "Gin | Benedictine | Cherry Liquer Cointreau | Pineapple & lime Juice",
          "price": "$22",
          "is_vegetarian": true
        },
        {
          "name": "ESPRESSO MARTINI",
          "description": "Espresso | Vodka | Kahlua",
          "price": "$18",
          "is_vegetarian": true
        },
        {
          "name": "GIN-GER COCO",
          "description": "Ford's London gin | ginger | lemongrass | Coconut water | Lime",
          "price": "$18",
          "is_vegetarian": true
        },
        {
          "name": "CLASSIC MARGARITA",
          "description": "Tequila | Lime",
          "price": "$18",
          "is_vegetarian": true
        },
        // {
        //   "name": "AKASA LYCHEE-TINI",
        //   "description": "Bacardi rum | lychee | Lime | Coconut water",
        //   "price": "$18",
        //   "is_vegetarian": true
        // },
        {
          "name": "BLOODY MARY",
          "description": "Vodka | Tomato Juice | Lime | Tobasco | Worcestershire Sauce",
          "price": "$18",
          "is_vegetarian": true
        },
        {
          "name": "AKASA ICED TEA",
          "description": "vodka | rum | gin | tequila | triple sec | lime | cola | lemon",
          "price": "$18",
          "is_vegetarian": true
        },
        {
          "name": "NEGRONI",
          "description": "Ford's London gin | campari | sweet vermouth",
          "price": "$20",
          "is_vegetarian": true
        },
        {
          "name": "OLD FASHIONED",
          "description": "Woodford reserve bourbon | bitters",
          "price": "$22",
          "is_vegetarian": true
        }
      ]
    },
    // {
    //   "category_name": "ALLPRESS ESPRESSO",
    //   "items": [
    //     {
    //       "name": "ESPRESSO",
    //       "price": "$3",
    //       "description": null,
    //       "is_vegetarian": true
    //     },
    //     {
    //       "name": "AMERICANO / LONG BLACK",
    //       "price": "$5",
    //       "description": null,
    //       "is_vegetarian": true,
    //       "variants": [
    //         {
    //           "type": "Iced",
    //           "price": "$6"
    //         }
    //       ]
    //     },
    //     {
    //       "name": "CAPPUCCINO / LATTE / FLAT WHITE",
    //       "price": "$6",
    //       "description": null,
    //       "is_vegetarian": true,
    //       "variants": [
    //         {
    //           "type": "Iced",
    //           "price": "$7"
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      "category_name": "NON ALCOHOLIC",
      "items": [
        {
          "name": "GIFEL TEA - COLD BREW",
          "description": "pick from our wide range under TEA section",
          "price": "$6",
          "is_vegetarian": true
        },
        {
          "name": "COKE / COKE ZERO / SPRITE",
          "price": "$6",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "EVIAN STILL / SPARKLING WATER",
          "description": "800 ml",
          "price": "$7",
          "is_vegetarian": true
        },
        {
          "name": "FRESH JUICE",
          "description": null,
          "price": "$10-$12",
          "is_vegetarian": true,
          "variants": [
            {
              "type": "Beetroot | Carrot | Pineapple | Cucumber ",
              "price": "$10"
            },
            {
              "type": "Orange | Blend",
              "price": "$12"
            }
          ]
        },
        {
          "name": "LIME - SODA / WATER",
          "price": "$7",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LASSI",
          "price": "$8",
          "description": "SWEET / SALT / MANGO + 2",
          "is_vegetarian": true,
          // "variants": [
          //   {
          //     "type": "Mango",
          //     "price": "$10"
          //   }
          // ]
        },
        {
          "name": "MOCKTAIL OF THE DAY",
          "price": "$12",
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "CHAMPAGNE",
      "items": [
        {
          "name": "EDOUARD DUVAL BRUT D’EULALIE",
          "description": null,
          "price": {
            "bottle": "$148"
          },
        },
        {
          "name": "VEUVE CLICQUOT YELLOW LABEL BRUT CHAMPAGNE",
          "description": null,
          "price": {
            "bottle": "$168"
          },
        },
        
      ]
    },
    {
      "category_name": "SPARKLING",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "TERESA RIZZI PROSECCO DOC",
          "description": null,
          "price": {
            "glass": "$16",
            "bottle": "$68"
          },
        },
      ]
    },
    {
      "category_name": "WHITE WINE",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "LAMBERTI DELLE VENEZIE",
          "description": "Italy, Pinot Grigio",
          "price": {
            "glass": "$16",
            "bottle": "$58"
          },
          "is_vegetarian": true
        },
        {
          "name": "JOURNEY'S END HAYSTACK",
          "description": "South Africa, Chardonnay",
          "price": {
            "glass": "$18",
            "bottle": "$68"
          },
          "is_vegetarian": true
        },
        {
          "name": "ALAIN & ADRIEN GAUTHERIN CHABLIS SIGNATURE",
          "description": "France, Chardonnay",
          "price": {
            "bottle": "$158"
          },
          "is_vegetarian": true
        },
        {
          "name": "BODEGA CONTADOR PREDICADOR 2018",
          "description": "Spain, Rioja, Macabeo",
          "price": {
            "bottle": "$128"
          },
          "is_vegetarian": true
        },
        {
          "name": "VILLA MARIA RESERVA",
          "description": "New Zealand, Sauvignon Blanc",
          "price": {
            "bottle": "$118"
          },
          "is_vegetarian": true
        },
        {
          "name": "FAMILLE PAQUET MACONVILLAGES",
          "description": "France, Chardonnay",
          "price": {
            "bottle": "$118"
          },
          "is_vegetarian": true
        },
        {
          "name": "LAURENZ V FORBIDDEN",
          "description": "Austria, Niederosterreich, Gruner Veltliner",
          "price": {
            "bottle": "$98"
          },
          "is_vegetarian": true
        },
        {
          "name": "GUILLAUME GONNET \"LE REVEUR\" 2022",
          "description": "France, Rhone, Viognier / Roussane / Grenache",
          "price": {
            "bottle": "$78"
          },
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "RED WINE",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "ZUCCARDI FUZION",
          "description": "Argentina, Shiraz Malbec",
          "price": {
            "glass": "$16",
            "bottle": "$68"
          },
          "is_vegetarian": true
        },
        {
          "name": "NUNEZ DE GARAY BOBAL",
          "description": "Spain, Tempralino",
          "price": {
            "glass": "$18",
            "bottle": "$78"
          },
          "is_vegetarian": true
        },
        {
          "name": "ERRAZURIZ ESTATE RES",
          "description": "Chile, Cabernet Sauvignon",
          "price": {
            "glass": "$20",
            "bottle": "$78"
          },
          "is_vegetarian": true
        },
        {
          "name": "LE VOLTE DELLORNELLAIA TOSCANA",
          "description": "Italy, Barbera",
          "price": {
            "bottle": "$158"
          },
          "is_vegetarian": true
        },
        {
          "name": "BERONIA RESERVA 2018",
          "description": "Spain, Rioja, Tempranillo",
          "price": {
            "bottle": "$128"
          },
          "is_vegetarian": true
        },
        {
          "name": "DOMAINE ST PATRICE COTES DU RHONE 2019",
          "description": "France, Grenache / Syrah / Mourvèdre",
          "price": {
            "bottle": "$128"
          },
          "is_vegetarian": true
        },
        {
          "name": "CA BIANCA BARBERA D'ASTI DOGC",
          "description": "Italy, Sangiovese",
          "price": {
            "bottle": "$118"
          },
          "is_vegetarian": true
        },
        {
          "name": "CONTI SERRISTORI CHIANTI CLASSICO DOCG",
          "description": "Italy, sangiovese",
          "price": {
            "bottle": "$88"
          },
          "is_vegetarian": true
        },
        {
          "name": "GUILLAUME GONNET \"LE REVEUR\" 2021",
          "description": "France, Rhone, Shiraz / Grenache",
          "price": {
            "bottle": "$78"
          },
          "is_vegetarian": true
        }
      ]
    },
    // {
    //   "category_name": "SPARKLING WINE",
    //   "items": [
    //     {
    //       "name": "TERESA RIZZI PROSECCO DOC",
    //       "price": {
    //         "glass": "$14",
    //         "bottle": "$62"
    //       },
    //       "description": null,
    //       "is_vegetarian": true
    //     },
    //     {
    //       "name": "VEUVE CLICQUOT YELLOW LABEL BRUT CHAMPAGNE",
    //       "price": {
    //         "bottle": "$168"
    //       },
    //       "description": null,
    //       "is_vegetarian": true
    //     }
    //   ]
    // },
    {
      "category_name": "RUM",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "BACARDI WHITE RUM",
          "price": {
            "glass": "$12",
            "bottle": "$118"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "DIPLOMATICO RESERVA EXCLUSIVA",
          "price": {
            "glass": "$15",
            "bottle": "$158"
          },
          "description": null,
          "is_vegetarian": true
        },
      ]
    },
    {
      "category_name": "TEQUILA",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "DON JULIO BLANCO",
          "price": {
            "glass": "$18",
            "bottle": "$178"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "DON JULIO ANEJO",
          "price": {
            "glass": "$20",
            "bottle": "$188"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "KAH ANEJO TEQUILA",
          "price": {
            "glass": "$28",
            "bottle": "$258"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LOCA LOKA BIANCO",
          "price": {
            "glass": "$24",
            "bottle": "$218"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LOCA LOKA RESPOSADO",
          "price": {
            "glass": "$28",
            "bottle": "$258"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "VODKA & GIN",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "ABSOLUT BLUE",
          "price": {
            "glass": "$12",
            "bottle": "$128"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "BELVEDERE PURE",
          "price": {
            "glass": "$14",
            "bottle": "$148"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GREY GOOSE ORIGINAL",
          "price": {
            "glass": "$16",
            "bottle": "$158"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "FORD'S GIN",
          "price": {
            "glass": "$14",
            "bottle": "$128"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "HENDRICK'S GIN",
          "price": {
            "glass": "$18",
            "bottle": "$168"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "JAISALMER GOLD GIN (500ML)",
          "price": {
            "glass": "$18",
            "bottle_500ml": "$178"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GIN MARE",
          "price": {
            "glass": "$20",
            "bottle": "$188"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "THE LONDON NO. 1 SHERRY GIN",
          "price": {
            "glass": "$24",
            "bottle": "$238"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "SASAKI XV JAPANESE CRAFT GIN (500 ML)",
          "price": {
            "glass": "$26",
            "bottle_500ml": "$198"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "COGNAC",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "REMY MARTIN VSOP",
          "price": {
            "glass": "$18"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "ABK6 VSOP",
          "price": {
            "glass": "$20"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "MARTELL VSOP",
          "price": {
            "glass": "$22"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "INDIAN WHISKY",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "RAMPUR DOUBLE CASK",
          "price": {
            "glass": "$25",
            "bottle": "$240"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "RAMPUR SELECT",
          "price": {
            "glass": "$32",
            "bottle": "$320"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    
    {
      "category_name": "AMERICAN WHISKY",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "JACK DANIEL'S OLD NO. 7",
          "price": {
            "glass": "$12"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "JACK DANIEL'S TENESSEE RYE",
          "price": {
            "glass": "$17"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "WOODFORD RESERVE AMERICAN BOURBON",
          "price": {
            "glass": "$18"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "AUSTRALIAN WHISKY",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "STARWARD NOVA SINGLE MALT",
          "price": {
            "glass": "$16"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "STARWARD DOLCE SINGLE MALT",
          "price": {
            "glass": "$18"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "JAPANESE WHISKY",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "UMIKI BLENDED",
          "price": {
            "glass": "$18"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "KAMIKI INTENSE MALT",
          "price": {
            "glass": "$18"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "BLENDED WHISKY",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "MONKEY SHOULDER",
          "price": {
            "glass": "$18",
            "bottle": "$188"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "CHIVAS REGAL 12 YEARS",
          "price": {
            "glass": "$14",
            "bottle": "$138"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "SCOTCH WHISKY",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "DEWARS'S WHITE LABEL",
          "price": {
            "glass": "$14"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "TALISKER 10 YRS",
          "price": {
            "glass": "$18",
            "bottle": "$208"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENFIDDICH 12 YRS",
          "price": {
            "glass": "$18",
            "bottle": "$198"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENFIDDICH 15 YRS",
          "price": {
            "glass": "$26",
            "bottle": "$308"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENFIDDICH 18 YRS",
          "price": {
            "glass": "$32"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENLIVET 12 YRS",
          "price": {
            "glass": "$18",
            "bottle": "$198"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENLIVET 15 YRS",
          "price": {
            "glass": "$28",
            "bottle": "$328"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "BALVENIE DBL WOOD 12 YRS",
          "price": {
            "glass": "$20",
            "bottle": "$258"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENGLASSAUGH PORTSOY",
          "price": {
            "glass": "$20",
            "bottle": "$238"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENGLASSAUGH PORTWOOD",
          "price": {
            "glass": "$20",
            "bottle": "$238"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LAGAVULIN 16 YRS",
          "price": {
            "glass": "$24",
            "bottle": "$298"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    }
  ]
};

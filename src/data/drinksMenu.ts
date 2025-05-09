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
        {
          "name": "AKASA LYCHEE-TINI",
          "description": "Bacardi rum | lychee | Lime | Coconut water",
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
    {
      "category_name": "ALLPRESS ESPRESSO",
      "items": [
        {
          "name": "ESPRESSO",
          "price": "$3",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "AMERICANO / LONG BLACK",
          "price": "$5",
          "description": null,
          "is_vegetarian": true,
          "variants": [
            {
              "type": "Iced",
              "price": "$6"
            }
          ]
        },
        {
          "name": "CAPPUCCINO / LATTE / FLAT WHITE",
          "price": "$6",
          "description": null,
          "is_vegetarian": true,
          "variants": [
            {
              "type": "Iced",
              "price": "$7"
            }
          ]
        }
      ]
    },
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
          "name": "EVIAN STILL / SPARKLING WATER 800 ml",
          "price": "$7",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LIME - SODA / WATER",
          "price": "$7",
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LASSI - SWEET / SALT",
          "price": "$8",
          "description": null,
          "is_vegetarian": true,
          "variants": [
            {
              "type": "Mango",
              "price": "$10"
            }
          ]
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
      "category_name": "RED WINE",
      "items": [
        {
          "name": "CANTINA TREVIGIANA 2021",
          "description": "Italy, Veneto, Merlot",
          "price": {
            "glass": "$15",
            "bottle": "$68"
          },
          "is_vegetarian": true
        },
        {
          "name": "GOLD TREES 2021",
          "description": "Australia, Cabernet Sauvignon",
          "price": {
            "glass": "$16",
            "bottle": "$78"
          },
          "is_vegetarian": true
        },
        {
          "name": "SALENTEIN PORTILO 2021",
          "description": "Argentina, UCO Valley, Malbec",
          "price": {
            "glass": "$16",
            "bottle": "$78"
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
        },
        {
          "name": "BERONIA RESERVA 2018",
          "description": "Spain, Rioja, Tempranillo",
          "price": {
            "bottle": "$88"
          },
          "is_vegetarian": true
        },
        {
          "name": "DOMAINE ST PATRICE COTES DU RHONE 2019",
          "description": "France, Grenache / Syrah / Mourvèdre",
          "price": {
            "bottle": "$118"
          },
          "is_vegetarian": true
        },
        {
          "name": "ALTANZA GRAN RESERVA 2011",
          "description": "Spain, Rioja, Tempranillo",
          "price": {
            "bottle": "$128"
          },
          "is_vegetarian": true
        },
        {
          "name": "LA CROIX BONIS 2015",
          "description": "France, Saint-Estephe, Petit Verdot",
          "price": {
            "bottle": "$128"
          },
          "is_vegetarian": true
        },
        {
          "name": "CHATEAU GIGOGNAN CHATEAUNEUF DU PAPE 2017",
          "description": "France, Grenache / Syrah / Mourvèdre",
          "price": {
            "bottle": "$148"
          },
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "SPARKLING WINE",
      "items": [
        {
          "name": "TERESA RIZZI PROSECCO DOC",
          "price": {
            "glass": "$14",
            "bottle": "$62"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "VEUVE CLICQUOT YELLOW LABEL BRUT CHAMPAGNE",
          "price": {
            "bottle": "$168"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "WHITE WINE",
      "items": [
        {
          "name": "CANTINA DELLE VENEZIE 2021",
          "description": "Italy, Veneto, Pinot Grigio",
          "price": {
            "glass": "$14",
            "bottle": "$58"
          },
          "is_vegetarian": true
        },
        {
          "name": "GOLD TREES 2022",
          "description": "South Australia, Chardonnay",
          "price": {
            "glass": "$16",
            "bottle": "$68"
          },
          "is_vegetarian": true
        },
        {
          "name": "GUILLAUME GONNET \"LE REVEUR\" 2022",
          "description": "France, Rhone, Viognier / Roussane / Grenache",
          "price": {
            "bottle": "$72"
          },
          "is_vegetarian": true
        },
        {
          "name": "LAURENZ V FORBIDDEN",
          "description": "Austria, Niederösterreich, Grüner Veltliner",
          "price": {
            "bottle": "$72"
          },
          "is_vegetarian": true
        },
        {
          "name": "BODEGA CONTADOR PREDICADOR 2018",
          "description": "Spain, Rioja, Macabeo",
          "price": {
            "bottle": "$98"
          },
          "is_vegetarian": true
        },
        {
          "name": "CHATEAU DE POMMARD BOURGOGNE 2019",
          "description": "France, Burgundy, Chardonnay",
          "price": {
            "bottle": "$138"
          },
          "is_vegetarian": true
        }
      ]
    },
    {
      "category_name": "RUM & TEQUILA",
      "pourNote": "Prices by the glass based on our standard pour of 30 ml",
      "items": [
        {
          "name": "BACARDI WHITE RUM",
          "price": {
            "pour_30ml": "$12",
            "bottle_larger": "$118"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "DIPLOMATICO RESERVA EXCLUSIVA",
          "price": {
            "pour_30ml": "$15",
            "bottle_larger": "$158"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "DON JULIO BLANCO",
          "price": {
            "pour_30ml": "$18",
            "bottle_larger": "$178"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "DON JULIO ANEJO",
          "price": {
            "pour_30ml": "$20",
            "bottle_larger": "$188"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "KAH ANEJO TEQUILA",
          "price": {
            "pour_30ml": "$28",
            "bottle_larger": "$258"
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
            "pour_30ml": "$12",
            "bottle_larger": "$128"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "BELVEDERE PURE",
          "price": {
            "pour_30ml": "$14",
            "bottle_larger": "$148"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GREY GOOSE ORIGINAL",
          "price": {
            "pour_30ml": "$16",
            "bottle_larger": "$158"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "FORD'S GIN",
          "price": {
            "pour_30ml": "$14",
            "bottle_larger": "$128"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "HENDRICK'S GIN",
          "price": {
            "pour_30ml": "$18",
            "bottle_larger": "$168"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "JAISALMER GOLD GIN (500ML)",
          "price": {
            "pour_30ml": "$18",
            "bottle_500ml": "$178"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GIN MARE",
          "price": {
            "pour_30ml": "$20",
            "bottle_larger": "$188"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "THE LONDON NO. 1 SHERRY GIN",
          "price": {
            "pour_30ml": "$24",
            "bottle_larger": "$238"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "SASAKI XV JAPANESE CRAFT GIN (500 ML)",
          "price": {
            "pour_30ml": "$26",
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
            "pour_30ml": "$18"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "ABK6 VSOP",
          "price": {
            "pour_30ml": "$20"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "MARTELL VSOP",
          "price": {
            "pour_30ml": "$22"
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
            "pour_30ml": "$25",
            "bottle_larger": "$240"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "RAMPUR SELECT",
          "price": {
            "pour_30ml": "$32",
            "bottle_larger": "$320"
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
            "pour_30ml": "$12"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "JACK DANIEL'S TENESSEE RYE",
          "price": {
            "pour_30ml": "$17"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "WOODFORD RESERVE AMERICAN BOURBON",
          "price": {
            "pour_30ml": "$18"
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
            "pour_30ml": "$16"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "STARWARD DOLCE SINGLE MALT",
          "price": {
            "pour_30ml": "$18"
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
            "pour_30ml": "$18"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "KAMIKI INTENSE MALT",
          "price": {
            "pour_30ml": "$18"
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
            "pour_30ml": "$18",
            "bottle_larger": "$188"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "CHIVAS REGAL 12 YEARS",
          "price": {
            "pour_30ml": "$14",
            "bottle_larger": "$138"
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
            "pour_30ml": "$14"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "TALISKER 10 YRS",
          "price": {
            "pour_30ml": "$18",
            "bottle_larger": "$208"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENFIDDICH 12 YRS",
          "price": {
            "pour_30ml": "$18",
            "bottle_larger": "$198"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENFIDDICH 15 YRS",
          "price": {
            "pour_30ml": "$26",
            "bottle_larger": "$308"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENFIDDICH 18 YRS",
          "price": {
            "pour_30ml": "$32"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENLIVET 12 YRS",
          "price": {
            "pour_30ml": "$18",
            "bottle_larger": "$198"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENLIVET 15 YRS",
          "price": {
            "pour_30ml": "$28",
            "bottle_larger": "$328"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "BALVENIE DBL WOOD 12 YRS",
          "price": {
            "pour_30ml": "$20",
            "bottle_larger": "$258"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENGLASSAUGH PORTSOY",
          "price": {
            "pour_30ml": "$20",
            "bottle_larger": "$238"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "GLENGLASSAUGH PORTWOOD",
          "price": {
            "pour_30ml": "$20",
            "bottle_larger": "$238"
          },
          "description": null,
          "is_vegetarian": true
        },
        {
          "name": "LAGAVULIN 16 YRS",
          "price": {
            "pour_30ml": "$24",
            "bottle_larger": "$298"
          },
          "description": null,
          "is_vegetarian": true
        }
      ]
    }
  ]
};

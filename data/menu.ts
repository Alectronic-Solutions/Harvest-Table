// The menu. Every dish carries its farm source and the town that farm sits in,
// per the farm-to-table promise. Items flagged seasonal rotate off the menu as
// the harvest changes and render a "Seasonal" pill in the UI.

export type DietaryFlag = 'V' | 'VE' | 'GF';

export interface MenuItem {
  name: string;
  description: string;
  farmSource: string;
  farmLocation: string;
  price: string;
  seasonal: boolean;
  dietaryFlags?: DietaryFlag[];
}

export interface MenuSection {
  /** Kebab-case id used as the anchor href target. */
  id: string;
  /** Full section label rendered as the section heading. */
  label: string;
  /** Shorter label used in the sticky section nav. */
  navLabel: string;
  items: MenuItem[];
}

export const MENU: MenuSection[] = [
  {
    id: 'starters',
    label: 'Starters',
    navLabel: 'To Start',
    items: [
      {
        name: 'Heirloom Tomato & Burrata',
        description:
          'Sun-warmed tomatoes, torn basil, and a pour of cold-pressed olive oil over creamy burrata.',
        farmSource: 'Sunnyside Farm',
        farmLocation: 'Lodi',
        price: '$16',
        seasonal: true,
        dietaryFlags: ['V', 'GF'],
      },
      {
        name: 'Charred Shishito Peppers',
        description:
          'Blistered over oak coals, finished with flaky sea salt and a squeeze of Meyer lemon.',
        farmSource: 'Cobblestone Gardens',
        farmLocation: 'Winters',
        price: '$12',
        seasonal: false,
        dietaryFlags: ['VE', 'GF'],
      },
      {
        name: 'Stone Fruit & Prosciutto',
        description:
          'Grilled peaches and plums draped in aged prosciutto, with arugula and toasted almond.',
        farmSource: 'Twin Oaks Orchard',
        farmLocation: 'Brentwood',
        price: '$15',
        seasonal: true,
        dietaryFlags: ['GF'],
      },
      {
        name: 'Roasted Beet Carpaccio',
        description:
          'Thin-sliced golden and red beets, whipped chevre, pistachio, and a drizzle of honey.',
        farmSource: 'Riverbend Roots',
        farmLocation: 'Clarksburg',
        price: '$14',
        seasonal: false,
        dietaryFlags: ['V', 'GF'],
      },
    ],
  },
  {
    id: 'mains',
    label: 'Mains',
    navLabel: 'Mains',
    items: [
      {
        name: 'Grass-Fed Ribeye',
        description:
          'Twelve-ounce ribeye over coals, smoked bone marrow butter, and charred spring onion.',
        farmSource: 'Five Mile Cattle Co.',
        farmLocation: 'Galt',
        price: '$42',
        seasonal: false,
        dietaryFlags: ['GF'],
      },
      {
        name: 'Pan-Roasted Half Chicken',
        description:
          'Brined and crisped to order, served with sweet corn succotash and pan jus.',
        farmSource: 'Meadowlark Poultry',
        farmLocation: 'Dixon',
        price: '$29',
        seasonal: false,
      },
      {
        name: 'Wild Mushroom Risotto',
        description:
          'Carnaroli rice folded with foraged chanterelles, aged parmesan, and fresh thyme.',
        farmSource: 'Foggy Hollow Mushrooms',
        farmLocation: 'Capay Valley',
        price: '$26',
        seasonal: true,
        dietaryFlags: ['V'],
      },
      {
        name: 'Line-Caught Sturgeon',
        description:
          'Seared and basted in brown butter, set over braised summer beans and salsa verde.',
        farmSource: 'Delta Waters',
        farmLocation: 'Rio Vista',
        price: '$34',
        seasonal: true,
        dietaryFlags: ['GF'],
      },
      {
        name: 'Heritage Pork Chop',
        description:
          'Double-cut and grilled, glazed with apple cider and stone-ground mustard.',
        farmSource: 'Acorn Ridge Farm',
        farmLocation: 'Wilton',
        price: '$31',
        seasonal: false,
        dietaryFlags: ['GF'],
      },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    navLabel: 'To Finish',
    items: [
      {
        name: 'Brown Butter Peach Galette',
        description:
          'Rustic free-form crust, slow-roasted peaches, and a scoop of buttermilk gelato.',
        farmSource: 'Twin Oaks Orchard',
        farmLocation: 'Brentwood',
        price: '$11',
        seasonal: true,
        dietaryFlags: ['V'],
      },
      {
        name: 'Dark Chocolate Pot de Creme',
        description:
          'Silken custard under sea-salt cream, with a cocoa nib crumble for crunch.',
        farmSource: 'Wildflower Creamery',
        farmLocation: 'Petaluma',
        price: '$10',
        seasonal: false,
        dietaryFlags: ['V', 'GF'],
      },
      {
        name: 'Lavender Honey Panna Cotta',
        description:
          'Set with farm cream and wildflower honey, topped with macerated berries.',
        farmSource: 'Bee Line Apiary',
        farmLocation: 'Esparto',
        price: '$10',
        seasonal: true,
        dietaryFlags: ['V', 'GF'],
      },
      {
        name: 'Olive Oil Citrus Cake',
        description:
          'Moist and bright with blood orange, finished with a dollop of mascarpone.',
        farmSource: 'Riverbend Roots',
        farmLocation: 'Clarksburg',
        price: '$9',
        seasonal: false,
        dietaryFlags: ['V'],
      },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    navLabel: 'Drinks',
    items: [
      {
        name: 'Garden Spritz',
        description:
          'Dry sparkling wine, house cucumber-mint shrub, and a twist of lemon peel.',
        farmSource: 'Cobblestone Gardens',
        farmLocation: 'Winters',
        price: '$13',
        seasonal: true,
        dietaryFlags: ['VE', 'GF'],
      },
      {
        name: 'Smoked Old Fashioned',
        description:
          'Rye, bitters, and demerara under an oak-smoke cloche, served over a single cube.',
        farmSource: 'Foothill Distillery',
        farmLocation: 'Auburn',
        price: '$15',
        seasonal: false,
      },
      {
        name: 'Stone Fruit Sangria',
        description:
          'Red wine steeped with peaches, plums, and orchard herbs, lightly sparkling.',
        farmSource: 'Twin Oaks Orchard',
        farmLocation: 'Brentwood',
        price: '$12',
        seasonal: true,
        dietaryFlags: ['VE', 'GF'],
      },
      {
        name: 'Estate Cold Brew',
        description:
          'Slow-steeped sixteen hours, poured over ice with a splash of farm cream.',
        farmSource: 'Wildflower Creamery',
        farmLocation: 'Petaluma',
        price: '$6',
        seasonal: false,
        dietaryFlags: ['V', 'GF'],
      },
    ],
  },
];

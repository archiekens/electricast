/*
  Appliance Types
  1: Bulb
  2: Fan
  3: Rice cooker
  4: TV
  5: Refrigerator
*/

export const DEFAULT_APPLIANCES = [
  {
    name: 'Light Bulb',
    type: 1,
    wattage: 15,
    timeUsed: 0,
    status: false,
    lastUsed: null,
    icon: 'bulb',
    showInHome: true

  },
  {
    name: 'Electric Fan',
    type: 2,
    wattage: 55,
    timeUsed: 0,
    status: false,
    lastUsed: null,
    icon: 'fan',
    showInHome: true
  },
  {
    name: 'Rice cooker',
    type: 3,
    wattage: 450,
    timeUsed: 0,
    status: false,
    lastUsed: null,
    icon: 'rice-cooker',
    showInHome: true
  },
  {
    name: 'Television',
    type: 4,
    wattage: 180,
    timeUsed: 0,
    status: false,
    lastUsed: null,
    icon: 'tv',
    showInHome: true
  },
  {
    name: 'Refrigerator',
    type: 5,
    wattage: 300,
    timeUsed: 0,
    status: false,
    lastUsed: null,
    icon: 'refrigerator',
    showInHome: true
  }
];

export const DEFAULT_RATE = 9.8385;

export const ICON_NAMES = [
  'aircon',
  'blender',
  'bulb',
  'clothes-iron',
  'coffee-maker',
  'dish-washer',
  'electric-stove',
  'fan',
  'hair-dryer',
  'hair-iron',
  'microwave',
  'others',
  'refrigerator',
  'rice-cooker',
  'toaster',
  'tv',
  'vacuum',
  'washing-machine'
];
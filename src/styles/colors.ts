import { colorFromHex, colorFromHsl } from '../utils/colorify';

const colors = {
  blueSaturatedDarker: colorFromHsl(195, 100 / 100, 5 / 100),
  blueSaturatedDark: colorFromHsl(195, 100 / 100, 10 / 100),
  blueSaturated: colorFromHsl(195, 100 / 100, 14 / 100),
  blueSaturatedLight: colorFromHsl(195, 46 / 100, 22 / 100),
  blueSaturatedLighter: colorFromHsl(195, 46 / 100, 42 / 100),

  blue: colorFromHsl(195, 100 / 100, 46 / 100),
  blueLight: colorFromHsl(195, 100 / 100, 70 / 100),
  blueLighter: colorFromHsl(195, 100 / 100, 95 / 100),

  // Monochromatic

  grayDarker: colorFromHex('#202020'),
  grayDark: colorFromHex('#3f3f3f'),
  gray: colorFromHex('#707070'),
  grayLight: colorFromHex('#bdbdbd'),
  grayLighter: colorFromHex('#eeeeee'),
  white: colorFromHex('#ffffff'),

  // Pinks

  pink: colorFromHex('#e91e63'),
  pinkLight: colorFromHex('#ff4081'),

  // Greens

  green: colorFromHsl(142, 47 / 100, 50 / 100),
  greenLight: colorFromHsl(142, 48 / 100, 85 / 100),
  greenLighter: colorFromHsl(142, 48 / 100, 94 / 100),

  // Reds

  red: colorFromHsl(342, 100 / 100, 45 / 100),
  redLight: colorFromHsl(342, 100 / 100, 89 / 100),
  redLighter: colorFromHsl(342, 100 / 100, 95 / 100),

  // Orange

  orange: colorFromHsl(34, 98 / 100, 48 / 100),
  orangeLight: colorFromHsl(34, 98 / 100, 74 / 100),
  orangeLighter: colorFromHsl(34, 98 / 100, 92 / 100),


  ghostWhite: colorFromHex('#ffffff'), //ghostWhite

  lightSeaGreen: colorFromHex('#00A6A6'), 
  atomicTangerine: colorFromHex('#F79D65'), 
  coral: colorFromHex('#F4845F'), 
  bittersweet: colorFromHex('#F27059'), 
  fireOpal: colorFromHex('#F25C54') 
};

export default colors;

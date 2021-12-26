import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';

import fonts from './fonts';
import colors, { darkColors, lightColors } from './colors';

const defaultTheme = {
  fonts: configureFonts(fonts),
  // mode: 'exact',
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...colors,
    ...lightColors,
  },
  ...defaultTheme,
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...colors,
    ...darkColors,
  },
  ...defaultTheme,
};

export { CombinedDefaultTheme, CombinedDarkTheme };

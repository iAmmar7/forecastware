import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, configureFonts } from 'react-native-paper';

import fontConfig from './fonts';

const defaultTheme = {
  fonts: configureFonts(fontConfig),
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
  ...defaultTheme,
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
  ...defaultTheme,
};

// import colorConfig from './colors';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     ...colorConfig,
//   },
//   fonts: configureFonts(fontConfig),
//   dark: true,
//   mode: 'adaptive',
// };

export { CombinedDefaultTheme, CombinedDarkTheme };

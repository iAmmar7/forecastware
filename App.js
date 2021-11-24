import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';

import { CombinedDarkTheme, CombinedDefaultTheme } from './theme';
import AppNavigator from './navigation/AppNavigator';

// Good for performance
// https://reactnavigation.org/docs/community-libraries-and-navigators/#react-native-screens
enableScreens();

export default function App() {
  const scheme = useColorScheme();
  const theme = useMemo(() => (scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme), [scheme]);
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <AppNavigator theme={theme} />
      </PaperProvider>
    </>
  );
}

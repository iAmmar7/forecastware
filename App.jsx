/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';

import { UserContextProvider, LocationContextProvider } from './contexts';
import { CombinedDarkTheme, CombinedDefaultTheme } from './theme';
import AppNavigator from './navigation/AppNavigator';
import { init as initDB } from './config/db';
import { init as initNotifications } from './config/notifications';

// Good for performance
// https://reactnavigation.org/docs/community-libraries-and-navigators/#react-native-screens
enableScreens();

// Initialize the Database
initDB();

// Initialize notifications
initNotifications();

const combineProviders = (providers) =>
  providers.reduce(
    (Combined, { name: Provider, props = {} }) =>
      ({ children }) =>
        (
          <Combined>
            <Provider {...props}>{children}</Provider>
          </Combined>
        ),
    Fragment,
  );

export default function App() {
  const scheme = useColorScheme();
  const theme = useMemo(
    () => (scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme),
    [scheme],
  );
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
  });
  const Providers = useMemo(
    () =>
      combineProviders([
        { name: PaperProvider, props: { theme } },
        { name: UserContextProvider },
        { name: LocationContextProvider },
      ]),
    [theme],
  );

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style='auto' />
      <Providers>
        <AppNavigator theme={theme} />
      </Providers>
    </>
  );
}

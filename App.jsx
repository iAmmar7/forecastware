import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { BatteryMonitor } from './components';
import { UserContextProvider, LocationContextProvider } from './contexts';
import { CombinedDarkTheme, CombinedDefaultTheme } from './theme';
import { initDB, initNotifications, initTasks } from './config';
import AppNavigator from './navigation/AppNavigator';
import combineProviders from './combineProviders';

// Good for performance @ https://reactnavigation.org/docs/community-libraries-and-navigators/#react-native-screens<
enableScreens();

// Initialize the Database
initDB();

// Initialize notifications
initNotifications();

// Initialize background tasks
initTasks();

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
  });
  const scheme = useColorScheme();
  const theme = useMemo(
    () => (scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme),
    [scheme],
  );
  const Providers = useMemo(
    () =>
      combineProviders([
        { name: PaperProvider, props: { theme } },
        { name: UserContextProvider },
        { name: LocationContextProvider },
        { name: NavigationContainer, props: { theme } },
      ]),
    [theme],
  );

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style='auto' />
      <BatteryMonitor />
      <Providers>
        <AppNavigator theme={theme} />
      </Providers>
    </>
  );
}

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BatteryMonitor } from './components';
import { UserContextProvider, LocationContextProvider } from './contexts';
import { CombinedDarkTheme, CombinedDefaultTheme } from './theme';
import { initDB, initNotifications, initTasks } from './config';
import { themeNames } from './utils/constants';
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
  const [theme, setTheme] = useState(null);
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-medium': require('./assets/fonts/OpenSans-Medium.ttf'),
  });
  const scheme = useColorScheme();

  useEffect(() => {
    (async () => {
      const themeFromStorage = await AsyncStorage.getItem('theme');
      if (themeFromStorage) {
        setTheme(themeFromStorage === themeNames.DARK ? CombinedDarkTheme : CombinedDefaultTheme);
        return;
      }
      setTheme(scheme === themeNames.DARK ? CombinedDarkTheme : CombinedDefaultTheme);
    })();
  }, [scheme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      AsyncStorage.setItem('theme', currentTheme.dark ? themeNames.LIGHT : themeNames.DARK);
      return currentTheme.dark ? CombinedDefaultTheme : CombinedDarkTheme;
    });
  }, [theme]);

  const Providers = useMemo(
    () =>
      combineProviders([
        { name: PaperProvider, props: { theme } },
        { name: UserContextProvider, props: { toggleTheme } },
        { name: LocationContextProvider },
        { name: NavigationContainer, props: { theme } },
      ]),
    [theme],
  );

  if (!fontsLoaded || !theme) return null;

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <BatteryMonitor />
      <Providers>
        <AppNavigator />
      </Providers>
    </>
  );
}

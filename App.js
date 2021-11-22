import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { CombinedDarkTheme, CombinedDefaultTheme } from './theme';
import Startup from './screens/Startup';

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
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Startup />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

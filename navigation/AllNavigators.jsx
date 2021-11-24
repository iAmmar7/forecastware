import React from 'react';
// import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, LocationScreen } from '../screens';

const Stack = createNativeStackNavigator();

// export const defaultStackOptions = () => {
//   const { colors } = useTheme();
//   return {
//     headerStyle: {
//       backgroundColor: Platform.OS === 'android' ? colors.primary : colors.accent,
//     },
//     headerTitleStyle: {
//       color: Platform.OS === 'android' ? 'white' : colors.primary,
//       fontFamily: 'open-sans-bold',
//     },
//     headerBackTitleStyle: {
//       color: colors.accent,
//       fontFamily: 'open-sans',
//     },
//     headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
//   };
// };

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

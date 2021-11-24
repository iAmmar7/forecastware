import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, LocationScreen } from '../screens';
import { Header } from '../components';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: (options) => {
          return <Header {...options} />;
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ headerTitle: 'Location' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

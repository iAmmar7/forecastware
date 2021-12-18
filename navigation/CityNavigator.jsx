import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StartupScreen, CityManagementScreen, CitySearchScreen, OptionScreen } from '../screens';
import { Header, CitySearchHeader } from '../components';
import LocationNavigator from './LocationNavigator';

const Stack = createStackNavigator();

function CityNavigator() {
  return (
    <Stack.Navigator initialRouteName='Startup'>
      <Stack.Screen name='Startup' component={StartupScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={LocationNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name='City'
        component={CityManagementScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          header: Header,
          headerTitle: 'City Management',
          rightIcon: {
            Component: MaterialCommunityIcons,
            name: 'plus',
            navigateTo: 'CitySearch',
          },
        }}
      />
      <Stack.Screen
        name='CitySearch'
        component={CitySearchScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          header: CitySearchHeader,
          headerTitle: 'Add City',
        }}
      />
      <Stack.Screen
        name='Option'
        component={OptionScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          header: Header,
          headerTitle: 'Options',
        }}
      />
    </Stack.Navigator>
  );
}

export default CityNavigator;

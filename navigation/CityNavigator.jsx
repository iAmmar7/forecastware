import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  StartupScreen,
  CityManagementScreen,
  CitySearchScreen,
  OptionScreen,
  MapScreen,
} from '../screens';
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
        options={(opts) => {
          const { navigation } = opts;
          return {
            ...TransitionPresets.SlideFromRightIOS,
            header: Header,
            headerTitle: 'City Management',
            editTite: 'Select Weather Card',
            rightIcon: [
              {
                id: 1,
                Component: MaterialCommunityIcons,
                name: 'plus',
                onClick: () => navigation.navigate('CitySearch'),
              },
              {
                id: 2,
                Component: MaterialCommunityIcons,
                name: 'square-edit-outline',
                onClick: () => navigation.setOptions({ isEditMode: true }),
              },
            ],
          };
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
      <Stack.Screen
        name='Map'
        component={MapScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          header: Header,
          headerTitle: 'Weather Map',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default CityNavigator;

import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { StartupScreen, LocationScreen, CityManagementScreen, CitySearchScreen } from '../screens';
import { CityManagementHeader, TabBar, CitySearchHeader } from '../components';
import { useLocationContext } from '../hooks';
import { isEmpty } from '../utils/helpers';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Startup'>
      <Stack.Screen name='Startup' component={StartupScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name='City'
        component={CityManagementScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          header: CityManagementHeader,
          headerTitle: 'City Management',
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
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const { locations } = useLocationContext();

  return (
    <Tab.Navigator
      initialRouteName='Location'
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBar={TabBar}
    >
      {isEmpty(locations) ? (
        <Tab.Screen name='NoLocation' component={StartupScreen} options={{ headerShown: false }} />
      ) : (
        locations.map((loc) => (
          <Tab.Screen
            key={loc.name}
            name={loc.name}
            component={LocationScreen}
            initialParams={{ locId: loc.id, isCurrent: loc.isCurrent }}
            options={{ headerTitle: loc.name }}
          />
        ))
      )}
    </Tab.Navigator>
  );
}

export default StackNavigator;

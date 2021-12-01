import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { LocationScreen, CityScreen } from '../screens';
import { TabBar } from '../components';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="City" component={CityScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Location"
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Location" component={LocationScreen} options={{ headerTitle: 'Location' }} />
    </Tab.Navigator>
  );
};

export default StackNavigator;

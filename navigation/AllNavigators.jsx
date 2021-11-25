import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeScreen, LocationScreen } from '../screens';
import { TabBar } from '../components';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
      <Tab.Screen name="Location" component={LocationScreen} options={{ headerTitle: 'Location' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

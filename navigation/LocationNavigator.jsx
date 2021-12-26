import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StartupScreen, LocationScreen } from '../screens';
import { TabBar } from '../components';
import { useLocationContext } from '../hooks';
import { isEmpty } from '../utils/helpers';

const Tab = createMaterialTopTabNavigator();

function LocationNavigator() {
  const { locations } = useLocationContext();

  return (
    <Tab.Navigator initialLayout={{ width: Dimensions.get('window').width }} tabBar={TabBar}>
      {isEmpty(locations) ? (
        <Tab.Screen name='NoLocation' component={StartupScreen} options={{ headerShown: false }} />
      ) : (
        locations.map((loc) => (
          <Tab.Screen
            key={loc.name}
            name={loc.name}
            component={LocationScreen}
            initialParams={{
              locId: loc.id,
              isCurrent: loc.isCurrent,
            }}
            options={{ headerTitle: loc.name, name: loc.current?.weather?.[0]?.main }}
          />
        ))
      )}
    </Tab.Navigator>
  );
}

export default LocationNavigator;

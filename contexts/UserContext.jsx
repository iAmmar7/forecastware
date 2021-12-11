import React, { useState, useEffect, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

function UserContextProvider(props) {
  const { children } = props;
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState('Celsius');

  const setTemperatureUnit = (value) => setUnit(value);

  useEffect(() => {
    (async () => {
      const locationFromStorage = await AsyncStorage.getItem('location');
      const unitFromStorage = await AsyncStorage.getItem('unit');
      setLocation(JSON.parse(locationFromStorage)?.location);
      setUnit(unitFromStorage || 'Celsius');
    })();
  }, []);

  const setCurrentLocation = (loc) => {
    setLocation(loc);
    AsyncStorage.setItem('location', JSON.stringify({ location: loc }));
  };

  const clearCurrentLocation = () => {
    setLocation(null);
    AsyncStorage.clear();
  };

  const values = useMemo(
    () => ({
      currentLocation: location,
      unit,
      setCurrentLocation,
      clearCurrentLocation,
      setTemperatureUnit,
    }),
    [location, unit],
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext };

export default UserContextProvider;

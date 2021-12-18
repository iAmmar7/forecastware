import React, { useState, useEffect, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

function UserContextProvider(props) {
  const { children, toggleTheme } = props;
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState('Celsius');

  const setTemperatureUnit = (value) => {
    AsyncStorage.setItem('unit', value);
    setUnit(value);
  };

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
      toggleTheme,
    }),
    [location, unit],
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export { UserContext };

export default UserContextProvider;

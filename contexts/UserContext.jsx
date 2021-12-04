import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState('Celsius');

  const setTemperatureUnit = (unit) => setUnit(unit);

  useEffect(() => {
    (async () => {
      const locationFromStorage = await AsyncStorage.getItem('location');
      setLocation(JSON.parse(locationFromStorage));
    })();
  }, []);

  const setCurrentLocation = (location) => {
    setLocation(location);
    AsyncStorage.setItem('location', JSON.stringify({ location }));
  };

  const clearCurrentLocation = () => {
    setLocation(null);
    AsyncStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{ currentLocation: location, setCurrentLocation, clearCurrentLocation, unit, setTemperatureUnit }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

export default UserContextProvider;

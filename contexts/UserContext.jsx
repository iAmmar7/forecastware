import React, { useState, createContext } from 'react';
import * as Location from 'expo-location';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [unit, setUnit] = useState('Celsius');

  const fetchLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const askForLocation = async () => {
    let position = await Location.requestForegroundPermissionsAsync();
    if (position.status !== 'granted') return;
    fetchLocation();
  };

  const setTemperatureUnit = (unit) => setUnit(unit);

  return (
    <UserContext.Provider value={{ location, unit, askForLocation, fetchLocation, setTemperatureUnit }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

export default UserContextProvider;

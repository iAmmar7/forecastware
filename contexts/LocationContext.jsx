import React, { useState, createContext } from 'react';

import dummyLocations from '../utils/dummy-data';

const LocationContext = createContext(null);

const LocationContextProvider = ({ children }) => {
  const [locations, setLocations] = useState(dummyLocations || []);

  const addLocation = (data) => {
    const locationIndex = locations.findIndex((loc) => loc.name === data.name);

    if (locationIndex > -1) {
      const newLocations = { ...locations };
      newLocations[locationIndex] = data;
      setLocations(locations);
      // TODO: Update the DB
      return;
    }

    setLocations((addedLocations) => [...addedLocations, data]);
  };

  return <LocationContext.Provider value={{ locations, addLocation }}>{children}</LocationContext.Provider>;
};

export { LocationContext };

export default LocationContextProvider;

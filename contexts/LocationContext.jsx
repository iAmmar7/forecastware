import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useCallback } from 'react/cjs/react.development';
import { dummyLocations } from '../utils/dummy-data';

const LocationContext = createContext(null);

function LocationContextProvider({ children }) {
  const [locations, setLocations] = useState(dummyLocations || []);

  const addLocation = useCallback(
    (data) => {
      const locationIndex = locations.findIndex((loc) => loc.name === data.name);

      if (locationIndex > -1) {
        const newLocations = { ...locations };
        newLocations[locationIndex] = data;
        setLocations(locations);
        // TODO: Update the DB
        return;
      }

      setLocations((addedLocations) => [...addedLocations, data]);
    },
    [locations],
  );

  const removeLocation = useCallback(
    (data) => {
      const newLocations = locations.filter((loc) => loc.name !== data.name);
      setLocations(newLocations);
      // TODO: Update the DB
    },
    [locations],
  );

  const values = useMemo(
    () => ({
      locations,
      addLocation,
      removeLocation,
    }),
    [locations],
  );

  return <LocationContext.Provider value={values}>{children}</LocationContext.Provider>;
}

LocationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocationContext };

export default LocationContextProvider;

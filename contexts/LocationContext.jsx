/* eslint-disable no-underscore-dangle */
import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useCallback } from 'react/cjs/react.development';
import { insertLocation, fetchAllLocations, deleteLocation } from '../config/db';

const LocationContext = createContext(null);

function LocationContextProvider({ children }) {
  const [locations, setLocations] = useState([]);

  const fetchLocations = useCallback(async () => {
    try {
      const dbResponse = await fetchAllLocations();
      const dbLocations = (dbResponse?.rows?._array || []).map((loc) => {
        const parsedData = JSON.parse(loc?.data || {});
        return {
          id: loc?.id,
          isCurrent: loc?.isCurrent === 1,
          name: loc?.name,
          lat: loc?.lat,
          lon: loc?.lon,
          ...parsedData,
        };
      });
      setLocations(dbLocations);
    } catch (error) {
      console.log('DB Error', error);
    }
  }, [locations]);

  const addLocation = useCallback(
    async (data, isCurrent = false) => {
      try {
        const locationIndex = locations.findIndex((loc) => loc.name === data.name);
        if (locationIndex > -1) return;

        // Add into the DB
        const dbResponse = await insertLocation(data, isCurrent);
        setLocations((addedLocations) => [
          ...addedLocations,
          { id: dbResponse.insertId, isCurrent, ...data },
        ]);
      } catch (error) {
        console.log('DB Error', error);
      }
    },
    [locations],
  );

  const removeLocation = useCallback(
    async (data) => {
      try {
        const newLocations = locations.filter((loc) => loc.id !== data.id);
        // Delete from the DB
        await deleteLocation(data.id);
        setLocations(newLocations);
      } catch (error) {
        console.log('DB Error', error);
      }
    },
    [locations],
  );

  const values = useMemo(
    () => ({
      locations,
      addLocation,
      removeLocation,
      fetchLocations,
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

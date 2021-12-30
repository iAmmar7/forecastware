/* eslint-disable no-underscore-dangle */
import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useCallback } from 'react/cjs/react.development';
import {
  insertLocation,
  fetchAllLocations,
  deleteLocation,
  updateLocation as updateLocationDB,
  deleteMultipleLocations,
} from '../config/db';

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
          unit: loc?.unit,
          ...parsedData,
        };
      });

      // Update the context
      setLocations(dbLocations);
      return dbLocations;
    } catch (error) {
      console.log('DB Error', error);
      return error;
    }
  }, [locations]);

  const addLocation = useCallback(
    async (data, isCurrent = false) => {
      try {
        const locationIndex = locations.findIndex((loc) => loc.name === data.name);
        if (locationIndex > -1) return;

        // Add into the DB
        const dbResponse = await insertLocation(data, isCurrent);

        // Update the context
        setLocations((addedLocations) => [
          ...addedLocations,
          { ...data, id: dbResponse.insertId, isCurrent },
        ]);
      } catch (error) {
        console.log('DB Error', error);
      }
    },
    [locations],
  );

  const updateLocation = useCallback(
    async (data) => {
      try {
        const locationIndex = locations.findIndex((loc) => loc.name === data.name);
        if (locationIndex < 0) return;

        // Update the DB
        await updateLocationDB(data);

        // Update the context
        setLocations((oldLocations) => {
          const newLocations = [...oldLocations];
          newLocations[locationIndex] = { ...data };
          return newLocations;
        });
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

        // Update the context
        setLocations(newLocations);
      } catch (error) {
        console.log('DB Error', error);
      }
    },
    [locations],
  );

  const removeMultipleLocations = useCallback(
    async (ids) => {
      try {
        const newLocations = locations.filter((loc) => !ids.includes(loc.id));

        // Delete from the DB
        await deleteMultipleLocations(ids);

        // Update the context
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
      updateLocation,
      removeLocation,
      removeMultipleLocations,
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

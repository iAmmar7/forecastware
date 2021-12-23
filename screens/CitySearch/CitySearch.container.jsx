import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useLocationContext, useUserContext } from 'forecastware/hooks';
import { fetchWeather, fetchCurrentLocationWeather } from 'forecastware/api';
import CitySearchComponent from './CitySearch.component';

function CitySearchContainer(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [{ unit, currentLocation }, { addLocation, removeLocation }] = [
    useUserContext(),
    useLocationContext(),
  ];

  const handleAddLocation = async (location, isCurrent) => {
    setIsLoading(true);
    const api = isCurrent ? fetchCurrentLocationWeather : fetchWeather;
    const weather = await api(location, unit);
    await addLocation(weather, isCurrent);
    setIsLoading(false);
    navigation.navigate('Home', { screen: weather.name });
  };

  const handleRemoveLocation = async (location) => {
    setIsLoading(true);
    await removeLocation(location);
    setIsLoading(false);
    navigation.navigate('Home');
  };

  return (
    <CitySearchComponent
      navigation={navigation}
      loading={isLoading}
      currentLocation={currentLocation}
      handleAddLocation={handleAddLocation}
      handleRemoveLocation={handleRemoveLocation}
    />
  );
}

CitySearchContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CitySearchContainer;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CitySearchComponent from './CitySearch.component';
import { useLocationContext, useUserContext } from 'forecastware/hooks';
import { fetchWeather } from 'forecastware/api';

function CitySearchContainer(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [{ unit }, { addLocation, removeLocation }] = [useUserContext(), useLocationContext()];

  const handleAddLocation = async (location) => {
    setIsLoading(true);
    const weather = await fetchWeather(location, unit);
    await addLocation(weather);
    setIsLoading(false);
    navigation.navigate('Home', { screen: location.name });
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
      handleAddLocation={handleAddLocation}
      handleRemoveLocation={handleRemoveLocation}
    />
  );
}

CitySearchContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CitySearchContainer;

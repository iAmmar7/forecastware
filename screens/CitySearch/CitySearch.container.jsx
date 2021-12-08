import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CitySearchComponent from './CitySearch.component';
import { useLocationContext, useUserContext } from '../../hooks';
import { fetchWeather } from '../../api';

function CitySearchContainer(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [{ unit }, { addLocation, removeLocation }] = [useUserContext(), useLocationContext()];

  const handleAddLocation = async (location) => {
    setIsLoading(true);
    const weather = await fetchWeather(location, unit);
    addLocation(weather);
    setIsLoading(false);
    navigation.navigate('Home', { screen: location.name });
  };

  const handleRemoveLocation = async (location) => {
    setIsLoading(true);
    removeLocation(location);
    setIsLoading(false);
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

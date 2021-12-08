import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CitySearchComponent from './CitySearch.component';
import { useLocationContext, useUserContext } from '../../hooks';
import { fetchWeather } from '../../api';

function CitySearchContainer(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [{ unit }, { addLocation }] = [useUserContext(), useLocationContext()];

  const handleAddLocation = async (location) => {
    setIsLoading(true);
    const weather = await fetchWeather(location, unit);
    addLocation(weather);
    setIsLoading(false);
    navigation.navigate('Home', { screen: location.name });
  };

  return (
    <CitySearchComponent
      navigation={navigation}
      loading={isLoading}
      handleAddLocation={handleAddLocation}
    />
  );
}

CitySearchContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CitySearchContainer;

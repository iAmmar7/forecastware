import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';

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

  useEffect(() => {
    navigation.setOptions({ handleAddLocation, handleRemoveLocation });
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      navigation.setOptions({ dismissSearch: true });
    });

    // cleanup function
    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const handleAddLocation = async (location, isCurrent) => {
    handleDismissSearch();
    setIsLoading(true);
    const api = isCurrent ? fetchCurrentLocationWeather : fetchWeather;
    const weather = await api(location, unit);
    await addLocation(weather, isCurrent);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home', { screen: weather.name });
    }, 10);
  };

  const handleRemoveLocation = async (location) => {
    setIsLoading(true);
    await removeLocation(location);
    setIsLoading(false);
    navigation.navigate('Home');
  };

  const handleDismissSearch = () => {
    Keyboard.dismiss();
  };

  return (
    <CitySearchComponent
      navigation={navigation}
      loading={isLoading}
      currentLocation={currentLocation}
      handleAddLocation={handleAddLocation}
      handleRemoveLocation={handleRemoveLocation}
      handleDismissSearch={handleDismissSearch}
    />
  );
}

CitySearchContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CitySearchContainer;

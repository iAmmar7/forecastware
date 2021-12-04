import React from 'react';
import * as WebBrowser from 'expo-web-browser';

import LocationComponent from './Location.component';
import { useUserContext } from '../../hooks';

const LocationContainer = (props) => {
  const {
    route: { params: { weather = null } = {} },
  } = props;
  const { unit } = useUserContext();

  const handleExternalLink = async () => {
    await WebBrowser.openBrowserAsync('https://weather.com/en-US');
  };

  return <LocationComponent data={weather} unit={unit} handleExternalLink={handleExternalLink} />;
};

export default LocationContainer;

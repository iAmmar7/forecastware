import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

import HomeComponent from './Home.component';
import { useUserContext } from '../../hooks';
import { fetchWeather } from './api';

const HomeContainer = () => {
  const [weather, setWeather] = useState(null);
  const { location, unit } = useUserContext();

  useEffect(() => {
    (async () => {
      const weather = await fetchWeather(location, unit);
      setWeather(weather);
    })();
  }, [location]);

  const handleExternalLink = async () => {
    await WebBrowser.openBrowserAsync('https://weather.com/en-US');
  };

  return <HomeComponent data={weather} unit={unit} handleExternalLink={handleExternalLink} />;
};

export default HomeContainer;

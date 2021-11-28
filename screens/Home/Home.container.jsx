import React, { useState, useEffect } from 'react';

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

  return <HomeComponent data={weather} unit={unit} />;
};

export default HomeContainer;

import React, { useRef, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as WebBrowser from 'expo-web-browser';

import { useLocationContext, useUserContext } from '../../hooks';
import { fetchWeather } from '../../api';
import LocationComponent from './Location.component';

function LocationContainer(props) {
  const {
    route: { params: { locId = null } = {} },
    navigation,
  } = props;
  const [{ unit }, { locations, updateLocation }] = [useUserContext(), useLocationContext()];
  const animationRef = useRef();
  const scrollRef = useRef();
  const [refreshing, setRefreshing] = useState(false);

  const weather = useMemo(
    () => locations.find((loc) => loc.id === locId) || null,
    [locId, locations],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const newWeather = await fetchWeather(weather, unit);
    await updateLocation(newWeather);
    setRefreshing(false);
  }, [weather, locations, unit]);

  const handleExternalLink = useCallback(async () => {
    await WebBrowser.openBrowserAsync('https://weather.com/en-US');
  }, []);

  const handleOnScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y || 0;
    if (offsetY === 0) {
      handleRefresh();
    }
    if (offsetY <= 80) {
      scrollRef.current?.scrollTo({ y: 0 });
      navigation.setOptions({ hasScrolled: false });
      return;
    }
    if (offsetY > 80 && offsetY < 160) {
      scrollRef.current?.scrollTo({ y: 200 });
    }
    if (offsetY > 80) {
      navigation.setOptions({ hasScrolled: true });
    }
  };

  return (
    <LocationComponent
      data={weather}
      unit={unit}
      animationRef={animationRef}
      scrollRef={scrollRef}
      refreshing={refreshing}
      handleRefresh={handleRefresh}
      handleExternalLink={handleExternalLink}
      handleOnScroll={handleOnScroll}
    />
  );
}

LocationContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default LocationContainer;

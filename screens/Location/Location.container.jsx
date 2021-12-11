import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as WebBrowser from 'expo-web-browser';
import { captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

import LocationComponent from './Location.component';
import { useUserContext } from '../../hooks';
import { fetchWeather } from '../../api';

function LocationContainer(props) {
  const {
    route: { params: { weather = null } = {} },
    navigation,
  } = props;
  const { unit } = useUserContext();
  const viewShotRef = useRef();
  const animationRef = useRef();
  const scrollRef = useRef();
  const [message, setMessage] = useState({ type: null, text: null });
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchWeather(weather, unit);
    setRefreshing(false);
  }, [weather]);

  const handleExternalLink = useCallback(async () => {
    await WebBrowser.openBrowserAsync('https://weather.com/en-US');
  }, []);

  const handleSnackbarDismiss = useCallback(
    () => setMessage({ type: null, text: null }),
    [message],
  );

  const fadeAnimation = useCallback(() => animationRef.current.fadeIn(1000), [animationRef]);

  const handleImageSave = useCallback(
    async (image) => {
      try {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (!permission.granted) return;

        const assert = await MediaLibrary.createAssetAsync(image);
        await MediaLibrary.createAlbumAsync('ForecastWare', assert);

        setMessage({ type: 'info', text: 'Screenshot saved!' });
      } catch (err) {
        console.log('Unable to save', err);
        setMessage({ type: 'error', text: 'Unable to take the screenshot!' });
      }
    },
    [message],
  );

  const handleFAB = useCallback(async () => {
    fadeAnimation();
    captureScreen({
      format: 'jpg',
      quality: 1,
    }).then(
      (uri) => handleImageSave(uri),
      (err) => {
        console.error('Oops, snapshot failed', err);
        setMessage({ type: 'error', text: 'Unable to take the screenshot!' });
      },
    );
  }, [message]);

  const handleOnScroll = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y || 0;
    if (offsetY === 0) {
      handleRefresh();
    }
    if (offsetY <= 80) {
      scrollRef.current?.scrollTo({ y: 0 });
      navigation.setOptions({ hasScrolled: false });
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
      viewShotRef={viewShotRef}
      animationRef={animationRef}
      scrollRef={scrollRef}
      message={message}
      refreshing={refreshing}
      handleRefresh={handleRefresh}
      handleExternalLink={handleExternalLink}
      handleFAB={handleFAB}
      handleSnackbarDismiss={handleSnackbarDismiss}
      handleOnScroll={handleOnScroll}
    />
  );
}

LocationContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default LocationContainer;

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as WebBrowser from 'expo-web-browser';
import { captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

import LocationComponent from './Location.component';
import { useUserContext } from '../../hooks';

function LocationContainer(props) {
  const {
    route: { params: { weather = null } = {} },
  } = props;
  const { unit } = useUserContext();
  const viewShotRef = useRef();
  const animationRef = useRef();
  const [message, setMessage] = useState({ type: null, text: null });

  const handleExternalLink = async () => {
    await WebBrowser.openBrowserAsync('https://weather.com/en-US');
  };

  const handleSnackbarDismiss = () => setMessage({ type: null, text: null });

  const fadeAnimation = () => animationRef.current.fadeIn(1000);

  const handleImageSave = async (image) => {
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
  };

  const handleFAB = async () => {
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
  };

  return (
    <LocationComponent
      data={weather}
      unit={unit}
      viewShotRef={viewShotRef}
      animationRef={animationRef}
      handleExternalLink={handleExternalLink}
      handleFAB={handleFAB}
      message={message}
      handleSnackbarDismiss={handleSnackbarDismiss}
    />
  );
}

LocationContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LocationContainer;

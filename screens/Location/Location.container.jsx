import React, { useRef } from 'react';
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

  const handleExternalLink = async () => {
    await WebBrowser.openBrowserAsync('https://weather.com/en-US');
  };

  const handleImageSave = async (image) => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) return;

      const assert = await MediaLibrary.createAssetAsync(image);
      console.log('assert', assert);
      const album = await MediaLibrary.createAlbumAsync('ForecastWare', assert);
      console.log('album', album);
    } catch (error) {
      console.log('Unable to save', error);
    }
  };

  const handleFAB = async () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      (uri) => handleImageSave(uri),
      (error) => console.error('Oops, snapshot failed', error),
    );
  };

  return (
    <LocationComponent
      data={weather}
      unit={unit}
      viewShotRef={viewShotRef}
      handleExternalLink={handleExternalLink}
      handleFAB={handleFAB}
    />
  );
}

LocationContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LocationContainer;

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FAB } from 'react-native-paper';
import { captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

import { useStyles } from 'forecastware/hooks';
import Snackbar from './Snackbar';

function ScreenshotTaker(props) {
  const { animationRef } = props;
  const { styles } = useStyles(createStyles);
  const [message, setMessage] = useState(null);

  const flashAnimation = useCallback(() => animationRef.current.flash(200), [animationRef]);

  const handleTakeScreenShot = useCallback(() => {
    if (animationRef) flashAnimation();
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
  }, []);

  const handleImageSave = useCallback(
    async (image) => {
      try {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (!permission.granted) {
          setMessage({ type: 'error', text: 'Please allow permission to take screenshot!' });
          return;
        }

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

  return (
    <>
      <FAB style={styles.fab} small icon='camera' onPress={handleTakeScreenShot} />
      <Snackbar
        message={message?.text}
        severity={message?.type}
        onDismiss={() => setMessage(null)}
      />
    </>
  );
}

const createStyles = (theme) => ({
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    opacity: 0.5,
    backgroundColor: theme.colors.placeholder,
  },
});

ScreenshotTaker.propTypes = {
  animationRef: PropTypes.object,
};

ScreenshotTaker.defaultProps = {
  animationRef: null,
};

export default ScreenshotTaker;

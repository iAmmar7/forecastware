import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Surface, Portal } from 'react-native-paper';
import MapView, { UrlTile } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { useStyles } from 'forecastware/hooks';
import { ScreenshotTaker } from 'forecastware/components';
import Header from './components/Header';
import Modal from './components/Modal';

function MapComponent(props) {
  const {
    region,
    urlTemplate,
    optionsVisible,
    layerType,
    toggleOptions,
    animationRef,
    handleBack,
    handleChangeLayerType,
    handleLocationChange,
  } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Portal.Host>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen}
      >
        <Animatable.View ref={animationRef}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <MapView style={styles.map} region={region}>
              <UrlTile urlTemplate={urlTemplate} flipY={false} zIndex={1} />
            </MapView>
          </TouchableWithoutFeedback>
        </Animatable.View>
        <Portal>
          <Surface style={styles.overlay}>
            <Animatable.View animation='pulse'>
              <Header
                handleLeftIconClick={handleBack}
                handleRightIconClick={toggleOptions}
                handleSelectLocation={handleLocationChange}
              />
            </Animatable.View>
            <Modal
              visible={optionsVisible}
              toggleModal={toggleOptions}
              selected={layerType}
              handleChangeOptions={handleChangeLayerType}
            />
          </Surface>
        </Portal>
      </KeyboardAvoidingView>
      <ScreenshotTaker animationRef={animationRef} />
    </Portal.Host>
  );
}

const createStyles = () => ({
  screen: {
    flex: 1,
    borderWidth: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
  },
  overlay: {
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: 'transparent',
  },
});

MapComponent.propTypes = {
  region: PropTypes.object.isRequired,
  urlTemplate: PropTypes.string.isRequired,
  layerType: PropTypes.string.isRequired,
  optionsVisible: PropTypes.bool.isRequired,
  animationRef: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired,
  handleChangeLayerType: PropTypes.func.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
};

export default MapComponent;

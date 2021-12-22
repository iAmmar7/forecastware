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
import Header from './components/Header';
import Modal from './components/Modal';

function MapComponent(props) {
  const {
    region,
    urlTemplate,
    optionsVisible,
    layerType,
    toggleOptions,
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <MapView style={styles.map} region={region}>
            <UrlTile urlTemplate={urlTemplate} flipY={false} zIndex={1} />
          </MapView>
        </TouchableWithoutFeedback>
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
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: 'transparent',
  },
});

MapComponent.propTypes = {
  region: PropTypes.object.isRequired,
  urlTemplate: PropTypes.string.isRequired,
  layerType: PropTypes.string.isRequired,
  optionsVisible: PropTypes.bool.isRequired,
  handleBack: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired,
  handleChangeLayerType: PropTypes.func.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
};

export default MapComponent;

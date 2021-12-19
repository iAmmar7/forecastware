import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Surface } from 'react-native-paper';
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
  } = props;
  const { styles } = useStyles(createStyles);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MapView style={styles.map} initialRegion={region}>
          <UrlTile urlTemplate={urlTemplate} flipY={false} zIndex={1} />
        </MapView>
      </TouchableWithoutFeedback>
      <Surface style={styles.overlay}>
        <Animatable.View animation='pulse'>
          <Header handleLeftIconClick={handleBack} handleRightIconClick={toggleOptions} />
        </Animatable.View>
        <Modal
          visible={optionsVisible}
          toggleModal={toggleOptions}
          selected={layerType}
          handleChangeOptions={handleChangeLayerType}
        />
      </Surface>
    </KeyboardAvoidingView>
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
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
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
};

export default MapComponent;

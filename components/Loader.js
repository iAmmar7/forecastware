import React from 'react';
import PropTypes from 'prop-types';
import { Surface, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../hooks';

function Loader(props) {
  const { label, style, textStyle } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={{ ...styles.container, ...style }}>
      <Animatable.Image
        animation='bounceIn'
        delay={100}
        iterationCount='infinite'
        direction='alternate'
        useNativeDriver
        source={require('../assets/logo.png')}
        style={{ width: 36, height: 36 }}
      />
      <Text style={{ ...styles.text, ...textStyle }}>{label}</Text>
    </Surface>
  );
}

const createStyles = () => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  text: {
    fontSize: 12,
    fontFamily: 'open-sans-bold',
  },
});

Loader.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  label: PropTypes.string,
};

Loader.defaultProps = {
  style: {},
  textStyle: {},
  label: 'Loading...',
};

export default Loader;

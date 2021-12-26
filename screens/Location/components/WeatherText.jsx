import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';

function WeatherText(props) {
  const { children, secondary, ...otherProps } = props;

  return (
    <Text
      theme={{ colors: { text: secondary ? 'rgba(0, 0, 0, 0.54)' : 'rgb(28, 28, 30)' } }}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

WeatherText.propTypes = {
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
};

WeatherText.defaultProps = {
  secondary: false,
};

export default WeatherText;

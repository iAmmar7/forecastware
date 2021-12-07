/* eslint-disable import/no-unresolved */
import React from 'react';
import { Surface, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../hooks';

function StartupComponent() {
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.container}>
      <Animatable.Image
        animation='bounceIn'
        delay={100}
        iterationCount='infinite'
        direction='alternate'
        useNativeDriver
        source={require('../assets/logo.png')}
        style={{ width: 36, height: 36 }}
      />
      <Text style={styles.text}>Loading...</Text>
    </Surface>
  );
}

const createStyles = () => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
});

export default StartupComponent;

import React from 'react';
import { Surface, Headline } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import useStyles from '../hooks/useStyles';

const Startup = () => {
  const [styles, { colors }] = useStyles(createStyles);

  return (
    <Surface style={styles.screen}>
      <LinearGradient colors={[colors.primary, colors.card, colors.accent]} style={styles.gradient}>
        <Surface style={styles.container}>
          <Animatable.Image
            animation="slideInRight"
            delay={100}
            iterationCount="infinite"
            direction="alternate"
            useNativeDriver={true}
            source={require('../assets/logo.png')}
            style={{ width: 66, height: 66 }}
          ></Animatable.Image>
          <Surface style={styles.headline}>
            <Headline style={styles.title}>Forecast</Headline>
            <Headline style={styles.subTitle}>Ware</Headline>
          </Surface>
        </Surface>
      </LinearGradient>
    </Surface>
  );
};

const createStyles = (theme) => ({
  screen: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    backgroundColor: 'transparent',
  },
  headline: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  title: {
    fontSize: 26,
  },
  subTitle: {
    color: theme.colors.primary,
    fontSize: 26,
  },
});

export default Startup;

import React from 'react';
import { Surface, Headline } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../../hooks';

function StartupComponent() {
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.screen}>
      <Surface style={styles.wrapper}>
        <Surface style={styles.container}>
          <Surface style={styles.logoContainer}>
            <Animatable.Image
              animation='slideInRight'
              delay={100}
              iterationCount='infinite'
              direction='alternate'
              useNativeDriver
              source={require('../../assets/logo.png')}
              style={{ width: 66, height: 66 }}
            />
          </Surface>
          <Surface style={styles.headline}>
            <Headline style={styles.title}>Forecast</Headline>
            <Headline style={styles.subTitle}>Ware</Headline>
          </Surface>
        </Surface>
        <Surface style={styles.secondContainer} />
      </Surface>
    </Surface>
  );
}

const createStyles = (theme) => ({
  screen: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.accent,
  },
  container: {
    flex: 2,
    backgroundColor: theme.colors.surface,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    paddingBottom: 40,
  },
  logoContainer: {
    width: '42%',
  },
  secondContainer: {
    flex: 1,
    backgroundColor: theme.colors.accent,
  },
  headline: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontFamily: 'open-sans-medium',
  },
  subTitle: {
    color: theme.colors.primary,
    fontFamily: 'open-sans-medium',
    fontSize: 30,
  },
});

export default StartupComponent;

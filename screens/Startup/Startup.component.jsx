import React from 'react';
import PropTypes from 'prop-types';
import { Surface, Headline, Card, Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../../hooks';

function StartupComponent(props) {
  const { snackbarVisible, handleSnackbar, handleAskPermissions } = props;
  const { styles, theme } = useStyles(createStyles);

  return (
    <Surface style={styles.screen}>
      <Surface style={styles.wrapper}>
        <Card style={styles.container}>
          <Surface style={styles.content}>
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
        </Card>
        <Surface style={styles.secondContainer} />
      </Surface>
      <Snackbar
        visible={snackbarVisible}
        duration={50000}
        onDismiss={handleSnackbar}
        action={{
          label: 'Okay',
          onPress: handleAskPermissions,
        }}
        theme={{ colors: { onSurface: theme.colors.surface, surface: theme.colors.text } }}
      >
        Please allow location access to continue!
      </Snackbar>
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
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    paddingBottom: 40,
    elevation: 10,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: theme.colors.surface,
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

StartupComponent.propTypes = {
  snackbarVisible: PropTypes.bool.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
  handleAskPermissions: PropTypes.func.isRequired,
};

export default StartupComponent;

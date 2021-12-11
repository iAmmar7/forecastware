import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Appbar, Text, Surface, Title } from 'react-native-paper';

import { useStyles } from '../hooks';

function TabBar(props) {
  const {
    state: { index: tabIndex, routes, routeNames },
    descriptors,
    navigation,
  } = props;
  const { styles, theme } = useStyles(createStyles);

  const routeDetails = useMemo(() => {
    const routeKey = routes[tabIndex].key;
    return descriptors[routeKey];
  }, [routes, tabIndex, descriptors]);

  const currentTabTitle = useMemo(() => {
    const title = routeDetails.options?.headerTitle;
    return title;
  }, [routeDetails]);

  const handleNavigate = () => {
    navigation.navigate('City');
  };

  const hasScrolled = useMemo(() => {
    return routeDetails.options.hasScrolled;
  }, [routeDetails]);

  console.log('tabBar', hasScrolled);

  return (
    <Appbar.Header
      theme={{ colors: { primary: theme.colors.surface } }}
      style={{ ...styles.header, ...(hasScrolled && { elevation: 1 }) }}
    >
      <Appbar.Action
        icon='city-variant-outline'
        color={hasScrolled ? theme.colors.primary : theme.colors.text}
        onPress={handleNavigate}
      />
      <Appbar.Content
        title={
          <Surface style={styles.titleContainer}>
            <Title>{currentTabTitle}</Title>
            {!hasScrolled && routes.length > 1 && (
              <Surface style={styles.dotContainer}>
                {routes.map((route) => (
                  <Text
                    key={route.key}
                    style={{
                      ...styles.dot,
                      ...(route.name === routeNames[tabIndex] && { ...styles.blackDot }),
                    }}
                  >
                    &#8226;
                  </Text>
                ))}
              </Surface>
            )}
          </Surface>
        }
        titleStyle={styles.titleStyles}
      />
      <Appbar.Action
        icon='dots-vertical'
        color={hasScrolled ? theme.colors.primary : theme.colors.text}
        onPress={() => {}}
      />
    </Appbar.Header>
  );
}

const createStyles = (theme) => ({
  header: {
    elevation: 0,
  },
  titleStyles: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleContainer: {
    alignItems: 'center',
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    overflow: 'hidden',
  },
  dot: {
    paddingHorizontal: 2,
    paddingVertical: 0,
    color: theme.colors.placeholder,
    fontSize: 16,
  },
  blackDot: {
    color: theme.colors.onSurface,
  },
});

TabBar.propTypes = {
  state: PropTypes.object.isRequired,
  descriptors: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default TabBar;

import React, { useMemo } from 'react';
import { Appbar, Text, Surface, Title } from 'react-native-paper';

import { useStyles } from '../hooks';

function TabBar(props) {
  const {
    state: { index: tabIndex, routes, routeNames },
    descriptors,
    navigation,
  } = props;
  const { styles, theme } = useStyles(createStyles);

  const currentTabTitle = useMemo(() => {
    const routeKey = routes[tabIndex].key;
    const title = descriptors[routeKey].options?.headerTitle;

    return title;
  }, [routes, tabIndex]);

  const handleNavigate = () => {
    console.log('navigation', navigation);
    navigation.navigate('City');
  };

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={styles.header}>
      <Appbar.Action icon="city-variant-outline" onPress={handleNavigate} />
      <Appbar.Content
        title={
          <Surface style={styles.titleContainer}>
            <Title>{currentTabTitle}</Title>
            {routes.length > 1 && (
              <Surface style={styles.dotContainer}>
                {routes.map((route) => (
                  <Text
                    key={route.key}
                    style={{ ...styles.dot, ...(route.name === routeNames[tabIndex] && { ...styles.blackDot }) }}
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
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
}

const createStyles = (theme) => ({
  header: {},
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

export default TabBar;

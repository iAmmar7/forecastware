import React, { useMemo } from 'react';
import { Appbar, Surface, Text, Title } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

import useStyles from '../hooks/useStyles';

function TabBar(props) {
  const {
    state: { index: tabIndex, routes, routeNames },
    descriptors,
    navigation,
    position,
  } = props;
  const { styles, theme } = useStyles(createStyles);

  const currentTabTitle = useMemo(() => {
    const routeKey = routes[tabIndex].key;
    const title = descriptors[routeKey].options?.headerTitle;

    return title;
  }, [routes, tabIndex]);

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={styles.header}>
      <Appbar.Action icon="city-variant-outline" onPress={() => {}} />
      <Appbar.Content
        title={
          <Surface style={styles.titleContainer}>
            <Title>{currentTabTitle}</Title>
            <Surface style={styles.dotContainer}>
              {routes.map((route) => (
                <Entypo
                  name="dot-single"
                  size={24}
                  color={route.name === routeNames[tabIndex] ? 'black' : 'grey'}
                  style={styles.dot}
                />
              ))}
            </Surface>
          </Surface>
        }
        titleStyle={styles.titleStyles}
      />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
}

const createStyles = (theme) => ({
  header: {
    paddingBottom: 20,
    height: 60,
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
    // borderWidth: 1,
    // borderColor: 'green',
  },
});

export default TabBar;

import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Appbar, Text, Surface, Title, Button } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../hooks';

function TabBar(props) {
  const {
    state: { index: tabIndex, routes, routeNames },
    descriptors,
    navigation,
  } = props;
  const titleRef = useRef();
  const routesRef = useRef();
  const { styles, theme } = useStyles(createStyles);

  const routeDetails = useMemo(() => {
    const routeKey = routes[tabIndex].key;
    return descriptors[routeKey];
  }, [routes, tabIndex, descriptors]);

  const currentTabTitle = useMemo(() => {
    const title = routeDetails.options?.headerTitle;
    return title;
  }, [routeDetails]);

  const hasScrolled = useMemo(() => {
    return routeDetails.options.hasScrolled;
  }, [routeDetails]);

  useEffect(() => {
    if (hasScrolled) {
      routesRef.current?.fadeOut(800);
    } else {
      titleRef.current?.fadeIn(800);
      routesRef.current?.fadeIn(800);
    }
  }, [hasScrolled]);

  return (
    <Surface>
      <Animatable.View
        transition={['paddingTop', 'paddingBottom']}
        style={{
          ...styles.header,
          paddingTop: hasScrolled ? Constants.statusBarHeight : Constants.statusBarHeight + 10,
          paddingBottom: hasScrolled ? 0 : 10,
          elevation: hasScrolled ? 1 : 0,
          borderBottomColor: theme.colors.surface,
        }}
      >
        <Button
          mode='text'
          compact
          onPress={() => navigation.navigate('City')}
          theme={{ colors: { primary: theme.colors.placeholder } }}
          style={styles.btn}
        >
          <MaterialCommunityIcons
            name='city-variant-outline'
            size={22}
            color={hasScrolled ? theme.colors.primary : theme.colors.text}
          />
        </Button>
        <Appbar.Content
          title={
            <Surface style={styles.titleContainer}>
              <Animatable.Text ref={titleRef}>
                <Title>{currentTabTitle}</Title>
              </Animatable.Text>
              {!hasScrolled && routes.length > 1 && (
                <Animatable.View ref={routesRef}>
                  <Surface style={styles.dotContainer}>
                    {routes.map((route) => {
                      return route?.params?.isCurrent ? (
                        <MaterialIcons
                          key={route.key}
                          name='location-pin'
                          size={12}
                          color={
                            route.name === routeNames[tabIndex]
                              ? theme.colors.onSurface
                              : theme.colors.placeholder
                          }
                        />
                      ) : (
                        <Text
                          key={route.key}
                          style={{
                            ...styles.dot,
                            ...(route.name === routeNames[tabIndex] && { ...styles.blackDot }),
                          }}
                        >
                          &#8226;
                        </Text>
                      );
                    })}
                  </Surface>
                </Animatable.View>
              )}
            </Surface>
          }
          titleStyle={styles.titleStyles}
        />
        <Button
          mode='text'
          compact
          onPress={() => navigation.navigate('Option')}
          theme={{ colors: { primary: theme.colors.placeholder } }}
          style={styles.btn}
        >
          <Entypo
            name='dots-two-vertical'
            size={22}
            color={hasScrolled ? theme.colors.primary : theme.colors.text}
          />
        </Button>
      </Animatable.View>
    </Surface>
  );
}

const createStyles = (theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  btn: {
    borderRadius: 50,
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

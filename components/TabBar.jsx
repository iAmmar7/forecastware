import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Text, Title } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { take } from 'forecastware/utils/helpers';
import { useStyles } from 'forecastware/hooks';
import { View } from 'react-native';
import HeaderIcon from './HeaderIcon';

function TabBar(props) {
  const {
    state: { index: tabIndex, routes, routeNames },
    descriptors,
    navigation,
  } = props;
  const titleRef = useRef();
  const routesRef = useRef();
  const { styles, theme } = useStyles(createStyles);
  const [inViewRoutes, setInViewRoutes] = useState([]);

  useEffect(() => {
    if (hasScrolled) {
      routesRef.current?.fadeOut(800);
    } else {
      titleRef.current?.fadeIn(800);
      routesRef.current?.fadeIn(800);
    }
  }, [hasScrolled]);

  useEffect(() => {
    // Initial part
    if (tabIndex < 3) {
      const arr = take(routes, 5);
      setInViewRoutes(arr);
      return;
    }
    // End part
    if (tabIndex >= routes.length - 2) {
      const arr = take(routes, 5, routes.length - 5);
      setInViewRoutes(arr);
      return;
    }
    // Middle part
    if (tabIndex >= 3) {
      const arr = take(routes, 5, tabIndex - 2);
      setInViewRoutes(arr);
    }
  }, [routes]);

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

  const color = useMemo(() => {
    const name = routeDetails.options?.name;
    return theme.colors?.[name]?.[0] || theme.colors.surface;
  }, [routeDetails]);

  return (
    <Animatable.View>
      <View
        transition={['paddingTop', 'paddingBottom']}
        style={{
          ...styles.header,
          paddingTop: hasScrolled ? Constants.statusBarHeight : Constants.statusBarHeight + 10,
          paddingBottom: hasScrolled ? 0 : 10,
          elevation: hasScrolled ? 1 : 0,
          backgroundColor: color,
        }}
      >
        <HeaderIcon
          IconComponent={MaterialCommunityIcons}
          name='city-variant-outline'
          onPress={() => navigation.navigate('City')}
          color={hasScrolled ? theme.colors.primary : theme.colors.linearText}
        />
        <View style={styles.titleContainer}>
          <Animatable.Text ref={titleRef}>
            <Title theme={{ colors: { text: theme.colors.linearText } }}>{currentTabTitle}</Title>
          </Animatable.Text>
          {!hasScrolled && routes.length > 1 && (
            <Animatable.View ref={routesRef}>
              <View style={styles.dotContainer}>
                {inViewRoutes.map((route) => {
                  return route?.params?.isCurrent ? (
                    <MaterialIcons
                      key={route.key}
                      name='location-pin'
                      size={12}
                      color={
                        route.name === routeNames[tabIndex]
                          ? theme.colors.linearText
                          : theme.colors.linearPlaceholder
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
              </View>
            </Animatable.View>
          )}
        </View>
        <HeaderIcon
          IconComponent={Entypo}
          name='dots-two-vertical'
          onPress={() => navigation.navigate('Option')}
          color={hasScrolled ? theme.colors.primary : theme.colors.linearText}
        />
      </View>
    </Animatable.View>
  );
}

const createStyles = (theme) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
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
    marginTop: -3,
  },
  dot: {
    paddingHorizontal: 2,
    paddingVertical: 0,
    color: theme.colors.linearPlaceholder,
    fontSize: 16,
    opacity: 0.5,
  },
  blackDot: {
    opacity: 1,
    color: theme.colors.linearText,
  },
});

TabBar.propTypes = {
  state: PropTypes.object.isRequired,
  descriptors: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default TabBar;

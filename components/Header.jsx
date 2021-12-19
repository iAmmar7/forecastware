/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Appbar, Surface, Title } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../hooks';
import HeaderIcon from './HeaderIcon';

function Header(props) {
  const { options, navigation, back } = props;
  const { headerTitle, leftIcon, rightIcon } = options;
  const titleRef = useRef();
  const routesRef = useRef();
  const { styles, theme } = useStyles(createStyles);

  const hasScrolled = useMemo(() => {
    return options.hasScrolled;
  }, [options]);

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
        {back && (
          <HeaderIcon
            Component={MaterialIcons}
            name='arrow-back'
            handleNavigate={() => navigation.goBack()}
            hasScrolled={hasScrolled}
          />
        )}
        {leftIcon && (
          <HeaderIcon
            Component={leftIcon.Component}
            name={leftIcon.name}
            handleNavigate={() => navigation.navigate(leftIcon.navigateTo)}
            hasScrolled={hasScrolled}
          />
        )}
        <Appbar.Content
          title={
            <Surface style={styles.titleContainer}>
              <Animatable.Text ref={titleRef}>
                <Title>{headerTitle}</Title>
              </Animatable.Text>
            </Surface>
          }
          titleStyle={styles.titleStyles}
        />
        {rightIcon && (
          <HeaderIcon
            Component={rightIcon.Component}
            name={rightIcon.name}
            handleNavigate={() => navigation.navigate(rightIcon.navigateTo)}
            hasScrolled={hasScrolled}
          />
        )}
      </Animatable.View>
    </Surface>
  );
}

const createStyles = () => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleStyles: {
    marginRight: 'auto',
  },
});

Header.propTypes = {
  options: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  back: PropTypes.bool.isRequired,
};

export default Header;

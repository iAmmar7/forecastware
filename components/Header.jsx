import React from 'react';
import PropTypes from 'prop-types';
import { Appbar, Surface, Title } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';

import { useStyles } from 'forecastware/hooks';
import { isEmpty, isArray } from 'forecastware/utils/helpers';
import HeaderIcon from './HeaderIcon';

function Header(props) {
  const {
    options,
    navigation,
    back,
    route: { params: { isEditMode } = {} },
  } = props;
  const { headerTitle, leftIcon, rightIcon, editTite } = options;
  const { styles } = useStyles(createStyles);

  return (
    <Surface>
      <Animatable.View transition={['paddingTop', 'paddingBottom']} style={styles.header}>
        {isEditMode && <HeaderIcon isText name='Done' onPress={() => console.log('done')} />}
        {back && !isEditMode && (
          <HeaderIcon
            IconComponent={MaterialIcons}
            name='arrow-back'
            onPress={() => navigation.goBack()}
          />
        )}
        {leftIcon && (
          <HeaderIcon
            IconComponent={leftIcon.Component}
            name={leftIcon.name}
            onPress={() => navigation.navigate(leftIcon.navigateTo)}
          />
        )}
        <Appbar.Content
          title={
            <Surface style={styles.titleContainer}>
              <Animatable.Text animation='fadeIn'>
                <Title style={styles.title}>{isEditMode ? editTite : headerTitle}</Title>
              </Animatable.Text>
            </Surface>
          }
          titleStyle={[styles.titleStyles, isEditMode && styles.editTitleStyle]}
        />
        {isEditMode && (
          <HeaderIcon
            isText
            name='Select All'
            onPress={() => navigation.setParams({ isEditMode: false })}
          />
        )}
        {!isEmpty(rightIcon) &&
          isArray(rightIcon) &&
          !isEditMode &&
          rightIcon.map((item) => (
            <HeaderIcon
              key={item.id}
              IconComponent={item.Component}
              name={item.name}
              onPress={item.onClick}
            />
          ))}
      </Animatable.View>
    </Surface>
  );
}

const createStyles = () => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 40,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  titleStyles: {
    marginRight: 'auto',
  },
  editTitleStyle: {
    marginLeft: 'auto',
  },
});

Header.propTypes = {
  options: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  back: PropTypes.bool.isRequired,
};

export default Header;

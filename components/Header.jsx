import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Surface, Title } from 'react-native-paper';
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
    route: { params: { isEditMode, selectAll: selectAllParam } = {} },
  } = props;
  const { headerTitle, leftIcon, rightIcon, editTite, isTitleCenter, cancel } = options;
  const { styles } = useStyles(createStyles);
  const [selectAll, setSelectAll] = useState(selectAllParam);

  const toggleSelectAll = useCallback(() => {
    setSelectAll(!selectAll);
    navigation.setParams({ selectAll: !selectAll });
  }, [selectAll]);

  return (
    <Surface>
      <Surface style={styles.header}>
        <Surface style={styles.leftContainer}>
          {isEditMode && (
            <HeaderIcon
              isText
              name='Done'
              onPress={() => navigation.setParams({ isEditMode: false })}
            />
          )}
          {cancel && !isEditMode && (
            <HeaderIcon isText name='Cancel' onPress={() => navigation.goBack()} />
          )}
          {back && !isEditMode && !cancel && (
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
        </Surface>
        <Surface style={[(isTitleCenter || isEditMode) && styles.middleContainer]}>
          <Animatable.Text animation='fadeIn'>
            <Title style={styles.title}>{isEditMode ? editTite : headerTitle}</Title>
          </Animatable.Text>
        </Surface>
        <Surface style={styles.rightContainer}>
          {isEditMode && (
            <HeaderIcon
              isText
              name={selectAll ? 'Unselect All' : 'Select All'}
              onPress={toggleSelectAll}
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
          {isEmpty(rightIcon) && <Surface style={{ width: '20%' }} />}
        </Surface>
      </Surface>
    </Surface>
  );
}

const createStyles = () => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: Constants.statusBarHeight + 10,
    height: Constants.statusBarHeight + 50,
  },
  middleContainer: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  leftContainer: {
    marginRight: 10,
  },
  rightContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

Header.propTypes = {
  options: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  back: PropTypes.bool.isRequired,
};

export default Header;

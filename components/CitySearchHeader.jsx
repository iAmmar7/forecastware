import React, { useState } from 'react';
import { Appbar, Surface, Title, Text, TouchableRipple, Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { useStyles } from '../hooks';

const Header = (props) => {
  const {
    options: { headerTitle, showBottomBorder },
    navigation,
  } = props;
  const { styles, theme } = useStyles(createStyles);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Appbar.Header style={{ ...styles.header, elevation: showBottomBorder === true ? 10 : 0 }}>
      <Surface style={styles.contentContainer}>
        <Surface style={styles.content}>
          <Surface style={styles.cancel}>
            <TouchableRipple onPress={() => navigation.pop()} borderless style={styles.cancelTouch}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableRipple>
          </Surface>
          <Surface style={styles.title}>
            <Title style={styles.titleText}>{headerTitle}</Title>
          </Surface>
          <Surface style={styles.hidden}></Surface>
        </Surface>
        <Surface style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search location"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.inputStyle}
            icon={() => <MaterialIcons name="search" size={18} color={theme.colors.backdrop} />}
          />
        </Surface>
      </Surface>
    </Appbar.Header>
  );
};

const createStyles = (theme) => ({
  header: {
    paddingTop: Constants.statusBarHeight - 36,
    backgroundColor: theme.colors.surface,
    shadowColor: 'transparent',
    width: '100%',
    elevation: 0,
    height: 'auto',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  cancel: {
    width: '20%',
  },
  cancelTouch: {
    padding: 6,
  },
  cancelText: {
    color: theme.colors.primary,
    fontFamily: 'open-sans-medium',
  },
  title: {
    width: '60%',
  },
  titleText: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  hidden: {
    width: '20%',
  },
  searchBarContainer: {
    paddingHorizontal: 10,
  },
  searchBar: {
    marginVertical: 10,
    height: 32,
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  inputStyle: {
    fontSize: 14,
    paddingLeft: 0,
    marginLeft: -10,
  },
});

export default Header;

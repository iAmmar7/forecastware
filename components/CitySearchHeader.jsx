import React, { useState, useEffect, useCallback } from 'react';
import { Surface, Title, Text, TouchableRipple, Searchbar, Portal } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { useStyles, useDebounce } from '../hooks';
import { fetchLocations } from '../api';

const Header = (props) => {
  const {
    options: { headerTitle, showBottomBorder },
    navigation,
  } = props;
  const { styles, theme } = useStyles(createStyles);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedValue = useDebounce(searchQuery);

  const searchLocations = useCallback(
    async (q) => {
      setIsSearching(true);
      const response = await fetchLocations(q);
      setLocations(response);
      setIsSearching(false);
    },
    [isSearching]
  );

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      searchLocations(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <Surface style={{ ...styles.screen, elevation: showBottomBorder === true ? 10 : 0 }}>
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
          icon={() => <MaterialIcons name="search" size={18} color={theme.colors.placeholder} />}
        />
      </Surface>
    </Surface>
  );
};

const createStyles = (theme) => ({
  screen: {},
  content: {
    paddingTop: Constants.statusBarHeight,
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
    backgroundColor: theme.dark ? theme.colors.surface : theme.colors.background,
  },
  inputStyle: {
    fontSize: 14,
    paddingLeft: 0,
    marginLeft: -10,
  },
});

export default Header;

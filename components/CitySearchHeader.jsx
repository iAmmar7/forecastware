/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Surface, Title, Text, TouchableRipple, Searchbar, List, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import Loader from './Loader';
import { useStyles, useDebounce } from '../hooks';
import { fetchLocations } from '../api';
import { isEmpty } from '../utils/helpers';

function Header(props) {
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
      const response = await fetchLocations(q);
      setLocations(response);
      setIsSearching(false);
    },
    [isSearching],
  );

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      searchLocations(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) setIsSearching(false);
    else setIsSearching(true);
  }, [searchQuery]);

  const handleSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

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
        <Surface style={styles.hidden} />
      </Surface>
      <Surface style={styles.searchBarContainer}>
        <Searchbar
          placeholder='Search location'
          onChangeText={handleSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.inputStyle}
          icon={() => <MaterialIcons name='search' size={18} color={theme.colors.placeholder} />}
          onIconPress={() => console.log('onIcon')}
        />
        {isSearching && (
          <Card style={styles.loader}>
            <Loader />
          </Card>
        )}
        {!isSearching && !isEmpty(locations) && !isEmpty(searchQuery) && (
          <Card style={styles.list}>
            <List.Section>
              {locations.map((loc, index) => (
                <List.Item
                  key={`${loc.lat}-${loc.lon}`}
                  title={<Text style={styles.listItemText}>{loc.name}</Text>}
                  onPress={() => console.log('onPress')}
                  style={index + 1 !== locations.length && styles.listItem}
                />
              ))}
            </List.Section>
          </Card>
        )}
      </Surface>
    </Surface>
  );
}

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
    position: 'relative',
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
  list: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 40,
    marginHorizontal: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  listItemText: {
    fontSize: 14,
  },
  loader: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 40,
    height: 100,
  },
});

Header.propTypes = {
  options: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Header;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { Surface, Searchbar, List, Text, TouchableRipple } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { Loader } from 'forecastware/components';
import { useStyles, useDebounce } from 'forecastware/hooks';
import { isEmpty } from 'forecastware/utils/helpers';
import { fetchLocations } from 'forecastware/api';

function Header(props) {
  const { handleLeftIconClick, handleRightIconClick, handleSelectLocation } = props;
  const { styles, theme } = useStyles(createStyles);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [inFocus, setInFocus] = useState(false);
  const debouncedValue = useDebounce(searchQuery);
  const leftIconRef = useRef();

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      searchLocations(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
  }, [searchQuery]);

  const searchLocations = useCallback(
    async (q) => {
      const response = await fetchLocations(q);
      setLocations(response);
      setIsSearching(false);
    },
    [isSearching],
  );

  const handleSearchData = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleOnFocus = useCallback(() => {
    leftIconRef.current?.fadeIn(400);
    setInFocus(true);
  }, [inFocus]);

  const handleOnBlur = useCallback(() => {
    leftIconRef.current?.fadeIn(400);
    setInFocus(false);
    setLocations([]);
    setSearchQuery('');
  }, [inFocus]);

  const handleOnItemSelect = (loc) => {
    handleSelectLocation(loc);
    Keyboard.dismiss();
    setInFocus(false);
    setLocations([]);
    setSearchQuery('');
  };

  return (
    <Surface style={styles.header}>
      <Surface style={styles.searchBarContainer}>
        <Searchbar
          placeholder='Search location'
          onChangeText={handleSearchData}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.inputStyle}
          icon={() => (
            <Animatable.View ref={leftIconRef}>
              <MaterialIcons
                name={inFocus ? 'search' : 'arrow-back'}
                size={22}
                color={theme.colors.text}
              />
            </Animatable.View>
          )}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          {...(!inFocus && { onIconPress: handleLeftIconClick })}
        />
        {isEmpty(searchQuery) && (
          <Animatable.View animation='fadeIn'>
            <Surface style={styles.optionContainer}>
              <TouchableRipple borderless onPress={handleRightIconClick} style={styles.optionIcon}>
                <Ionicons name='ios-options-outline' size={22} color={theme.colors.text} />
              </TouchableRipple>
            </Surface>
          </Animatable.View>
        )}
      </Surface>
      {isSearching && (
        <Surface style={styles.loader}>
          <Loader />
        </Surface>
      )}
      {!isSearching && !isEmpty(locations) && !isEmpty(searchQuery) && (
        <Surface style={styles.list}>
          <Surface style={styles.listFlex}>
            {locations.map((loc, index) => (
              <List.Item
                key={`${loc.lat}-${loc.lon}`}
                title={<Text style={styles.listItemText}>{loc.name}</Text>}
                onPress={() => handleOnItemSelect(loc)}
                style={index + 1 !== locations.length && styles.listItem}
              />
            ))}
          </Surface>
        </Surface>
      )}
    </Surface>
  );
}

const createStyles = (theme) => ({
  header: {
    width: '96%',
    elevation: 10,
    borderRadius: 10,
  },
  searchBarContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    width: '100%',
  },
  searchBar: {
    height: 44,
    flex: 1,
    width: '90%',
    elevation: 0,
    backgroundColor: theme.colors.backgorund,
  },
  inputStyle: {
    fontSize: 14,
    paddingLeft: 0,
  },
  loader: {
    height: 100,
  },
  optionContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.backgorund,
  },
  optionIcon: {
    borderRadius: 50,
    padding: 4,
  },
  list: {
    borderColor: 'red',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  listItemText: {
    fontSize: 14,
  },
});

Header.propTypes = {
  handleLeftIconClick: PropTypes.func.isRequired,
  handleRightIconClick: PropTypes.func.isRequired,
  handleSelectLocation: PropTypes.func.isRequired,
};

export default Header;

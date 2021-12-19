import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, Surface, Searchbar, List, Text, TouchableRipple } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { Loader } from 'forecastware/components';
import { useStyles, useDebounce } from 'forecastware/hooks';
import { isEmpty } from 'forecastware/utils/helpers';
import { fetchLocations } from 'forecastware/api';

function Header(props) {
  const { handleLeftIconClick } = props;
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
      leftIconRef.current?.fadeIn(400);
      setIsSearching(false);
      return;
    }
    leftIconRef.current?.fadeOut(400);
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
  }, [inFocus]);

  return (
    <Surface style={styles.header}>
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
            <TouchableRipple
              borderless
              onPress={() => console.log('Pressed')}
              style={styles.optionIcon}
            >
              <Ionicons name='ios-options-outline' size={22} color={theme.colors.text} />
            </TouchableRipple>
          </Surface>
        </Animatable.View>
      )}
      {isSearching && (
        <Card style={styles.loaderCard}>
          <Loader style={styles.loader} />
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
  );
}

const createStyles = (theme) => ({
  header: {
    width: '96%',
    paddingVertical: 10,
    elevation: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    height: 32,
    flex: 1,
    width: '90%',
    elevation: 0,
    backgroundColor: theme.colors.backgorund,
  },
  inputStyle: {
    fontSize: 14,
    paddingLeft: 0,
  },
  loaderCard: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 40,
    height: 100,
    borderRadius: 10,
  },
  loader: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  optionContainer: {
    paddingHorizontal: 10,
    backgroundColor: theme.colors.backgorund,
  },
  optionIcon: {
    borderRadius: 50,
    padding: 4,
  },
});

Header.propTypes = {
  handleLeftIconClick: PropTypes.func.isRequired,
};

export default Header;

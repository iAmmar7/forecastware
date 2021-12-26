import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Surface, Searchbar, Card, Portal, List, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useStyles, useDebounce } from 'forecastware/hooks';
import { fetchLocations } from 'forecastware/api';
import { isEmpty } from 'forecastware/utils/helpers';
import Loader from './Loader';

function SearchLocations(props) {
  const {
    navigation,
    options: { dismissSearch, handleAddLocation },
    style,
  } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { styles, theme } = useStyles(createStyles);
  const debouncedValue = useDebounce(searchQuery);

  useEffect(() => {
    if (dismissSearch) {
      setSearchQuery('');
      navigation.setOptions({ dismissSearch: false });
    }
  }, [dismissSearch]);

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      searchLocations(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) setIsSearching(false);
    else setIsSearching(true);
  }, [searchQuery]);

  const searchLocations = useCallback(
    async (q) => {
      const response = await fetchLocations(q);
      setLocations(response);
      setIsSearching(false);
    },
    [isSearching],
  );

  const handleSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleLocationClick = (loc) => {
    handleAddLocation?.(loc);
  };

  return (
    <>
      <Searchbar
        placeholder='Search location'
        onChangeText={handleSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.inputStyle}
        icon={() => <MaterialIcons name='search' size={18} color={theme.colors.placeholder} />}
        onIconPress={() => console.log('onIcon')}
        {...(!isEmpty(searchQuery) && {
          clearIcon: () => (
            <MaterialIcons name='clear' size={18} color={theme.colors.placeholder} />
          ),
        })}
      />
      <Portal>
        <Surface style={style}>
          {isSearching && (
            <Card style={styles.loader}>
              <Loader />
            </Card>
          )}
          {!isSearching && !isEmpty(locations) && !isEmpty(searchQuery) && (
            <Card style={styles.listCard}>
              <List.Section style={styles.listSection}>
                {locations.map((loc, index) => (
                  <List.Item
                    key={`${loc.lat}-${loc.lon}`}
                    title={<Text style={styles.listItemText}>{loc.name}</Text>}
                    onPress={() => handleLocationClick(loc)}
                    style={[styles.listItem, index + 1 === locations.length && styles.listItemLast]}
                  />
                ))}
              </List.Section>
            </Card>
          )}
        </Surface>
      </Portal>
    </>
  );
}

const createStyles = (theme) => ({
  searchBar: {
    height: 32,
    // elevation: 0,
    backgroundColor: theme.dark ? theme.colors.surface : theme.colors.background,
    elevation: 1,
  },
  inputStyle: {
    fontSize: 14,
    paddingLeft: 0,
    marginLeft: -10,
  },
  listCard: {
    elevation: 1,
  },
  listSection: {
    marginVertical: 0,
    backgroundColor: theme.dark ? theme.colors.background : theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listItemText: {
    fontSize: 14,
  },
  loader: {
    height: 100,
    elevation: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});

SearchLocations.propTypes = {
  navigation: PropTypes.object,
  options: PropTypes.object,
  style: PropTypes.object,
};

SearchLocations.defaultProps = {
  navigation: {},
  options: {},
  style: {},
};

export default SearchLocations;

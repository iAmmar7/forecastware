import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Surface, Text, TouchableRipple } from 'react-native-paper';

import { useStyles, useLocationContext } from 'forecastware/hooks';

function CityList(props) {
  const { data, handleRemoveLocation, handleAddLocation } = props;
  const { styles } = useStyles(createStyles);
  const { locations } = useLocationContext();

  const isCurrent = useCallback((location) => {
    return location.name === 'Position';
  }, []);

  const isLocationExist = useCallback(
    (location) => {
      if (isCurrent(location)) {
        return locations.findIndex((loc) => loc.isCurrent);
      }

      return locations.findIndex((loc) => loc.name === location.name);
    },
    [locations],
  );

  const handleLocation = useCallback(
    (location) => () => {
      const isExist = isLocationExist(location);
      if (isExist > -1) {
        handleRemoveLocation(locations[isExist]);
        return;
      }
      handleAddLocation(location, isCurrent(location));
    },
    [locations],
  );

  return (
    <Surface style={styles.container}>
      {data.map((item) => {
        const isExist = isLocationExist(item) > -1;
        return (
          <TouchableRipple
            key={item.name}
            borderless
            style={styles.touchable}
            onPress={handleLocation(item)}
          >
            <Card style={{ ...styles.card, ...(isExist && styles.cardSelected) }} mode='outlined'>
              <Text style={{ ...styles.labelStyle, ...(isExist && styles.labelSelected) }}>
                {item.name}
              </Text>
            </Card>
          </TouchableRipple>
        );
      })}
    </Surface>
  );
}

const createStyles = (theme) => ({
  container: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchable: {
    width: '30%',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'center',
  },
  cardSelected: {
    backgroundColor: theme.colors.primary,
  },
  labelStyle: {
    fontSize: 12,
  },
  labelSelected: {
    color: 'white',
  },
});

CityList.propTypes = {
  data: PropTypes.array.isRequired,
  handleRemoveLocation: PropTypes.func.isRequired,
  handleAddLocation: PropTypes.func.isRequired,
};

export default CityList;

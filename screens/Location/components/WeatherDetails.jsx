import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import { useStyles } from 'forecastware/hooks';
import { getUVIndex } from 'forecastware/utils/helpers';
import { temperatureUnits } from 'forecastware/utils/constants';

function WeatherDetails(props) {
  const { data, unit, handleExternalLink } = props;
  const { styles } = useStyles(createStyles);

  const unitRenderer = useCallback(() => {
    const symbol = unit.charAt(0);
    if (unit === temperatureUnits.KELVIN) {
      return <Text style={styles.itemValueSub}>{symbol}</Text>;
    }
    return <Text style={styles.itemValueSub}>&deg;{symbol}</Text>;
  }, [unit]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Details</Text>
      <View style={styles.flexWrapper}>
        <View style={styles.flexItem}>
          <View style={styles.itemValue}>
            <Text style={styles.itemValueMain}>{Math.round(data?.feels_like || 0)}</Text>
            {unitRenderer()}
          </View>
          <Text style={styles.itemLabel}>Temperature Felt</Text>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.flexItemRight}>
            <View style={styles.itemValue}>
              <Text style={styles.itemValueMain}>
                {Math.round((data?.visibility || 0) / 1000 || 0)}
              </Text>
              <Text style={styles.itemValueSub}>km</Text>
            </View>
            <Text style={styles.itemLabel}>Visibility</Text>
          </View>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.itemValue}>
            <Text style={styles.itemValueMain}>{Math.round(data?.pressure || 0)}</Text>
            <Text style={styles.itemValueSub}>hPa</Text>
          </View>
          <Text style={styles.itemLabel}>Air Pressure</Text>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.flexItemRight}>
            <View style={styles.itemValue}>
              <Text style={styles.itemValueMain}>{getUVIndex(data?.uvi)}</Text>
            </View>
            <Text style={styles.itemLabel}>UV</Text>
          </View>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.itemValue}>
            <Text style={styles.itemValueMain}>{Math.round(data?.humidity || 0)}</Text>
            <Text style={styles.itemValueSub}>%</Text>
          </View>
          <Text style={styles.itemLabel}>Humidity</Text>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.flexItemRight}>
            <View style={styles.itemValue}>
              <Text style={styles.itemValueMain}>{data?.wind_speed}</Text>
              <Text style={styles.itemValueSub}>m/s</Text>
            </View>
            <Text style={styles.itemLabel}>Wind Speed</Text>
          </View>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <TouchableRipple style={styles.link} onPress={handleExternalLink}>
          <Text style={styles.linkText}>The Weather Channel</Text>
        </TouchableRipple>
      </View>
    </View>
  );
}

const createStyles = (theme) => ({
  container: {
    paddingHorizontal: 18,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'open-sans-bold',
    paddingVertical: 10,
  },
  flexWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexItem: {
    width: '40%',
    height: 80,
  },
  flexItemRight: {
    width: 'auto',
    minWidth: '70%',
    marginLeft: 'auto',
  },
  itemValue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  itemValueMain: {
    fontSize: 24,
    padding: 0,
  },
  itemValueSub: {
    paddingBottom: 2,
  },
  itemLabel: {
    color: theme.colors.placeholder,
  },
  linkContainer: {
    alignItems: 'center',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'open-sans-bold',
    color: theme.colors.placeholder,
  },
});

WeatherDetails.propTypes = {
  data: PropTypes.object,
  unit: PropTypes.string,
  handleExternalLink: PropTypes.func.isRequired,
};

WeatherDetails.defaultProps = {
  data: {},
  unit: 'Celsius',
};

export default WeatherDetails;

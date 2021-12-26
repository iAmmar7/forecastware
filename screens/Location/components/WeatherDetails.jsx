import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';

import { useStyles } from 'forecastware/hooks';
import { getUVIndex } from 'forecastware/utils/helpers';
import { temperatureUnits } from 'forecastware/utils/constants';
import WeatherText from './WeatherText';

function WeatherDetails(props) {
  const { data, unit, handleExternalLink } = props;
  const { styles } = useStyles(createStyles);

  const unitRenderer = useCallback(() => {
    const symbol = unit.charAt(0);
    if (unit === temperatureUnits.KELVIN) {
      return <WeatherText style={styles.itemValueSub}>{symbol}</WeatherText>;
    }
    return <WeatherText style={styles.itemValueSub}>&deg;{symbol}</WeatherText>;
  }, [unit]);

  return (
    <View style={styles.container}>
      <WeatherText style={styles.title}>Weather Details</WeatherText>
      <View style={styles.flexWrapper}>
        <View style={styles.flexItem}>
          <View style={styles.itemValue}>
            <WeatherText style={styles.itemValueMain}>
              {Math.round(data?.feels_like || 0)}
            </WeatherText>
            {unitRenderer()}
          </View>
          <WeatherText secondary>Temperature Felt</WeatherText>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.flexItemRight}>
            <View style={styles.itemValue}>
              <WeatherText style={styles.itemValueMain}>
                {Math.round((data?.visibility || 0) / 1000 || 0)}
              </WeatherText>
              <WeatherText style={styles.itemValueSub}>km</WeatherText>
            </View>
            <WeatherText secondary>Visibility</WeatherText>
          </View>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.itemValue}>
            <WeatherText style={styles.itemValueMain}>
              {Math.round(data?.pressure || 0)}
            </WeatherText>
            <WeatherText style={styles.itemValueSub}>hPa</WeatherText>
          </View>
          <WeatherText secondary>Air Pressure</WeatherText>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.flexItemRight}>
            <View style={styles.itemValue}>
              <WeatherText style={styles.itemValueMain}>{getUVIndex(data?.uvi)}</WeatherText>
            </View>
            <WeatherText secondary>UV</WeatherText>
          </View>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.itemValue}>
            <WeatherText style={styles.itemValueMain}>
              {Math.round(data?.humidity || 0)}
            </WeatherText>
            <WeatherText style={styles.itemValueSub}>%</WeatherText>
          </View>
          <WeatherText secondary>Humidity</WeatherText>
        </View>
        <View style={styles.flexItem}>
          <View style={styles.flexItemRight}>
            <View style={styles.itemValue}>
              <WeatherText style={styles.itemValueMain}>{data?.wind_speed}</WeatherText>
              <WeatherText style={styles.itemValueSub}>m/s</WeatherText>
            </View>
            <WeatherText secondary>Wind Speed</WeatherText>
          </View>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <TouchableRipple style={styles.link} onPress={handleExternalLink}>
          <WeatherText secondary style={styles.linkText}>
            The Weather Channel
          </WeatherText>
        </TouchableRipple>
      </View>
    </View>
  );
}

const createStyles = () => ({
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
  linkContainer: {
    alignItems: 'center',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'open-sans-bold',
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

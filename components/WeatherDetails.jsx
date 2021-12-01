import React from 'react';
import { Surface, Text, TouchableRipple } from 'react-native-paper';

import { useStyles } from '../hooks';
import { getUVIndex } from '../utils/helpers';

const WeatherDetails = (props) => {
  const { data = {}, unit, handleExternalLink } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>Weather Details</Text>
      <Surface style={styles.flexWrapper}>
        <Surface style={styles.flexItem}>
          <Surface style={styles.itemValue}>
            <Text style={styles.itemValueMain}>{Math.round(data?.feels_like || 0)}</Text>
            <Text style={styles.itemValueSub}>&deg;{unit === 'Celsius' ? 'C' : 'F'}</Text>
          </Surface>
          <Text style={styles.itemLabel}>Temperature Felt</Text>
        </Surface>
        <Surface style={styles.flexItem}>
          <Surface style={styles.flexItemRight}>
            <Surface style={styles.itemValue}>
              <Text style={styles.itemValueMain}>{Math.round(data?.visibility / 1000 || 0)}</Text>
              <Text style={styles.itemValueSub}>km</Text>
            </Surface>
            <Text style={styles.itemLabel}>Visibility</Text>
          </Surface>
        </Surface>
        <Surface style={styles.flexItem}>
          <Surface style={styles.itemValue}>
            <Text style={styles.itemValueMain}>{Math.round(data?.pressure || 0)}</Text>
            <Text style={styles.itemValueSub}>hPa</Text>
          </Surface>
          <Text style={styles.itemLabel}>Air Pressure</Text>
        </Surface>
        <Surface style={styles.flexItem}>
          <Surface style={styles.flexItemRight}>
            <Surface style={styles.itemValue}>
              <Text style={styles.itemValueMain}>{getUVIndex(data?.uvi)}</Text>
            </Surface>
            <Text style={styles.itemLabel}>UV</Text>
          </Surface>
        </Surface>
        <Surface style={styles.flexItem}>
          <Surface style={styles.itemValue}>
            <Text style={styles.itemValueMain}>{Math.round(data?.humidity || 0)}</Text>
            <Text style={styles.itemValueSub}>%</Text>
          </Surface>
          <Text style={styles.itemLabel}>Humidity</Text>
        </Surface>
        <Surface style={styles.flexItem}>
          <Surface style={styles.flexItemRight}>
            <Surface style={styles.itemValue}>
              <Text style={styles.itemValueMain}>{data?.wind_speed}</Text>
              <Text style={styles.itemValueSub}>m/s</Text>
            </Surface>
            <Text style={styles.itemLabel}>Wind Speed</Text>
          </Surface>
        </Surface>
      </Surface>
      <Surface style={styles.linkContainer}>
        <TouchableRipple style={styles.link} onPress={handleExternalLink}>
          <Text style={styles.linkText}>The Weather Channel</Text>
        </TouchableRipple>
      </Surface>
    </Surface>
  );
};

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

export default WeatherDetails;

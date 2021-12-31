import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { useStyles } from '../../../hooks';
import { getWeatherIconUrl } from '../../../utils/helpers';
import { temperatureUnits } from '../../../utils/constants';

function WeeklyWeatherList(props) {
  const { data, unit, handleExternalLink } = props;
  const { styles } = useStyles(createStyles);

  const unitRenderer = useCallback(
    (temp) => {
      const symbol = unit.charAt(0);
      if (unit === temperatureUnits.KELVIN) {
        return (
          <Text style={{ ...styles.weatherText, ...styles.dailyItem70 }}>
            {Math.round(temp?.max || 0)}/{Math.round(temp?.min || 0)}
            {symbol}
          </Text>
        );
      }
      return (
        <Text style={{ ...styles.weatherText, ...styles.dailyItem70 }}>
          {Math.round(temp?.max || 0)}/{Math.round(temp?.min || 0)}&deg;
          {symbol}
        </Text>
      );
    },
    [unit],
  );

  return (
    <View style={styles.dailyListContainer}>
      <Text style={styles.dailyListTitle}>Weekly Weather Report</Text>
      {data.map((item) => (
        <View key={item.dt} style={styles.dailyListItem}>
          <Text style={{ ...styles.weatherText, ...styles.dailyItem50 }}>
            {dayjs(new Date(item.dt * 1000)).format('MMM D')}
          </Text>
          <Text style={{ ...styles.weatherText, ...styles.dailyItem50 }}>
            {dayjs(new Date(item.dt * 1000)).format('ddd')}
          </Text>
          <View style={{ ...styles.dailyStatus, ...styles.dailyItem70 }}>
            <Image
              style={styles.weatherListIcon}
              source={{
                uri: getWeatherIconUrl(item?.weather?.[0]?.icon),
              }}
            />
            <Text style={styles.weatherText}>{item?.weather?.[0]?.main}</Text>
          </View>
          {unitRenderer(item?.temp)}
        </View>
      ))}
      <View style={styles.linkContainer}>
        <TouchableRipple style={styles.link} onPress={handleExternalLink}>
          <>
            <Text style={styles.linkText}>15 day weather forecast</Text>
            <AntDesign name='right' size={14} style={styles.linkIcon} />
          </>
        </TouchableRipple>
      </View>
    </View>
  );
}

const createStyles = (theme) => ({
  dailyListContainer: {
    paddingHorizontal: 18,
  },
  dailyListTitle: {
    fontFamily: 'open-sans-bold',
    paddingVertical: 10,
  },
  dailyListItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherListIcon: {
    width: 30,
    height: 30,
  },
  weatherText: {
    color: theme.colors.placeholder,
  },
  dailyItem50: {
    width: 50,
  },
  dailyItem70: {
    width: 70,
    textAlign: 'right',
  },
  dailyStatus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontFamily: 'open-sans-bold',
    color: theme.colors.primary,
  },
  linkIcon: {
    color: theme.colors.primary,
    paddingHorizontal: 2,
    paddingTop: 2,
  },
});

WeeklyWeatherList.propTypes = {
  data: PropTypes.array,
  unit: PropTypes.string,
  handleExternalLink: PropTypes.func.isRequired,
};

WeeklyWeatherList.defaultProps = {
  data: [],
  unit: 'Celsius',
};

export default WeeklyWeatherList;

import React from 'react';
import { Image } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { useStyles } from '../hooks';
import { getWeatherIconUrl } from '../utils/helpers';

const WeeklyWeatherList = (props) => {
  const { data = [], unit, handleExternalLink } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.dailyListContainer}>
      <Text style={styles.dailyListTitle}>Weekly Weather Report</Text>
      {data.map((item) => (
        <Surface key={item.dt} style={styles.dailyListItem}>
          <Text style={{ ...styles.weatherText, ...styles.dailyItem50 }}>
            {dayjs(new Date(item.dt * 1000)).format('MMM D')}
          </Text>
          <Text style={{ ...styles.weatherText, ...styles.dailyItem50 }}>
            {dayjs(new Date(item.dt * 1000)).format('ddd')}
          </Text>
          <Surface style={{ ...styles.dailyStatus, ...styles.dailyItem70 }}>
            <Image
              style={styles.weatherListIcon}
              source={{
                uri: getWeatherIconUrl(item?.weather?.[0]?.icon),
              }}
            />
            <Text style={styles.weatherText}>{item?.weather?.[0]?.main}</Text>
          </Surface>
          <Text style={{ ...styles.weatherText, ...styles.dailyItem70 }}>
            {Math.round(item?.temp?.max || 0)}/{Math.round(item?.temp?.min || 0)}&deg;
            {unit === 'Celsius' ? 'C' : 'F'}
          </Text>
        </Surface>
      ))}
      <Surface style={styles.linkContainer}>
        <TouchableRipple style={styles.link} onPress={handleExternalLink}>
          <>
            <Text style={styles.linkText}>15 day weather forecast</Text>
            <AntDesign name="right" size={14} style={styles.linkIcon} />
          </>
        </TouchableRipple>
      </Surface>
    </Surface>
  );
};

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

export default WeeklyWeatherList;

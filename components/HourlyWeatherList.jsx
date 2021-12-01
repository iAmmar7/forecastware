import React from 'react';
import { FlatList, Image } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import dayjs from 'dayjs';

import { useStyles } from '../hooks';
import { getWeatherIconUrl } from '../utils/helpers';

const HourlyWeatherList = (props) => {
  const { data = [], unit } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.hourlyListContainer}>
      <FlatList
        horizontal
        style={styles.hourlyList}
        data={data}
        keyExtractor={(item) => item.dt}
        renderItem={({ item }) => (
          <Surface style={styles.hourlyListItem}>
            <Text style={styles.weatherText}>{dayjs(new Date(item.dt * 1000)).format('h:mmA')}</Text>
            <Image
              style={styles.weatherListIcon}
              source={{
                uri: getWeatherIconUrl(item?.weather?.[0]?.icon),
              }}
            />
            <Text style={styles.weatherText}>{item?.weather?.[0]?.main}</Text>
            <Text style={{ ...styles.weatherText, ...styles.hourlyStatus }}>
              {Math.round(item?.temp || 0)}&deg;{unit === 'Celsius' ? 'C' : 'F'}
            </Text>
          </Surface>
        )}
      />
    </Surface>
  );
};

const createStyles = (theme) => ({
  hourlyListContainer: {
    paddingVertical: 18,
  },
  hourlyList: {
    paddingVertical: 10,
  },
  hourlyListItem: {
    display: 'flex',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  weatherListIcon: {
    width: 30,
    height: 30,
  },
  weatherText: {
    color: theme.colors.placeholder,
  },
  hourlyStatus: {
    paddingTop: 6,
  },
});

export default HourlyWeatherList;

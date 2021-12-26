import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, View } from 'react-native';
import dayjs from 'dayjs';

import { useStyles } from 'forecastware/hooks';
import { getWeatherIconUrl } from 'forecastware/utils/helpers';
import { temperatureUnits } from 'forecastware/utils/constants';
import WeatherText from './WeatherText';

function HourlyWeatherList(props) {
  const { data, unit } = props;
  const { styles } = useStyles(createStyles);

  const unitRenderer = useCallback(
    (temp) => {
      const symbol = unit.charAt(0);
      if (unit === temperatureUnits.KELVIN) {
        return (
          <WeatherText secondary style={styles.hourlyStatus}>
            {Math.round(temp || 0)}
            {symbol}
          </WeatherText>
        );
      }
      return (
        <WeatherText secondary style={styles.hourlyStatus}>
          {Math.round(temp || 0)}&deg;{symbol}
        </WeatherText>
      );
    },
    [unit],
  );

  return (
    <View style={styles.hourlyListContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hourlyList}
        data={data}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.hourlyListItem}>
            <WeatherText secondary>{dayjs(new Date(item.dt * 1000)).format('h:mmA')}</WeatherText>
            <Image
              style={styles.weatherListIcon}
              source={{
                uri: getWeatherIconUrl(item?.weather?.[0]?.icon),
              }}
            />
            <WeatherText secondary>{item?.weather?.[0]?.main}</WeatherText>
            {unitRenderer(item.temp)}
          </View>
        )}
      />
    </View>
  );
}

const createStyles = () => ({
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
  hourlyStatus: {
    paddingTop: 6,
  },
});

HourlyWeatherList.propTypes = {
  data: PropTypes.array,
  unit: PropTypes.string.isRequired,
};

HourlyWeatherList.defaultProps = {
  data: [],
};

export default HourlyWeatherList;

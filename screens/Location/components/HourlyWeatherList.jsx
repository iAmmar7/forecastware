import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import dayjs from 'dayjs';

import { useStyles } from 'forecastware/hooks';
import { getWeatherIconUrl } from 'forecastware/utils/helpers';
import { temperatureUnits } from 'forecastware/utils/constants';

function HourlyWeatherList(props) {
  const { data, unit } = props;
  const { styles } = useStyles(createStyles);

  const unitRenderer = useCallback(
    (temp) => {
      const symbol = unit.charAt(0);
      if (unit === temperatureUnits.KELVIN) {
        return (
          <Text style={{ ...styles.weatherText, ...styles.hourlyStatus }}>
            {Math.round(temp || 0)}
            {symbol}
          </Text>
        );
      }
      return (
        <Text style={{ ...styles.weatherText, ...styles.hourlyStatus }}>
          {Math.round(temp || 0)}&deg;{symbol}
        </Text>
      );
    },
    [unit],
  );

  return (
    <Surface style={styles.hourlyListContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.hourlyList}
        data={data}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <Surface style={styles.hourlyListItem}>
            <Text style={styles.weatherText}>
              {dayjs(new Date(item.dt * 1000)).format('h:mmA')}
            </Text>
            <Image
              style={styles.weatherListIcon}
              source={{
                uri: getWeatherIconUrl(item?.weather?.[0]?.icon),
              }}
            />
            <Text style={styles.weatherText}>{item?.weather?.[0]?.main}</Text>
            {unitRenderer(item.temp)}
          </Surface>
        )}
      />
    </Surface>
  );
}

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

HourlyWeatherList.propTypes = {
  data: PropTypes.array,
  unit: PropTypes.string.isRequired,
};

HourlyWeatherList.defaultProps = {
  data: [],
};

export default HourlyWeatherList;

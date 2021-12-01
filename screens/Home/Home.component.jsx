import React from 'react';
import { ScrollView } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { useStyles } from '../../hooks';
import { HourlyWeatherList, WeeklyWeatherList, WeatherDetails } from '../../components';

const HomeComponent = (props) => {
  const { data, unit, handleExternalLink } = props;
  const { styles } = useStyles(createStyles);

  return (
    <ScrollView>
      <Surface style={styles.screen}>
        <Surface style={styles.summary}>
          <Surface style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{Math.round(data?.current?.temp || 0)}</Text>
            <Surface style={styles.unit}>
              <Text style={{ ...styles.unitText, ...styles.degree }}>&deg;</Text>
              <Text style={styles.unitText}>{unit === 'Celsius' ? 'C' : 'F'}</Text>
            </Surface>
          </Surface>
          <Surface>
            <Text style={styles.weather}>{data?.current?.weather?.[0]?.main}</Text>
          </Surface>
        </Surface>
        <HourlyWeatherList data={data?.hourly} unit={unit} />
        <WeeklyWeatherList data={data?.daily} unit={unit} handleExternalLink={handleExternalLink} />
        <WeatherDetails data={data?.current} unit={unit} handleExternalLink={handleExternalLink} />
      </Surface>
    </ScrollView>
  );
};

const createStyles = () => ({
  screen: {
    flex: 1,
  },
  summary: {
    marginTop: 200,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 60,
  },
  unit: {
    flexDirection: 'row',
  },
  unitText: {
    marginTop: 12,
    fontSize: 20,
    fontFamily: 'open-sans-medium',
  },
  degree: {
    fontSize: 20,
    marginRight: -2,
  },
  weather: {
    fontSize: 20,
    fontFamily: 'open-sans-medium',
  },
});

export default HomeComponent;

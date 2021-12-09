import React from 'react';
import PropTypes from 'prop-types';
import ViewShot from 'react-native-view-shot';
import { ScrollView, View } from 'react-native';
import { FAB, Surface, Text } from 'react-native-paper';

import { useStyles } from '../../hooks';
import { HourlyWeatherList, WeeklyWeatherList, WeatherDetails } from '../../components';

function LocationComponent(props) {
  const { data, unit, viewShotRef, handleExternalLink, handleFAB } = props;
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.screenWrapper}>
      <ViewShot ref={viewShotRef}>
        <ScrollView style={styles.scrollView}>
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
            <WeeklyWeatherList
              data={data?.daily}
              unit={unit}
              handleExternalLink={handleExternalLink}
            />
            <WeatherDetails
              data={data?.current}
              unit={unit}
              handleExternalLink={handleExternalLink}
            />
          </Surface>
        </ScrollView>
      </ViewShot>
      <FAB style={styles.fab} small icon='camera' onPress={handleFAB} />
    </View>
  );
}

LocationComponent.propTypes = {
  data: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  viewShotRef: PropTypes.object.isRequired,
  handleExternalLink: PropTypes.func.isRequired,
  handleFAB: PropTypes.func.isRequired,
};

const createStyles = (theme) => ({
  screenWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  scrollView: {},
  screen: {},
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
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    opacity: 0.5,
    backgroundColor: theme.colors.placeholder,
  },
});

export default LocationComponent;

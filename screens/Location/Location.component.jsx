import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, ScrollView, RefreshControl, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { Loader, ScreenshotTaker } from 'forecastware/components';
import { useStyles } from 'forecastware/hooks';
import { temperatureUnits } from 'forecastware/utils/constants';
import WeatherText from './components/WeatherText';
import HourlyWeatherList from './components/HourlyWeatherList';
import WeeklyWeatherList from './components/WeeklyWeatherList';
import WeatherDetails from './components/WeatherDetails';

function LocationComponent(props) {
  const {
    data,
    animationRef,
    scrollRef,
    refreshing,
    handleRefresh,
    handleExternalLink,
    handleOnScroll,
  } = props;
  const { styles, theme } = useStyles(createStyles);

  const unitRenderer = () => {
    const symbol = data.unit.charAt(0);
    return (
      <View style={styles.unit}>
        {data.unit === temperatureUnits.KELVIN ? null : (
          <WeatherText style={{ ...styles.unitText, ...styles.degree }}>&deg;</WeatherText>
        )}
        <WeatherText style={styles.unitText}>{symbol}</WeatherText>
      </View>
    );
  };

  console.log(
    'data',
    data?.current?.weather?.[0]?.main,
    theme.colors,
    theme.colors[data?.current?.weather?.[0]?.main],
  );

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <LinearGradient
        colors={
          theme.colors[data?.current?.weather?.[0]?.main] || [
            theme.colors.surface,
            theme.colors.surface,
          ]
        }
        // colors={['#880E4F', '#E91E63', '#EC407A']}
        style={styles.gradient}
      >
        <Animatable.View ref={animationRef}>
          <ScrollView
            style={styles.scrollView}
            onScrollEndDrag={handleOnScroll}
            scrollEventThrottle={100}
            ref={scrollRef}
            bounces
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                progressBackgroundColor='white'
                colors={['white']}
                progressViewOffset={-1000}
              />
            }
          >
            <View style={styles.screen}>
              <View style={styles.loaderContainer}>
                {refreshing && <Loader style={styles.loader} label='Refreshing' />}
              </View>
              <View style={styles.summary}>
                <View style={styles.temperatureContainer}>
                  <WeatherText style={styles.temperature}>
                    {Math.round(data?.current?.temp || 0)}
                  </WeatherText>
                  {unitRenderer()}
                </View>
                <View>
                  <WeatherText style={styles.weather}>
                    {data?.current?.weather?.[0]?.main}
                  </WeatherText>
                </View>
              </View>
              <HourlyWeatherList data={data?.hourly} unit={data.unit} />
              <WeeklyWeatherList
                data={data?.daily}
                unit={data.unit}
                handleExternalLink={handleExternalLink}
              />
              <WeatherDetails
                data={data?.current}
                unit={data.unit}
                handleExternalLink={handleExternalLink}
              />
            </View>
          </ScrollView>
        </Animatable.View>
        <ScreenshotTaker animationRef={animationRef} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const createStyles = (theme) => ({
  screenWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  scrollView: {},
  screen: {
    position: 'relative',
  },
  summary: {
    // marginTop: 200,
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
  loaderContainer: {
    height: 200,
  },
  loader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: 150,
  },
});

LocationComponent.propTypes = {
  data: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  animationRef: PropTypes.object.isRequired,
  scrollRef: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  handleExternalLink: PropTypes.func.isRequired,
  handleOnScroll: PropTypes.func.isRequired,
};

export default LocationComponent;

/* eslint-disable prefer-destructuring */
import Constants from 'expo-constants';

export const API_URL = 'https://api.openweathermap.org';
export const MAP_API_URL = 'https://tile.openweathermap.org';
export const API_KEY = Constants.manifest.extra.API_KEY;

export const APP_NAME = 'ForecastWare';
export const DB_NAME = 'forecastware';

export const FALLBACK_LONGITUDE = 67.0822;
export const FALLBACK_LATITUDE = 24.9056;
export const FALLBACK_CITY = 'Karachi';

export const LOCATION_JOB = 'location-job';
export const LOCATION_JOB_INTERVAL = 1;
export const MINIMUM_BATTERY_LIMIT = 20;
export const NOTIFICATION_JOB = 'notification-job';
export const NOTIFICATION_INTERVAL = 60 * 15;

export const temperatureUnits = {
  CELSIUS: 'Celsius',
  FAHRENHEIT: 'Fahrenheit',
  KELVIN: 'Kelvin',
};

export const themeNames = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const mapLayerOptions = [
  { id: 1, label: 'Clouds', value: 'clouds_new' },
  { id: 2, label: 'Precipitation', value: 'precipitation_new' },
  { id: 3, label: 'Sea level pressure', value: 'pressure_new' },
  { id: 4, label: 'Wind speed', value: 'wind_new' },
  { id: 5, label: 'Temperature', value: 'temp_new' },
];

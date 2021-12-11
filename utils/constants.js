/* eslint-disable prefer-destructuring */
import Constants from 'expo-constants';

export const API_URL = 'https://api.openweathermap.org';
export const API_KEY = Constants.manifest.extra.API_KEY;

export const dbName = 'forecastware';

export const fallBackLongitude = 67.0822;
export const fallBackLatitude = 24.9056;
export const fallBackCity = 'Karachi';

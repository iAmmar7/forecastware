/* eslint-disable prefer-destructuring */
import Constants from 'expo-constants';

export const API_URL = 'https://api.openweathermap.org';
export const API_KEY = Constants.manifest.extra.API_KEY;

export const DB_NAME = 'forecastware';

export const FALLBACK_LONGITUDE = 67.0822;
export const FALLBACK_LATITUDE = 24.9056;
export const FALLBACK_CITY = 'Karachi';

export const LOCATION_JOB = 'location-job';
export const LOCATION_JOB_INTERVAL = 1;
export const NOTIFICATION_INTERVAL = 60 * 15;

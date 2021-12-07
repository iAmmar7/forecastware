import API from './axios';
import { fallBackLatitude, fallBackLongitude, fallBackCity } from '../utils/constants';
import { isEmpty } from '../utils/helpers';

const api = new API();

export const fetchWeatherFromCoordinates = async (coords, unit) => {
  try {
    let latitude = coords?.latitude;
    let longitude = coords?.longitude;

    const location = await api.get('/geo/1.0/reverse', null, {
      lat: latitude,
      lon: longitude,
      limit: 1,
    });

    if (!location || isEmpty(location)) {
      latitude = fallBackLatitude;
      longitude = fallBackLongitude;
    }

    const weather = await api.get('/data/2.5/onecall', null, {
      lat: latitude,
      lon: longitude,
      exclude: 'minutely,alerts',
      ...(unit === 'Celsius' && { units: 'metric' }),
    });

    const payload = { ...weather, name: location?.[0]?.name || fallBackCity };

    return payload;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const fetchLocations = async (query) => {
  console.log('fetchLocations1', query);
  const locations = await api.get('/geo/1.0/direct', null, {
    q: query,
    limit: 5,
  });
  console.log('fetchLocations2', locations);
  return locations;
};
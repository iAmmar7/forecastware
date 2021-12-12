import API from './axios';
import { FALLBACK_LATITUDE, FALLBACK_LONGITUDE, FALLBACK_CITY } from '../utils/constants';
import { isEmpty } from '../utils/helpers';

const api = new API();

export const fetchCurrentLocationWeather = async (coords, unit) => {
  try {
    let latitude = coords?.latitude;
    let longitude = coords?.longitude;

    const location = await api.get('/geo/1.0/reverse', null, {
      lat: latitude,
      lon: longitude,
      limit: 1,
    });

    if (!location || isEmpty(location)) {
      latitude = FALLBACK_LATITUDE;
      longitude = FALLBACK_LONGITUDE;
    }

    const weather = await api.get('/data/2.5/onecall', null, {
      lat: latitude,
      lon: longitude,
      exclude: 'minutely,alerts',
      ...(unit === 'Celsius' && { units: 'metric' }),
    });

    const payload = { ...weather, name: location?.[0]?.name || FALLBACK_CITY };

    return payload;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const fetchWeather = async (coords, unit) => {
  try {
    const weather = await api.get('/data/2.5/onecall', null, {
      lat: coords.lat,
      lon: coords.lon,
      exclude: 'minutely,alerts',
      ...(unit === 'Celsius' && { units: 'metric' }),
    });

    const payload = { ...weather, id: coords.id, name: coords.name, isCurrent: coords.isCurrent };

    return payload;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

export const fetchLocations = async (query) => {
  try {
    const locations = await api.get('/geo/1.0/direct', null, {
      q: query,
      limit: 5,
    });
    return locations;
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};

import API from '../../utils/axios';

const api = new API();

export const fetchWeather = async (data, unit) => {
  const weather = await api.get('/data/2.5/onecall', null, {
    lat: data?.coords?.latitude,
    lon: data?.coords?.longitude,
    exclude: 'minutely',
    ...(unit === 'Celsius' && { units: 'metric' }),
  });
  return weather;
};

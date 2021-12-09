import 'dotenv/config';

export default {
  name: 'ForecastWare',
  version: '1.0.0',
  extra: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
};

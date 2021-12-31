import 'dotenv/config';

export default {
  name: 'ForecastWare',
  slug: 'forecastware',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['sentry-expo'],
  extra: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
};

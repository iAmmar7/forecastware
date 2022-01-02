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
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'ammar-bn',
          project: 'forecastware',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
  extra: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
};

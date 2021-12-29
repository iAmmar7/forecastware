import 'dotenv/config';

export default {
  name: 'ForecastWare',
  version: '1.0.0',
  description: 'A weather forecast application',
  slug: 'forecastware',
  privacy: 'public',
  orientation: 'portrait',
  icon: './assets/appstore.png',
  githubUrl: 'https://github.com/iAmmar7/forecastware',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['assets/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier: 'com.iammar7.forecastware',
    buildNumber: '1.0.0',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/playstore.png',
      backgroundColor: '#ffffff',
    },
    userInterfaceStyle: 'automatic',
    package: 'com.iammar7.forecastware',
    versionCode: 1,
  },
  androidStatusBar: {
    backgroundColor: '#F5F5F5',
    translucent: true,
  },
  extra: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
};

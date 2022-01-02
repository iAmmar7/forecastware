# forecastware
Weather forecast cross-platform mobile application based on React Native with Expo Managed workflow.

## Few cool features
- Device's **current location**.
- Location tracker using device's **background location** service.
- Temperature check on every 10000 meters location change.
- **Notification** on temperature change.
- **Background fetch** job that runs after every 15 minutes to update the current location weather and display the notification.
- **Task manager** to handle Background Fetch jobs.
- **SQLite** to store multiple locations data.
- Mobile **battery level monitor**. The app will display a pop-up and close if the battery level goes down to 20%.
- **Screenshot taker** icon on different screens.
- **Weather map** with different layouts for precipitation, clouds, pressure, temperature, and wind.
- In app web **browser** using expo-web for external links.
- **Sentry** integration for crash report and performance monitoring.
- **Snack** integration for testing on different platforms.
- **Search locations** feature.
- Combined **custom theme** using React Native Paper and React Native Navigation.
- **Dark mode** feature using Material Design practices.
- The design of this app is inspired by **Android Weather Application**.
- Enabling the app theme color by user's mobile theme.
- Store user preferences in **AsyncStorage**.
- Temperature unit change feature; current support for Celsius, Fahrenheit, and Kelvin.
- Custom hooks.
- Custom lodash-like utility functions.
- Custom **animation** using Animatable library.
- Custom **expo configuration** for different platoforms.
- For state management, this app is using **React Context API**.
- The location data is being fetched from the **Open Weather API**.


## Technologies
- React Native <img alt="ReactNative" src="https://img.shields.io/badge/-ReactNative-45b8d8?style=flat-square&logo=react&logoColor=white" />
- Expo CLI <img alt="Expo" src="https://img.shields.io/badge/-Expo-000000?style=flat-square&logo=expo&logoColor=white" />
- React Navigation <img alt="ReactNavigation" src="https://img.shields.io/badge/-ReactNavigation-52457B?style=flat-square&logo=react&logoColor=white" />
- Open Weather API <img alt="OpenWeather" src="https://img.shields.io/badge/-OpenWeather-EB6E4B?style=flat-square&logo=OpenWeatherMap&logoColor=white" />
- React Native Paper <img alt="paper" src="https://img.shields.io/badge/-Paper-6E62EE?style=flat-square&logo=paper" />
- Sentry <img alt="sentry" src="https://img.shields.io/badge/-Sentry-2F1334?style=flat-square&logo=sentry" />
- Snack <img alt="snack" src="https://img.shields.io/badge/-Snack-000000?style=flat-square&logo=expo-snack" />

### How to run
- git clone
- yarn install
- add .env
  ```
  API_KEY={YOUR_OPEN_WEATHER_API_KEY}
  SENTRY_AUTH_TOKEN={YOUR_SENTRY_AUTH_TOKEN} (only needed for sentry branch)
  ```
- yarn start


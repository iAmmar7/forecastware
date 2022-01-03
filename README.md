# forecastware
:boom: Weather forecast cross-platform mobile application based on React Native with Expo Managed workflow :boom:

## Few cool features
- Device's **current location** :pushpin:
- Location tracker using device's **background location** service :pushpin:
- Temperature check on every 10000 meters location change :space_invader:
- **Notification** on temperature change :milky_way: 
- **Background fetch** job that runs after every 15 minutes to update the current location weather and display the notification :timer_clock:
- **Task manager** to handle Background Fetch jobs :ninja:
- **SQLite** to store multiple locations data :convenience_store:
- Mobile **battery level monitor**. The app will display a pop-up and close if the battery level goes down to 20% :battery:
- **Screenshot taker** icon on different screens :camera_flash:
- **Weather map** using Google Maps with different layouts for precipitation, clouds, pressure, temperature, and wind :world_map:
- **Barometer** service to display the device's surrounding atmospheric pressure :thermometer:
- In app web **browser** using expo-web for external links :spider_web:
- **Sentry** integration for crash report and performance monitoring :link:
- **Snack** integration for testing on different platforms :link:
- **Search locations** feature both for map and weather :mag:
- Combined **custom theme** using React Native Paper and React Native Navigation :fire:
- **Dark mode** feature using Material Design practices :fire:
- The design of this app is inspired by **Android Weather Application** :iphone:
- Enabling the app theme color by user's mobile theme preference :selfie:
- Store user preferences in **AsyncStorage** :department_store:
- Temperature unit change feature; current support for Celsius, Fahrenheit, and Kelvin. :fire:
- Custom hooks :heart_eyes_cat:
- Custom lodash-like utility functions :heart_eyes_cat:
- Custom **animation** using Animatable library :heart_eyes_cat:
- Custom **expo configuration** for different platoforms :electric_plug:
- For state management, this app is using **React Context API** :toolbox:
- The location data is being fetched from the **Open Weather API** :toolbox:


## Technologies
- React Native <img alt="ReactNative" src="https://img.shields.io/badge/-ReactNative-45b8d8?style=flat-square&logo=react&logoColor=white" />
- Expo CLI <img alt="Expo" src="https://img.shields.io/badge/-Expo-000000?style=flat-square&logo=expo&logoColor=white" />
- React Navigation <img alt="ReactNavigation" src="https://img.shields.io/badge/-ReactNavigation-52457B?style=flat-square&logo=react&logoColor=white" />
- Open Weather API <img alt="OpenWeather" src="https://img.shields.io/badge/-OpenWeather-EB6E4B?style=flat-square&logo=OpenWeatherMap&logoColor=white" />
- React Native Paper <img alt="paper" src="https://img.shields.io/badge/-Paper-6E62EE?style=flat-square&logo=paper" />
- Sentry <img alt="sentry" src="https://img.shields.io/badge/-Sentry-2F1334?style=flat-square&logo=sentry" />
- Snack <img alt="snack" src="https://img.shields.io/badge/-Snack-000000?style=flat-square&logo=expo-snack" />

## How to run
- git clone
- yarn install
- add .env
  ```
  API_KEY={YOUR_OPEN_WEATHER_API_KEY}
  SENTRY_AUTH_TOKEN={YOUR_SENTRY_AUTH_TOKEN} (only needed for sentry branch)
  ```
- yarn start


## Snack
The below Snack is for portfolio purposes only.

https://snack.expo.dev/@iammar7/forecastware_v44

:fire: Dark mode is preferable for **iOS**. :fire:

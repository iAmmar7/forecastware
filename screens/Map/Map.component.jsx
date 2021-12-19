import React, { Fragment, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { Appbar, Surface, Text } from 'react-native-paper';
import MapView, { UrlTile } from 'react-native-maps';
import Constants from 'expo-constants';

import { Searchbar } from 'forecastware/components';
import { useStyles, useUserContext } from 'forecastware/hooks';
import { API_KEY, FALLBACK_LONGITUDE, FALLBACK_LATITUDE } from 'forecastware/utils/constants';

function MapComponent() {
  const { styles } = useStyles(createStyles);
  const { currentLocation } = useUserContext();
  const [region, setRegion] = useState({
    latitude: currentLocation.latitude || FALLBACK_LATITUDE,
    longitude: currentLocation.longitude || FALLBACK_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [urlTemplate, setUrlTemplate] = useState(
    `https://tile.openweathermap.org/map/temp_new/0/0/0.png?appid=${API_KEY}`,
  );

  console.log('url', urlTemplate);

  return (
    <MapView style={styles.map} region={region}>
      <UrlTile urlTemplate={urlTemplate} flipY={false} zIndex={1} />
    </MapView>
  );
}

const createStyles = () => ({
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  overlay: {
    position: 'absolute',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
  },
  header: {
    width: '100%',
  },
  searchbar: {},
});

export default MapComponent;

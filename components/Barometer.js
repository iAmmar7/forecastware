import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Barometer } from 'expo-sensors';
import * as Animatable from 'react-native-animatable';

import { useStyles } from '../hooks';

function ForecastWareBarometer() {
  const [data, setData] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);
  const { styles } = useStyles(createStyle);

  useEffect(() => {
    (async () => {
      const available = await Barometer.isAvailableAsync();
      setIsAvailable(available);
    })();
  }, []);

  useEffect(() => {
    const subscription = Barometer.addListener((barometerData) => {
      setData(barometerData);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const { pressure = 0, relativeAltitude = 0 } = data;

  if (!isAvailable) {
    return (
      <Surface style={styles.container}>
        <Text style={styles.availabilityText}>
          Unfortunately, your device does not support Barometer!
        </Text>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <Surface style={styles.details}>
        <Surface style={styles.item}>
          <Animatable.View animation='bounceIn'>
            <Surface style={styles.itemValue}>
              <Text style={styles.itemValueMain}>{Math.round(pressure)}</Text>
              <Text style={styles.itemValueSub}>hPa</Text>
            </Surface>
            <Text style={styles.itemLabel}>Current Air Pressure</Text>
          </Animatable.View>
        </Surface>
        {Platform.OS === 'ios' && (
          <Surface style={styles.item}>
            <Animatable.View animation='bounceIn'>
              <Surface style={styles.itemValue}>
                <Text style={styles.itemValueMain}>{relativeAltitude}</Text>
                <Text style={styles.itemValueSub}>m</Text>
              </Surface>
              <Text style={styles.itemLabel}>Current Altitude</Text>
            </Animatable.View>
          </Surface>
        )}
      </Surface>
    </Surface>
  );
}

const createStyle = (theme) => ({
  container: {
    marginHorizontal: 18,
    backgroundColor: 'transparent',
  },
  availabilityText: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    color: theme.colors.placeholder,
  },
  details: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: 'transparent',
  },
  itemValue: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemValueMain: {
    fontFamily: 'open-sans-medium',
    fontSize: 30,
    padding: 0,
  },
  itemValueSub: {
    fontSize: 18,
    paddingBottom: 2,
  },
  itemLabel: {
    fontFamily: 'open-sans-medium',
    color: theme.colors.placeholder,
  },
});

export default ForecastWareBarometer;

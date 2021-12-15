import React, { useEffect, useState } from 'react';
import { AppState, BackHandler } from 'react-native';
import { Text, Card } from 'react-native-paper';
import * as Battery from 'expo-battery';

import { useStyles } from '../hooks';
import { APP_NAME, MINIMUM_BATTERY_LIMIT } from '../utils/constants';

function BatteryMonitor() {
  const [appStateVisible, setAppStateVisible] = useState(true);
  const [batteryLimit, setBatteryLimit] = useState(false);
  const [timer, setTimer] = useState(10);
  const { styles } = useStyles(createStyles);

  useEffect(() => {
    AppState.addEventListener('change', (nextState) => setAppStateVisible(nextState === 'active'));

    return () => {
      AppState.removeEventListener('change', (nextState) =>
        setAppStateVisible(nextState === 'active'),
      );
    };
  }, []);

  useEffect(() => {
    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      if (batteryLevel * 100 < MINIMUM_BATTERY_LIMIT) {
        setBatteryLimit(true);
      } else {
        setBatteryLimit(false);
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (appStateVisible) {
        const battery = await Battery.getBatteryLevelAsync();
        if (battery * 100 < MINIMUM_BATTERY_LIMIT) {
          setBatteryLimit(true);
        }
      }
    })();
  }, [appStateVisible]);

  useEffect(() => {
    let interval = null;
    if (batteryLimit) {
      interval = setInterval(() => {
        setTimer((lastTime) => (lastTime > 0 ? lastTime - 1 : 0));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [batteryLimit]);

  useEffect(() => {
    if (timer === 0) {
      setTimer(10);
      setBatteryLimit(false);
      BackHandler.exitApp();
    }
  }, [timer]);

  if (!batteryLimit) return null;

  return (
    <Card style={styles.card}>
      <Text style={styles.text}>
        {APP_NAME} is closing in {timer} seconds, since the battery is less than{' '}
        {MINIMUM_BATTERY_LIMIT}%
      </Text>
    </Card>
  );
}

const createStyles = (theme) => ({
  card: {
    position: 'absolute',
    top: 120,
    marginHorizontal: 10,
    backgroundColor: '#EC6E4C',
    elevation: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    color: theme.colors.background,
    fontSize: 16,
  },
});

BatteryMonitor.propTypes = {};

export default BatteryMonitor;

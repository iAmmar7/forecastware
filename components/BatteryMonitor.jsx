import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { Text, Card } from 'react-native-paper';
import * as Battery from 'expo-battery';

import { useStyles } from '../hooks';
import { APP_NAME, MINIMUM_BATTERY_LIMIT } from '../utils/constants';

// (async () => {
//   const battery = await Battery.getBatteryLevelAsync();
//   if (battery * 100 < MINIMUM_BATTERY_LIMIT) {
//     BackHandler.exitApp();
//   }
// })();

function BatteryMonitor() {
  const [batteryLimit, setBatteryLimit] = useState(false);
  const [timer, setTimer] = useState(10);
  const { styles } = useStyles(createStyles);

  useEffect(() => {
    let subscription = null;
    (async () => {
      const battery = await Battery.getBatteryLevelAsync();
      if (battery * 100 < MINIMUM_BATTERY_LIMIT) {
        setBatteryLimit(true);
        return;
      }

      subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        if (batteryLevel * 100 < MINIMUM_BATTERY_LIMIT) {
          setBatteryLimit(true);
        } else {
          setBatteryLimit(false);
        }
      });
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

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
    if (timer === 0) BackHandler.exitApp();
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
    backgroundColor: theme.colors.notification,
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

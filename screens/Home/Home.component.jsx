import React from 'react';
import { Surface, Text, Title } from 'react-native-paper';

import { useStyles } from '../../hooks';

const HomeComponent = (props) => {
  const { data, unit } = props;
  const { styles } = useStyles(createStyles);

  console.log('data', data);

  return (
    <Surface style={styles.screen}>
      <Surface style={styles.summary}>
        <Surface style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{Math.round(data?.current?.temp || 0)}</Text>
          <Surface style={styles.unit}>
            <Text style={{ ...styles.unitText, ...styles.degree }}>&deg;</Text>
            <Text style={styles.unitText}>{unit === 'Celsius' ? 'C' : 'F'}</Text>
          </Surface>
        </Surface>
        <Surface>
          <Text style={styles.weather}>{data?.current?.weather?.[0]?.main}</Text>
        </Surface>
      </Surface>
    </Surface>
  );
};

const createStyles = () => ({
  screen: {
    flex: 1,
  },
  summary: {
    marginTop: 100,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'red',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 60,
  },
  unit: {
    flexDirection: 'row',
  },
  unitText: {
    marginTop: 12,
    fontSize: 20,
    fontFamily: 'open-sans-medium',
  },
  degree: {
    fontSize: 20,
    marginRight: -2,
  },
  weather: {
    fontSize: 20,
    fontFamily: 'open-sans-medium',
  },
});

export default HomeComponent;

import React from 'react';
import { Surface, Text } from 'react-native-paper';

import { useStyles } from '../../hooks';

const CitySearchComponent = () => {
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.screen}>
      <Text>CitySearch Management</Text>
    </Surface>
  );
};

const createStyles = () => ({
  screen: {
    flex: 1,
  },
});

export default CitySearchComponent;

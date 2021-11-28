import React from 'react';
import { Appbar } from 'react-native-paper';

import { useStyles } from '../hooks';

const Header = ({ options, back, navigation }) => {
  const { headerTitle } = options;
  const { styles, theme } = useStyles(createStyles);

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={styles.header}>
      {back && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Action icon="city-variant-outline" onPress={() => navigation.push('Location')} />
      <Appbar.Content title={headerTitle} titleStyle={styles.titleStyles} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
};

const createStyles = () => ({
  header: {},
  titleStyles: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Header;

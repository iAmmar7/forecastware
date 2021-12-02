import React from 'react';
import { Appbar, Surface, Title } from 'react-native-paper';

import { useStyles } from '../hooks';

const Header = (props) => {
  const {
    options: { headerTitle },
    back,
    navigation,
  } = props;
  const { styles, theme } = useStyles(createStyles);

  console.log('props', props);

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }} style={styles.header}>
      {/* {back && <Appbar.BackAction onPress={() => navigation.goBack()} />} */}
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title={
          <Surface style={styles.titleContainer}>
            <Title>{headerTitle}</Title>
          </Surface>
        }
        titleStyle={styles.titleStyles}
      />
      <Appbar.Action icon="plus" onPress={() => navigation.navigate('CitySearch')} />
    </Appbar.Header>
  );
};

const createStyles = () => ({
  header: {},
  titleStyles: {
    // marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Header;

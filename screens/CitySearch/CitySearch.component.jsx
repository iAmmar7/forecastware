import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { Subheading, Surface } from 'react-native-paper';

import { CityList, Loader } from '../../components';
import { useStyles } from '../../hooks';
import { topCities, topWorldCities } from '../../utils/dummy-data';

function CitySearchComponent(props) {
  const { loading, navigation, handleAddLocation } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.screen}>
      <ScrollView
        onScroll={(event) => {
          navigation.setOptions({ showBottomBorder: event.nativeEvent.contentOffset.y > 15 });
        }}
        scrollEventThrottle={10}
      >
        <Surface>
          <Surface style={styles.container}>
            <Subheading style={styles.subHeading}>Top cities</Subheading>
            <CityList data={topCities} handleAddLocation={handleAddLocation} />
          </Surface>
          <Surface style={styles.container}>
            <Subheading style={styles.subHeading}>Top cities - world</Subheading>
            <CityList data={topWorldCities} handleAddLocation={handleAddLocation} />
          </Surface>
        </Surface>
      </ScrollView>
      {loading && <Loader style={styles.loader} />}
    </Surface>
  );
}

const createStyles = () => ({
  screen: {
    flex: 1,
    position: 'relative',
  },
  container: {
    marginTop: 20,
    marginHorizontal: 14,
  },
  subHeading: {
    textTransform: 'uppercase',
    fontFamily: 'open-sans-bold',
    fontSize: 14,
  },
  loader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

CitySearchComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  handleAddLocation: PropTypes.func.isRequired,
};

export default CitySearchComponent;

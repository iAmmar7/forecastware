import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Subheading, Surface } from 'react-native-paper';

import { Loader } from 'forecastware/components';
import { useStyles } from 'forecastware/hooks';
import { topCities, topWorldCities } from 'forecastware/utils/dummy-data';
import CityList from './components/CityList';
import { isEmpty } from '../../utils/helpers';

function CitySearchComponent(props) {
  const {
    loading,
    currentLocation,
    navigation,
    handleAddLocation,
    handleRemoveLocation,
    handleDismissSearch,
  } = props;
  const { styles } = useStyles(createStyles);

  return (
    <Surface style={styles.screen}>
      <TouchableWithoutFeedback onPress={handleDismissSearch}>
        <ScrollView
          onScroll={(event) => {
            navigation.setOptions({ showBottomBorder: event.nativeEvent.contentOffset.y > 15 });
          }}
          scrollEventThrottle={10}
        >
          <Surface>
            <Surface style={styles.container}>
              <Subheading style={styles.subHeading}>Top cities</Subheading>
              <CityList
                data={[
                  !isEmpty(currentLocation) && {
                    name: 'Position',
                    lat: currentLocation?.coords?.latitude,
                    lon: currentLocation?.coords?.longitude,
                  },
                  ...topCities,
                ]}
                handleAddLocation={handleAddLocation}
                handleRemoveLocation={handleRemoveLocation}
              />
            </Surface>
            <Surface style={styles.container}>
              <Subheading style={styles.subHeading}>Top cities - world</Subheading>
              <CityList
                data={topWorldCities}
                handleAddLocation={handleAddLocation}
                handleRemoveLocation={handleRemoveLocation}
              />
            </Surface>
          </Surface>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  currentLocation: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  handleAddLocation: PropTypes.func.isRequired,
  handleRemoveLocation: PropTypes.func.isRequired,
  handleDismissSearch: PropTypes.func.isRequired,
};

export default CitySearchComponent;

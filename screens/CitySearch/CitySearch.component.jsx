import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { Subheading, Surface } from 'react-native-paper';

import { CityList } from '../../components';
import { useStyles } from '../../hooks';
import { topCities, topWorldCities } from '../../utils/dummy-data';

function CitySearchComponent(props) {
  const { navigation } = props;
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
            <Surface>
              <Subheading style={styles.subHeading}>Top cities</Subheading>
            </Surface>
            <CityList data={topCities} />
          </Surface>
          <Surface style={styles.container}>
            <Surface>
              <Subheading style={styles.subHeading}>Top cities - world</Subheading>
            </Surface>
            <CityList data={topWorldCities} />
          </Surface>
        </Surface>
      </ScrollView>
    </Surface>
  );
}

const createStyles = () => ({
  screen: {
    flex: 1,
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
});

CitySearchComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CitySearchComponent;

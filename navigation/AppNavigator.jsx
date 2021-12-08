import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';

import AllNavigators from './AllNavigators';
import { StartupScreen } from '../screens';
import { useLocationContext } from '../hooks';
// import { isEmpty } from '../utils/helpers';

function AppNavigator(props) {
  const { theme } = props;
  const { locations } = useLocationContext();

  return (
    <NavigationContainer theme={theme}>
      {/* {!isEmpty(location) && isReady ? <AllNavigators /> : <StartupScreen />} */}
      {/* {!isEmpty(locations) ? <AllNavigators /> : <StartupScreen />} */}
      {locations.length > 1 ? <AllNavigators /> : <StartupScreen />}
    </NavigationContainer>
  );
}

AppNavigator.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default AppNavigator;

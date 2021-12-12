import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';

import AllNavigators from './AllNavigators';

function AppNavigator(props) {
  const { theme } = props;

  return (
    <NavigationContainer theme={theme}>
      <AllNavigators />
    </NavigationContainer>
  );
}

AppNavigator.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default AppNavigator;

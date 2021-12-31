import React from 'react';
import PropTypes from 'prop-types';

import OptionComponent from './Option.component';

function OptionContainer(props) {
  const { navigation } = props;

  return <OptionComponent navigation={navigation} />;
}

OptionContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default OptionContainer;

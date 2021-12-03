import React from 'react';

import CitySearchComponent from './CitySearch.component';

const CitySearchContainer = (props) => {
  const { navigation } = props;

  return <CitySearchComponent navigation={navigation} />;
};

export default CitySearchContainer;

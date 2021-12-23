import React from 'react';

import { useLocationContext, useUserContext } from 'forecastware/hooks';
import CityComponent from './City.component';

function CityContainer(props) {
  const [{ unit }, { locations }] = [useUserContext(), useLocationContext()];

  console.log('props', props.navigation);

  return <CityComponent data={locations} unit={unit} />;
}

export default CityContainer;

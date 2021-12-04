import React from 'react';

import CityComponent from './City.component';
import { useLocationContext, useUserContext } from '../../hooks';

function CityContainer() {
  const [{ unit }, { locations }] = [useUserContext(), useLocationContext()];

  return <CityComponent data={locations} unit={unit} />;
}

export default CityContainer;

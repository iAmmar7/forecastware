import React from 'react';

import { useLocationContext, useUserContext } from 'forecastware/hooks';
import CityComponent from './City.component';

function CityContainer() {
  const [{ unit }, { locations }] = [useUserContext(), useLocationContext()];

  return <CityComponent data={locations} unit={unit} />;
}

export default CityContainer;

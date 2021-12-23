import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocationContext, useUserContext } from 'forecastware/hooks';
import CityComponent from './City.component';

function CityContainer(props) {
  const {
    route: { params: { isEditMode } = {} },
  } = props;
  const [{ unit }, { locations }] = [useUserContext(), useLocationContext()];
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    setStateData(locations || []);
  }, [locations?.length]);

  const handleDrag = ({ data: newData }) => {
    setStateData(newData);
  };

  return (
    <CityComponent data={stateData} unit={unit} isEditMode={isEditMode} handleDrag={handleDrag} />
  );
}

CityContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export default CityContainer;

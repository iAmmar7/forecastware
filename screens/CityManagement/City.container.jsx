import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocationContext, useUserContext } from 'forecastware/hooks';
import CityComponent from './City.component';

function CityContainer(props) {
  const {
    route: { params: { isEditMode, selectAll } = {} },
  } = props;
  const [{ unit }, { locations }] = [useUserContext(), useLocationContext()];
  const [stateData, setStateData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setStateData(locations || []);
  }, [locations?.length]);

  useEffect(() => {
    if (selectAll) {
      const newChecked = locations.map((loc) => loc.id);
      setCheckedItems(newChecked);
    }
    if (!selectAll) setCheckedItems([]);
  }, [selectAll]);

  const handleDrag = ({ data: newData }) => {
    setStateData(newData);
  };

  const handleCheckbox = (id) => {
    const newChecked = [...checkedItems];
    const index = checkedItems.findIndex((item) => Number(item) === Number(id));
    if (index > -1) newChecked.splice(index, 1);
    else newChecked.push(id);

    setCheckedItems(newChecked);
  };

  return (
    <CityComponent
      data={stateData}
      unit={unit}
      isEditMode={isEditMode}
      checked={checkedItems}
      handleDrag={handleDrag}
      handleCheckbox={handleCheckbox}
    />
  );
}

CityContainer.propTypes = {
  route: PropTypes.object.isRequired,
};

export default CityContainer;

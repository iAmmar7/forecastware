import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocationContext, useUserContext } from 'forecastware/hooks';
import CityComponent from './City.component';

function CityContainer(props) {
  const {
    navigation,
    route: { params: { isEditMode, selectAll } = {} },
  } = props;
  const [{ unit }, { locations, removeMultipleLocations }] = [
    useUserContext(),
    useLocationContext(),
  ];
  const [stateData, setStateData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleDismissError = () => setError(null);

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

  const handleDelete = async () => {
    try {
      setLoading(true);
      await removeMultipleLocations(checkedItems);
      navigation.setParams({ isEditMode: false });
      setLoading(false);
      setError({ type: 'info', message: 'Selected cities have been deleted!' });
    } catch (err) {
      setError({ type: 'error', message: 'Unable to delete the selected cities!' });
    }
  };

  return (
    <CityComponent
      loading={loading}
      error={error}
      handleDismissError={handleDismissError}
      data={stateData}
      unit={unit}
      isEditMode={isEditMode}
      checked={checkedItems}
      handleDrag={handleDrag}
      handleCheckbox={handleCheckbox}
      handleDelete={handleDelete}
    />
  );
}

CityContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default CityContainer;

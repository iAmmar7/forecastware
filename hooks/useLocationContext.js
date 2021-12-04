import { useContext } from 'react';

import { LocationContext } from '../contexts';

const useLocationContext = () => {
  const locationContext = useContext(LocationContext);

  return locationContext;
};

export default useLocationContext;

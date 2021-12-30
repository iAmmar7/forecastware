import { useContext } from 'react';

import { UserContext } from '../contexts';

const useUserContext = () => {
  const userContext = useContext(UserContext);

  return userContext;
};

export default useUserContext;

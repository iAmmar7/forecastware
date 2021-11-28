import React, { useEffect } from 'react';

import StartupComponent from './Startup.component';
import { useUserContext } from '../../hooks';

const StartupContainer = () => {
  const { askForLocation } = useUserContext();

  useEffect(() => {
    askForLocation();
  }, []);

  return <StartupComponent />;
};

export default StartupContainer;

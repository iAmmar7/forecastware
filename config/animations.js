import * as Animatable from 'react-native-animatable';

const init = () => {
  Animatable.initializeRegistryWithDefinitions({
    portalSlideUp: {
      from: {
        bottom: -40,
      },
      to: {
        bottom: 30,
      },
    },
    portalSlideDown: {
      from: {
        bottom: 30,
      },
      to: {
        bottom: -40,
      },
    },
  });
};

export default init;

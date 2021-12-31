/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

const combineProviders = (providers) =>
  providers.reduce(
    (Combined, { name: Provider, props = {} }) =>
      function ({ children }) {
        return (
          <Combined>
            <Provider {...props}>{children}</Provider>
          </Combined>
        );
      },
    Fragment,
  );

export default combineProviders;

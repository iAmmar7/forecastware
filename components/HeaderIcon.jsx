import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

import { useStyles } from '../hooks';

function HeaderIcon(props) {
  const { Component, name, hasScrolled, handleNavigate } = props;
  const { styles, theme } = useStyles(createStyles);

  return (
    <Button
      mode='text'
      compact
      onPress={handleNavigate}
      theme={{ colors: { primary: theme.colors.placeholder } }}
      style={styles.btn}
    >
      <Component
        name={name}
        size={22}
        color={hasScrolled ? theme.colors.primary : theme.colors.text}
      />
    </Button>
  );
}

const createStyles = () => ({
  btn: {
    borderRadius: 50,
  },
});

HeaderIcon.propTypes = {
  Component: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  hasScrolled: PropTypes.bool,
  handleNavigate: PropTypes.func.isRequired,
};

HeaderIcon.defaultProps = {
  hasScrolled: false,
};

export default HeaderIcon;

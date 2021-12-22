import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'react-native-paper';

import { useStyles } from '../hooks';

function HeaderIcon(props) {
  const { Component, name, isText, color, handleNavigate } = props;
  const { styles, theme } = useStyles(createStyles);
  const [actionColor, setActionColor] = useState(color);

  useEffect(() => {
    setActionColor(color);
  }, [color]);

  const childRenderer = useMemo(() => {
    if (isText) {
      return <Text>{name}</Text>;
    }
    return <Component name={name} size={22} color={actionColor ?? theme.colors.primary} />;
  }, [isText, actionColor]);

  return (
    <Button
      mode='text'
      compact
      onPress={handleNavigate}
      theme={{ colors: { primary: theme.colors.placeholder } }}
      style={styles.btn}
    >
      {childRenderer}
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
  isText: PropTypes.bool,
  color: PropTypes.string,
  handleNavigate: PropTypes.func.isRequired,
};

HeaderIcon.defaultProps = {
  color: null,
  isText: false,
};

export default HeaderIcon;

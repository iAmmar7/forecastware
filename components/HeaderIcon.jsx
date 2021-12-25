import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'react-native-paper';

import { useStyles } from '../hooks';

function HeaderIcon(props) {
  const { IconComponent, name, isText, color, onPress } = props;
  const { styles, theme } = useStyles(createStyles);
  const [actionColor, setActionColor] = useState(color);

  useEffect(() => {
    setActionColor(color);
  }, [color]);

  const childRenderer = useMemo(() => {
    if (isText) {
      return <Text style={styles.text}>{name}</Text>;
    }
    return <IconComponent name={name} size={22} color={actionColor ?? theme.colors.primary} />;
  }, [isText, actionColor, name]);

  return (
    <Button
      mode='text'
      compact
      onPress={onPress}
      theme={{ colors: { primary: theme.colors.placeholder } }}
      style={[styles.button, !isText && styles.iconButton]}
      uppercase={false}
    >
      {childRenderer}
    </Button>
  );
}

const createStyles = (theme) => ({
  button: {},
  iconButton: {
    borderRadius: 50,
  },
  text: {
    color: theme.colors.primary,
    fontSize: 14,
    fontFamily: 'open-sans-medium',
  },
});

HeaderIcon.propTypes = {
  IconComponent: PropTypes.func,
  name: PropTypes.string.isRequired,
  isText: PropTypes.bool,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

HeaderIcon.defaultProps = {
  IconComponent: null,
  color: null,
  isText: false,
};

export default HeaderIcon;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { useStyles } from 'forecastware/hooks';
import { isEmpty } from 'forecastware/utils/helpers';

function ForecastWareSnackbar(props) {
  const { message, severity, duration, onDismiss } = props;
  const [text, setText] = useState(null);
  const [type, setType] = useState(severity);
  const { styles, theme } = useStyles(createStyles);

  useEffect(() => {
    setText(message);
  }, [message]);

  useEffect(() => {
    setType(severity);
  }, [severity]);

  const handleDismiss = () => {
    setText(null);
    onDismiss?.();
  };

  return (
    <Snackbar
      visible={!isEmpty(text)}
      duration={duration}
      onDismiss={handleDismiss}
      theme={{
        colors: {
          surface: '#FFFFFF',
          onSurface: theme.colors.background,
          ...(type === 'info' && { onSurface: theme.colors.accent }),
          ...(type === 'error' && { onSurface: theme.colors.notification }),
        },
      }}
    >
      <View style={styles.container}>
        {type === 'info' && (
          <Ionicons name='ios-checkmark-done-circle-outline' size={22} color='white' />
        )}
        {type === 'error' && <MaterialIcons name='error-outline' size={22} color='white' />}
        <Text style={styles.text}>{message}</Text>
      </View>
    </Snackbar>
  );
}

const createStyles = () => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 48,
  },
  text: {
    color: 'white',
    marginLeft: 2,
  },
});

ForecastWareSnackbar.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
  duration: PropTypes.number,
  onDismiss: PropTypes.func,
};

ForecastWareSnackbar.defaultProps = {
  message: null,
  severity: 'info',
  duration: 1000,
  onDismiss: null,
};

export default ForecastWareSnackbar;

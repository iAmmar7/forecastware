import React from 'react';
import { View } from 'react-native';
import { Portal, Dialog, RadioButton, Button, Text } from 'react-native-paper';
import PropTypes from 'prop-types';

import { useStyles } from 'forecastware/hooks';
import { mapLayerOptions } from 'forecastware/utils/constants';

function Modal(props) {
  const { visible, selected, handleChangeOptions, toggleModal } = props;
  const { styles, theme } = useStyles(createStyles);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleModal} style={styles.modal}>
        <Dialog.Title>Map type</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group onValueChange={handleChangeOptions} value={selected}>
            {mapLayerOptions.map((opt) => (
              <View key={opt.id} style={styles.option}>
                <Text>{opt.label}</Text>
                <RadioButton
                  value={opt.value}
                  theme={{ colors: { accent: theme.colors.primary } }}
                />
              </View>
            ))}
          </RadioButton.Group>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={toggleModal}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const createStyles = () => ({
  modal: {
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  selected: PropTypes.string.isRequired,
  handleChangeOptions: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;

import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, Surface, Text, Checkbox, Portal, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { Loader, Snackbar } from '../../components';
import { useStyles } from '../../hooks';
import { isEmpty, take } from '../../utils/helpers';
import { temperatureUnits } from '../../utils/constants';

function CityComponent(props) {
  const {
    loading,
    data,
    isEditMode,
    checked,
    error,
    handleDismissError,
    handleDrag,
    handleCheckbox,
    handleDelete,
  } = props;
  const { styles, theme } = useStyles(createStyles);
  const deleteRef = useRef();

  useEffect(() => {
    if (isEditMode) deleteRef?.current?.portalSlideUp(500);
    if (!isEditMode) deleteRef?.current?.portalSlideDown(500);
  }, [isEditMode]);

  const unitRenderer = useCallback((temp, weatherUnit) => {
    const symbol = weatherUnit.charAt(0);
    if (weatherUnit === temperatureUnits.KELVIN) {
      return (
        <Text style={styles.temperature}>
          {Math.round(temp || 0)}
          {symbol}
        </Text>
      );
    }
    return (
      <Text style={styles.temperature}>
        {Math.round(temp || 0)}&deg;{symbol}
      </Text>
    );
  }, []);

  return (
    <Portal.Host>
      <Surface style={styles.screen}>
        <DraggableFlatList
          data={data}
          onDragEnd={handleDrag}
          keyExtractor={(item) => item.name}
          renderItem={({ item, drag, isActive }) => {
            return (
              <ScaleDecorator>
                <Surface style={styles.cityContainer}>
                  <Animatable.View
                    transition='width'
                    duration={500}
                    style={{
                      width: isEditMode ? '86%' : '96%',
                      marginLeft: '2%',
                      marginRight: isEditMode ? '1%' : '2%',
                    }}
                  >
                    <Card style={styles.cityCard}>
                      <LinearGradient
                        colors={take(theme.colors[item.current.weather[0].main], 3, 1)}
                      >
                        <TouchableOpacity
                          onLongPress={drag}
                          disabled={isActive}
                          style={styles.rowItem}
                        >
                          <View style={styles.itemFlex}>
                            <View>
                              <Text style={styles.locationName}>{item.name}</Text>
                            </View>
                            <View>
                              {unitRenderer(item.current.temp, item.unit)}
                              <Text style={styles.weather}>{item.current.weather[0].main}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </LinearGradient>
                    </Card>
                  </Animatable.View>
                  {isEditMode && (
                    <Animatable.View animation='fadeIn' duration={500} style={styles.checkbox}>
                      <Checkbox
                        status={
                          checked.find((check) => check === item.id) ? 'checked' : 'unchecked'
                        }
                        onPress={() => handleCheckbox(item.id)}
                        theme={{ colors: { accent: theme.colors.primary } }}
                      />
                    </Animatable.View>
                  )}
                </Surface>
              </ScaleDecorator>
            );
          }}
        />
        <Portal>
          {loading && <Loader style={styles.loader} />}
          <Snackbar
            message={error?.message}
            severity={error?.type}
            onDismiss={handleDismissError}
          />
          <Animatable.View ref={deleteRef} style={{ ...styles.deleteButton }}>
            <Button
              icon='delete'
              mode='contained'
              uppercase={false}
              dark
              theme={{ colors: { primary: theme.colors.placeholder } }}
              style={{ opacity: 0.8 }}
              onPress={handleDelete}
              disabled={isEmpty(checked)}
            >
              Delete
            </Button>
          </Animatable.View>
        </Portal>
      </Surface>
    </Portal.Host>
  );
}

const createStyles = () => ({
  screen: {
    flex: 1,
    paddingTop: 10,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    borderRadius: 10,
  },
  checkbox: {
    width: '10%',
    marginRight: '1%',
  },
  cityCard: {
    marginVertical: 10,
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  rowItem: {
    justifyContent: 'center',
    height: 80,
    paddingHorizontal: 20,
  },
  itemFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationName: {
    fontFamily: 'open-sans-medium',
    fontSize: 18,
  },
  temperature: {
    fontSize: 18,
  },
  weather: {
    textAlign: 'right',
    paddingTop: 4,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
  },
  loader: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

CityComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.array.isRequired,
  checked: PropTypes.array.isRequired,
  isEditMode: PropTypes.bool,
  handleDismissError: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

CityComponent.defaultProps = {
  error: null,
  isEditMode: false,
};

export default CityComponent;

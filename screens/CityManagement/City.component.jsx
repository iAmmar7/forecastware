import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, Surface, Text, Checkbox, Portal, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
// import { LinearGradient } from 'expo-linear-gradient';

import { Loader, Snackbar } from 'forecastware/components';
import { useStyles } from 'forecastware/hooks';
import { isEmpty } from 'forecastware/utils/helpers';
import { temperatureUnits } from 'forecastware/utils/constants';

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
                {/* <LinearGradient
                colors={['#0288D1', '#81D4FA', '#B3E5FC', '#E1F5FE']}
                style={styles.gradient}
              > */}
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
                {/* </LinearGradient> */}
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

const createStyles = (theme) => ({
  screen: {
    flex: 1,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  checkbox: {
    width: '10%',
    marginRight: '1%',
  },
  cityCard: {
    marginVertical: 10,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.background,
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

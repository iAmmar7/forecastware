import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, Surface, Text, Checkbox, Portal, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
// import { LinearGradient } from 'expo-linear-gradient';

import { useStyles } from 'forecastware/hooks';
import { temperatureUnits } from 'forecastware/utils/constants';

function CityComponent(props) {
  const { data, handleDrag, isEditMode } = props;
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
                    <Animatable.View animation='fadeIn' duration={500}>
                      <Surface style={styles.checkbox}>
                        <Checkbox
                          status={item.checked ? 'checked' : 'unchecked'}
                          onPress={() => {}}
                        />
                      </Surface>
                    </Animatable.View>
                  )}
                </Surface>
                {/* </LinearGradient> */}
              </ScaleDecorator>
            );
          }}
        />
        <Portal>
          {/* {isEditMode && ( */}
          <Animatable.View
            // animation={isEditMode ? slideUp : slideDown}
            ref={deleteRef}
            // duration={500}
            style={{ ...styles.deleteButton }}
          >
            <Button
              icon='delete'
              mode='contained'
              uppercase={false}
              dark
              theme={{ colors: { primary: theme.colors.placeholder } }}
              onPress={() => console.log('Pressed')}
            >
              Delete
            </Button>
          </Animatable.View>
          {/* )} */}
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
});

CityComponent.propTypes = {
  data: PropTypes.array.isRequired,
  handleDrag: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
};

CityComponent.defaultProps = {
  isEditMode: false,
};

export default CityComponent;

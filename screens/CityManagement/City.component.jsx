import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Card, Surface, Text } from 'react-native-paper';
// import { LinearGradient } from 'expo-linear-gradient';

import { useStyles } from 'forecastware/hooks';
import { temperatureUnits } from 'forecastware/utils/constants';

function CityComponent(props) {
  const { data } = props;
  const [stateData, setStateData] = useState([]);
  const { styles } = useStyles(createStyles);

  useEffect(() => {
    setStateData(data || []);
  }, [data?.length]);

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

  const handleDrag = ({ data: newData }) => {
    setStateData(newData);
  };

  return (
    <Surface style={styles.screen}>
      <DraggableFlatList
        data={stateData}
        onDragEnd={handleDrag}
        keyExtractor={(item) => item.name}
        renderItem={({ item, drag, isActive }) => {
          return (
            <ScaleDecorator>
              {/* <LinearGradient
                colors={['#0288D1', '#81D4FA', '#B3E5FC', '#E1F5FE']}
                style={styles.gradient}
              > */}
              <Card style={styles.gradient}>
                <TouchableOpacity onLongPress={drag} disabled={isActive} style={styles.rowItem}>
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
              {/* </LinearGradient> */}
            </ScaleDecorator>
          );
        }}
      />
    </Surface>
  );
}

const createStyles = (theme) => ({
  screen: {
    flex: 1,
  },
  gradient: {
    marginVertical: 10,
    marginHorizontal: 14,
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
});

CityComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CityComponent;

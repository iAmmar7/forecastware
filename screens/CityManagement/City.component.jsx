import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Surface, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import { useStyles } from '../../hooks';

function CityComponent(props) {
  const { data, unit } = props;
  const [stateData, setStateData] = useState(data || []);
  const {
    styles,
    theme: { colors },
  } = useStyles(createStyles);

  console.log('data', data, colors);

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
              <LinearGradient
                colors={['#0288D1', '#81D4FA', '#B3E5FC', '#E1F5FE']}
                style={styles.gradient}
              >
                <TouchableOpacity onLongPress={drag} disabled={isActive} style={styles.rowItem}>
                  <View style={styles.itemFlex}>
                    <View>
                      <Text style={styles.locationName}>{item.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.temperature}>
                        {Math.round(item.current.temp || 0)}&deg;{unit === 'Celsius' ? 'C' : 'F'}
                      </Text>
                      <Text style={styles.weather}>{item.current.weather[0].main}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </ScaleDecorator>
          );
        }}
      />
    </Surface>
  );
}

const createStyles = () => ({
  screen: {
    flex: 1,
  },
  gradient: {
    marginVertical: 10,
    marginHorizontal: 14,
    flex: 1,
    borderRadius: 10,
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
  unit: PropTypes.string.isRequired,
};

export default CityComponent;

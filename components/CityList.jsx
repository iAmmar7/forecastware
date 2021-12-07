import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Surface, Button } from 'react-native-paper';

import { useStyles } from '../hooks';

function CityList(props) {
  const { data } = props;
  const { styles, theme } = useStyles(createStyles);

  return (
    <Surface style={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  width: 120,
                  paddingHorizontal: 4,
                }}
              >
                <View style={{ backgroundColor: 'white', width: '100%' }}>
                  <Button
                    mode='contained'
                    color={theme.colors.primary}
                    uppercase={false}
                    onPress={() => console.log('Pressed')}
                    labelStyle={styles.labelStyle}
                  >
                    {item.name}
                  </Button>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Surface>
  );
}

const createStyles = (theme) => ({
  container: {
    marginVertical: 20,
  },
  labelStyle: {
    color: theme.dark ? theme.colors.text : 'white',
    fontSize: 12,
  },
});

CityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CityList;

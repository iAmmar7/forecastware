import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Subheading, Surface, Button } from 'react-native-paper';

import { useStyles } from '../../hooks';

const CitySearchComponent = (props) => {
  const { navigation } = props;
  const { styles, theme } = useStyles(createStyles);

  return (
    <ScrollView
      style={styles.screen}
      onScroll={(event) => {
        navigation.setOptions({ showBottomBorder: event.nativeEvent.contentOffset.y > 15 });
      }}
      scrollEventThrottle={10}
    >
      <Surface style={styles.container}>
        <Surface>
          <Subheading style={styles.subHeading}>Top cities</Subheading>
        </Surface>
        <Surface style={styles.btnContainer}>
          <Surface style={styles.btnRow}>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Position
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Islamabad
            </Button>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Karachi
            </Button>
          </Surface>
          <Surface style={styles.btnRow}>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Lahore
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Rawalpindi
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Multan
            </Button>
          </Surface>
          <Surface style={styles.btnRow}>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Peshawar
            </Button>
          </Surface>
        </Surface>
      </Surface>
      <Surface style={styles.container}>
        <Surface>
          <Subheading style={styles.subHeading}>Top cities - world</Subheading>
        </Surface>
        <Surface style={styles.btnContainer}>
          <Surface style={styles.btnRow}>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              New York
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Paris
            </Button>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              London
            </Button>
          </Surface>
          <Surface style={styles.btnRow}>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Tokyo
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Rome
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Dubai
            </Button>
          </Surface>
          <Surface style={styles.btnRow}>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Moscow
            </Button>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Sydney
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Hong Kong
            </Button>
          </Surface>
          <Surface style={styles.btnRow}>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Singapore
            </Button>
            <Button
              mode="outlined"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Beijing
            </Button>
            <Button
              mode="contained"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => console.log('Pressed')}
              style={styles.btn}
              labelStyle={styles.labelStyle}
            >
              Athens
            </Button>
          </Surface>
        </Surface>
      </Surface>
    </ScrollView>
  );
};

const createStyles = (theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 14,
  },
  subHeading: {
    textTransform: 'uppercase',
    fontFamily: 'open-sans-bold',
    fontSize: 14,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  btnRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  btn: {
    minWidth: '30%',
  },
  labelStyle: {
    fontSize: 12,
  },
});

export default CitySearchComponent;

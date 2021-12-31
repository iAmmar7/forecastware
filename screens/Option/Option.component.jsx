import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Surface, List, RadioButton, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { Barometer } from 'forecastware/components';
import { useStyles, useUserContext } from 'forecastware/hooks';
import { temperatureUnits, themeNames } from 'forecastware/utils/constants';
import { toCapitalize } from 'forecastware/utils/helpers';

const unitIcon = {
  [temperatureUnits.CELSIUS]: 'temperature-celsius',
  [temperatureUnits.FAHRENHEIT]: 'temperature-fahrenheit',
  [temperatureUnits.KELVIN]: 'temperature-kelvin',
};

function OptionComponent(props) {
  const { navigation } = props;
  const { styles, theme } = useStyles(createStyles);
  const { unit, setTemperatureUnit, toggleTheme } = useUserContext();
  const [stateUnit, setStateUnit] = useState(unit);
  const unitRef = useRef();

  useEffect(() => {
    if (stateUnit !== unit) {
      setTemperatureUnit(stateUnit);
    }
  }, [stateUnit]);

  const themeName = useMemo(() => {
    return theme.dark ? themeNames.DARK : themeNames.LIGHT;
  }, [theme]);

  const handleTemperatureChange = (value) => {
    unitRef.current?.fadeIn(400);
    setStateUnit(value);
  };

  const handleThemeChange = (value) => {
    if (value === themeName) return;
    toggleTheme();
  };

  return (
    <Surface style={styles.screen}>
      <List.Section>
        <List.Subheader>App settings</List.Subheader>
        <List.AccordionGroup>
          <List.Accordion
            id='1'
            title='Temperature unit'
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={({ color }) => {
              const isActive = color === '#EC6E4C';
              return (
                <Animatable.View ref={unitRef}>
                  <MaterialCommunityIcons
                    name={unitIcon[unit]}
                    size={22}
                    style={styles.accordionIcon}
                    color={isActive ? color : theme.colors.text}
                  />
                </Animatable.View>
              );
            }}
          >
            <Surface style={styles.radioGroup}>
              <RadioButton.Group onValueChange={handleTemperatureChange} value={stateUnit}>
                {Object.keys(temperatureUnits).map((temp) => (
                  <Surface key={temp} style={styles.radioContainer}>
                    <Text>{temperatureUnits[temp]}</Text>
                    <RadioButton
                      value={temperatureUnits[temp]}
                      theme={{ colors: { accent: theme.colors.primary } }}
                    />
                  </Surface>
                ))}
              </RadioButton.Group>
            </Surface>
          </List.Accordion>
          <List.Accordion
            id='2'
            title='Theme'
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            left={({ color }) => {
              const isActive = color === theme.colors.primary;
              return (
                <MaterialCommunityIcons
                  name='theme-light-dark'
                  size={22}
                  style={styles.accordionIcon}
                  color={isActive ? color : theme.colors.text}
                />
              );
            }}
          >
            <Surface style={styles.radioGroup}>
              <RadioButton.Group onValueChange={handleThemeChange} value={themeName}>
                {Object.keys(themeNames).map((item) => (
                  <Surface key={item} style={styles.radioContainer}>
                    <Text>{toCapitalize(themeNames[item])}</Text>
                    <RadioButton
                      value={themeNames[item]}
                      theme={{ colors: { accent: theme.colors.primary } }}
                    />
                  </Surface>
                ))}
              </RadioButton.Group>
            </Surface>
          </List.Accordion>
        </List.AccordionGroup>
      </List.Section>
      <List.Section>
        <List.Subheader>More</List.Subheader>
        <List.Item
          title='Weather Map'
          left={() => <List.Icon icon='map-outline' size={22} color={theme.colors.text} />}
          style={styles.listItem}
          titleStyle={styles.listItemTitle}
          onPress={() => navigation.navigate('Map')}
        />
        <List.Item
          title='Weather Radar'
          description='Coming soon...'
          left={() => <List.Icon icon='radar' size={22} color={theme.colors.placeholder} />}
          style={styles.listItem}
          titleStyle={[styles.listItemTitle, styles.listItemTitleDisabled]}
          onPress={() => console.log('Radar')}
          disabled
        />
      </List.Section>
      <LinearGradient
        colors={
          theme.dark
            ? [theme.colors.background, theme.colors.background]
            : [theme.colors.surface, theme.colors.surface, 'grey']
        }
        style={styles.barometer}
      >
        <Barometer />
      </LinearGradient>
    </Surface>
  );
}

const createStyles = (theme) => ({
  screen: {
    flex: 1,
  },
  accordion: {
    paddingHorizontal: 8,
    backgroundColor: theme.dark ? theme.colors.surface : theme.colors.surface,
  },
  accordionIcon: {
    paddingHorizontal: 14,
  },
  accordionTitle: {
    fontFamily: 'open-sans-medium',
  },
  radioGroup: {
    paddingHorizontal: 14,
  },
  radioContainer: {
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    paddingVertical: 0,
  },
  listItemTitle: {
    fontFamily: 'open-sans-medium',
  },
  listItemTitleDisabled: {
    color: theme.colors.placeholder,
  },
  barometer: {
    marginTop: 'auto',
    paddingVertical: 40,
  },
});

OptionComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default OptionComponent;

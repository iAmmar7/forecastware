import React, { useState, useEffect, useMemo } from 'react';
import { Surface, List, RadioButton, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useStyles, useUserContext } from 'forecastware/hooks';
import { temperatureUnits, themeNames } from 'forecastware/utils/constants';
import { toCapitalize } from 'forecastware/utils/helpers';

const unitIcon = {
  [temperatureUnits.CELSIUS]: 'temperature-celsius',
  [temperatureUnits.FAHRENHEIT]: 'temperature-fahrenheit',
  [temperatureUnits.KELVIN]: 'temperature-kelvin',
};

function OptionComponent() {
  const { styles, theme } = useStyles(createStyles);
  const { unit, setTemperatureUnit, toggleTheme } = useUserContext();
  const [stateUnit, setStateUnit] = useState(unit);

  useEffect(() => {
    if (stateUnit !== unit) {
      setTemperatureUnit(stateUnit);
    }
  }, [stateUnit]);

  const themeName = useMemo(() => {
    return theme.dark ? themeNames.DARK : themeNames.LIGHT;
  }, [theme]);

  const handleTemperatureChange = (value) => {
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
                <MaterialCommunityIcons
                  name={unitIcon[unit]}
                  size={22}
                  style={styles.accordionIcon}
                  color={isActive ? color : theme.colors.text}
                />
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
              const isActive = color === '#EC6E4C';
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
          onPress={() => console.log('Map')}
        />
        <List.Item
          title='Weather Radar'
          left={() => <List.Icon icon='radar' size={22} color={theme.colors.text} />}
          style={styles.listItem}
          titleStyle={styles.listItemTitle}
          onPress={() => console.log('Radar')}
        />
      </List.Section>
    </Surface>
  );
}

const createStyles = (theme) => ({
  screen: {
    flex: 1,
  },
  accordion: {
    paddingHorizontal: 8,
    backgroundColor: theme.dark ? theme.colors.background : theme.colors.surface,
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
});

export default OptionComponent;

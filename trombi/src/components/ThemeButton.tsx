import React, {useContext} from 'react';
import {View, Switch, StyleSheet, useColorScheme} from 'react-native';
import {Appearance} from 'react-native';
import {useState, useCallback, useEffect} from 'react';

import {getCustomState} from '../utils/CustomFunctions';
import { ColorSchemeName } from 'react-native';
import { getTheme, setTheme } from '../utils/ThemeFunctions';

const ThemeButton = () => {
  const [theme, setThemeState] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    setTheme({'theme': theme})
  }, [theme]);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: getCustomState().custom['button-secondary'],
          true: getCustomState().custom['button-secondary-dark'],
        }}
        thumbColor={
          Appearance.getColorScheme() == 'light'
            ? getCustomState().custom['button-primary']
            : getCustomState().custom['button-primary-dark']
        }
        onValueChange={() => setThemeState(getTheme().theme === 'light' ? 'dark' : 'light')}
        value={theme === 'dark'}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

export default ThemeButton;

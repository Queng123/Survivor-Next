import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {getCustomState} from '../utils/CustomFunctions';
import {getTheme} from '../utils/ThemeFunctions';
import {useTheme} from '../utils/ThemeContext';

const ThemeButton = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: getCustomState().custom['button-secondary'],
          true: getCustomState().custom['button-secondary-dark'],
        }}
        thumbColor={
          getTheme().theme === 'light'
            ? getCustomState().custom['button-primary']
            : getCustomState().custom['button-primary-dark']
        }
        onValueChange={toggleTheme}
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

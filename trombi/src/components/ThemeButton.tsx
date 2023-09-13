import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';

import { getCustomState } from '../utils/CustomFunctions';

const ThemeButton = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: getCustomState().custom['button-secondary'], true: getCustomState().custom['button-secondary-dark']}}
        thumbColor={isEnabled ? getCustomState().custom['button-primary'] : getCustomState().custom['button-primary-dark']}
        onValueChange={setIsEnabled}
        value={isEnabled}
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

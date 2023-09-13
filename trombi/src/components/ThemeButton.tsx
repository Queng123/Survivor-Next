import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const ThemeButton = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#ccc', true: '#333'}}
        thumbColor={isEnabled ? '#aaa' : '#f4f3f4'}
        ios_backgroundColor={isEnabled ? '#333' : '#ccc'}
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
  text: {
    color: '#333',
    marginLeft: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

export default ThemeButton;

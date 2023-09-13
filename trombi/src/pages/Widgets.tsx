import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import {WidgetContainer} from '../components/WidgetContainer';
import {createMeteoWidget} from '../components/MeteoWidget';
import {addWidget} from '../utils/WidgetFunctions';

const Widgets = () => {
  const addWidgetBtn = () => {
    const {widgetType, widgetParams} = createMeteoWidget();
    addWidget(widgetType, widgetParams);
  };

  return (
    <View style={styles.view}>
      <WidgetContainer />
      <Pressable style={styles.button} onPress={addWidgetBtn}>
        <Text style={styles.text}>+</Text>
      </Pressable>
    </View>
  );
};

export default Widgets;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});

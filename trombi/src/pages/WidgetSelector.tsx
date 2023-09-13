import React from 'react';
import {Pressable, ScrollView, Text, StyleSheet} from 'react-native';
import {createMeteoWidget} from '../components/MeteoWidget';
import {WidgetData} from '../utils/WidgetTypes';
import {addWidget} from '../utils/WidgetFunctions';
import {useNavigation} from '@react-navigation/native';

type AddableWidget = {
  title: string;
  desc: string;
  func: () => WidgetData;
};

const WidgetSelector = () => {
  const navigation = useNavigation();
  const addableWidgets: AddableWidget[] = [
    {title: 'Meteo', desc: 'Displays the meteo', func: createMeteoWidget},
  ];
  const createWidgetAndAdd = (widget: AddableWidget) => {
    const {widgetType, widgetParams} = widget.func();
    addWidget(widgetType, widgetParams);
    navigation.navigate('Widgets');
  };

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.title}>Add widget</Text>
      {addableWidgets.map((widget, index) => (
        <Pressable
          style={styles.pressable}
          key={`widgetselector-opt-${index}`}
          onPress={() => createWidgetAndAdd(widget)}>
          <Text style={styles.innerTitle}>{widget.title}</Text>
          <Text style={styles.innerDesc}>{widget.desc}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  view: {
    padding: 10,
  },
  title: {
    fontSize: 26,
    color: 'black',
    marginBottom: 10,
  },
  pressable: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  innerTitle: {
    fontSize: 20,
    color: 'white',
  },
  innerDesc: {
    fontSize: 16,
    color: 'white',
  },
});

export default WidgetSelector;

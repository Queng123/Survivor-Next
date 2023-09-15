import React from 'react';
import {Pressable, ScrollView, Text, StyleSheet} from 'react-native';
import {createMeteoWidget} from '../components/MeteoWidget';
import {createNoteWidget} from '../components/NoteWidget';
import {createYoutubeWidget} from '../components/YoutubeWidget';
import {createCryptoWidget} from '../components/CryptoWidget';
import {WidgetData} from '../utils/WidgetTypes';
import {addWidget} from '../utils/WidgetFunctions';
import {useNavigation} from '@react-navigation/native';
import {createCalendarWidget} from '../components/CalendarWidget';
import {useTranslation} from 'react-i18next';

type AddableWidget = {
  title: string;
  desc: string;
  func: () => WidgetData;
};

const WidgetSelector = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const addableWidgets: AddableWidget[] = [
    {
      title: t('widgets.meteo.title'),
      desc: t('widgets.meteo.description'),
      func: createMeteoWidget,
    },
    {
      title: t('widgets.note.title'),
      desc: t('widgets.note.description'),
      func: createNoteWidget,
    },
    {
      title: t('widgets.youtube.title'),
      desc: t('widgets.youtube.description'),
      func: createYoutubeWidget,
    },
    {
      title: t('widgets.calendar.title'),
      desc: t('widgets.calendar.description'),
      func: createCalendarWidget,
    },
    {
      title: t('widgets.crypto.title'),
      desc: t('widgets.crypto.description'),
      func: createCryptoWidget,
    },
  ];
  const createWidgetAndAdd = (widget: AddableWidget) => {
    const {widgetType, widgetParams} = widget.func();
    addWidget(widgetType, widgetParams);
    navigation.navigate('Widgets');
  };

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.title}>{t('widgets.addWidget')}</Text>
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

import React from 'react';
import {Pressable, ScrollView, Text, StyleSheet, View} from 'react-native';
import {createMeteoWidget} from '../components/MeteoWidget';
import {createNoteWidget} from '../components/NoteWidget';
import {createYoutubeWidget} from '../components/YoutubeWidget';
import {createCryptoWidget} from '../components/CryptoWidget';
import {WidgetData} from '../utils/WidgetTypes';
import {addWidget} from '../utils/WidgetFunctions';
import {useNavigation} from '@react-navigation/native';
import {createCalendarWidget} from '../components/CalendarWidget';
import {createNasaApodWidget} from '../components/NasaApodWidget';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../utils/ThemeContext';
import {getCustomState} from '../utils/CustomFunctions';

type AddableWidget = {
  title: string;
  desc: string;
  func: () => WidgetData;
};

const WidgetSelector = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme().theme === 'dark' ? '-dark' : '';
  const styles = StyleSheet.create({
    view: {
      padding: 10,
      backgroundColor: getCustomState().custom[`background-1${theme}`],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: getCustomState().custom[`background-1${theme}`],
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 26,
      color: getCustomState().custom[`title-primary${theme}`],
      fontWeight: 'bold',
    },
    pressable: {
      padding: 10,
      backgroundColor: getCustomState().custom[`background-2${theme}`],
      borderRadius: 10,
      marginTop: 15,
    },
    widgetTitle: {
      fontSize: 20,
      color: getCustomState().custom[`title-secondary${theme}`],
    },
    widgetDesc: {
      fontSize: 16,
      color: getCustomState().custom[`text-primary${theme}`],
    },
  });
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
      title: t('widgets.nasaApod.title'),
      desc: t('widgets.nasaApod.description'),
      func: createNasaApodWidget,
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
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={30}
            color={getCustomState().custom[`button-secondary${theme}`]}
          />
        </Pressable>
        <Text style={styles.title}>{t('widgets.addWidget')}</Text>
      </View>
      {addableWidgets.map((widget, index) => (
        <Pressable
          style={[styles.pressable]}
          key={`widgetselector-opt-${index}`}
          onPress={() => createWidgetAndAdd(widget)}>
          <Text style={styles.widgetTitle}>{widget.title}</Text>
          <Text style={styles.widgetDesc}>{widget.desc}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default WidgetSelector;

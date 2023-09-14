import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {TextInput} from 'react-native-gesture-handler';
import {updateWidget} from '../utils/WidgetFunctions';

export const CalendarWidget = ({data}: {data: WidgetData}): JSX.Element => {

  return (
    <WidgetFrame
      data={data}
      title="Calendar"
      backgroundColor="#996633"
      foregroundColor="black">
      <View style={styles.container}>
        <Text>Calendar</Text>
      </View>
    </WidgetFrame>
  );
};

export const createCalendarWidget = (): WidgetData => {
  return {
    widgetType: 'CalendarWidget',
    widgetParams: {
      calendar: '',
    },
    key: '',
  };
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 60,
    maxHeight: 140,
  },
  calendarData: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  calendarDataText: {
    fontSize: 16,
  },
  calendarInput: {
    fontSize: 16,
  },
});

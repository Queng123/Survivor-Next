import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert, Button} from 'react-native';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import { CustomGoogleLoginButton, loginAndStoreToken } from '../utils/GoogleLogin';
import { useSelector } from 'react-redux';

export const CalendarWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const token = useSelector((state: any) => state.token["tokens"]["google-oauth"]);
  const [events, setEvents] = useState([] as any[]);

  return (
    <WidgetFrame
    data={data}
    title="Calendar"
    backgroundColor="#996633"
    foregroundColor="black">
    <View>
        {token === '' && (
          <CustomGoogleLoginButton />
        )}
        {token !== '' && (
          <View>
            <Text>Here</Text>
          </View>
        )}
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

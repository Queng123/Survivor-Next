import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {CustomGoogleLoginButton} from '../utils/GoogleLogin';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const CalendarWidgetEvent = ({event}: {event: any}): JSX.Element => {
  const startTimeReadable = new Date(event.start.dateTime).toLocaleTimeString(
    [],
    {hour: '2-digit', minute: '2-digit'},
  );
  const endTimeReadable = new Date(event.end.dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const startTimeDateReadable = new Date(
    event.start.dateTime,
  ).toLocaleDateString([], {weekday: 'long', day: 'numeric', month: 'long'});
  return (
    <View>
      <Text style={styles.calendarDataText}>{event.summary}</Text>
      <Text style={styles.calendarDataText}>
        {startTimeDateReadable} - de {startTimeReadable} à {endTimeReadable}
      </Text>
    </View>
  );
};

export const CalendarWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const token = useSelector((state: any) => state.token.tokens['google-oauth']);
  const [todayEvents, setTodayEvents] = useState([] as any[]);
  const [tomorrowEvents, setTomorrowEvents] = useState([] as any[]);

  React.useEffect(() => {
    const sortEvents = (events: any[]) => {
      let todayEventsNew = [] as any[];
      let tomorrowEventsNew = [] as any[];

      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDate = new Date(event.start.dateTime);
        let now = new Date();
        if (eventDate.getDate() === now.getDate()) {
          todayEventsNew.push(event);
        }
        if (eventDate.getDate() === now.getDate() + 1) {
          tomorrowEventsNew.push(event);
        }
      }
      setTodayEvents(todayEventsNew);
      setTomorrowEvents(tomorrowEventsNew);
    };

    if (token === '') {
      return;
    }
    let now = new Date();
    let s24h = new Date();
    s24h.setDate(s24h.getDate() + 1);
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now.toISOString()}&timeMax=${s24h.toISOString()}&orderBy=startTime&singleEvents=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          sortEvents(json.items);
        });
      } else {
        console.log('error', response);
      }
    });
  }, [token]);

  return (
    <WidgetFrame
      data={data}
      title="Calendar"
      backgroundColor="#d4d4d4"
      foregroundColor="black">
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        {token === '' && <CustomGoogleLoginButton />}
        {token !== '' && (
          <>
            <View style={styles.subContainer}>
              <Text style={styles.calendarTitle}>Aujourd'hui</Text>
              {todayEvents &&
                todayEvents.map(event => {
                  return <CalendarWidgetEvent event={event} key={event.id} />;
                })}
              {todayEvents.length == 0 && (
                <Text style={styles.calendarDataText}>
                  Pas d'événements à venir aujourd'hui
                </Text>
              )}
            </View>
            <View style={{height: 10}} />
            <View style={styles.subContainer}>
              <Text style={styles.calendarTitle}>Demain</Text>
              {tomorrowEvents.map(event => {
                return <CalendarWidgetEvent event={event} key={event.id} />;
              })}
              {tomorrowEvents.length == 0 && (
                <Text style={styles.calendarDataText}>
                  Pas d'événements prévus demain
                </Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
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
  subContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  container: {
    maxHeight: 300,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  calendarDataText: {
    fontSize: 14,
    color: 'black',
  },
});

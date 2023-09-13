import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {WidgetData} from '../utils/WidgetTypes';
import {store} from '../utils/GlobalStore';
import {TestWidget} from './TestWidget';
import { MeteoWidget } from './MeteoWidget';
import {getWidgetsFromStorage} from '../utils/WidgetFunctions';

export const WidgetContainerGap = (): JSX.Element => {
  return (
    <View style={{height: 100}}>
    </View>
  );
}

export const WidgetContainer = (): JSX.Element => {
  const widget = useSelector((state: any) => state.widget);

  useEffect(() => {
    getWidgetsFromStorage().then(widgets => {
      store.dispatch({
        type: 'widget/importWidgets',
        payload: widgets,
      });
    });
  }, []);

  return (
    <ScrollView style={styles.view}>
      {widget.items.map(
        (item: WidgetData) => (
          item.widgetType === 'TestWidget' && (
            <TestWidget data={item} key={item.key} />
          ),
          item.widgetType === 'MeteoWidget' && (
            <MeteoWidget data={item} key={item.key} />
          )
        )
      )}
      <WidgetContainerGap/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
});

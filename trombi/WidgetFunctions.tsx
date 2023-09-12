import {store} from './GlobalStore';
import {v4 as uuidv4} from 'uuid';
import {WidgetData} from './WidgetTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getWidgetsFromStorage = async (): Promise<WidgetData[]> => {
  const promise = new Promise<WidgetData[]>((resolve, _) => {
    AsyncStorage.getItem('widgets').then(value => {
      if (value === null) {
        resolve([]);
      } else {
        const widgets = JSON.parse(value);
        resolve(widgets);
      }
    });
  });
  return promise;
};

export const saveWidgetsToStorage = async (widgets: WidgetData[]) => {
  await AsyncStorage.setItem('widgets', JSON.stringify(widgets));
};

export const deleteWidgetsFromStorage = async () => {
  await AsyncStorage.removeItem('widgets');
};

export const addWidget = async (widgetType: string, widgetParams: any) => {
  const uuidg = uuidv4();
  store.dispatch({
    type: 'widget/addWidget',
    payload: {
      widgetType,
      key: uuidg,
      widgetParams,
    },
  });
  await saveWidgetsToStorage(store.getState().widget.items);
};

export const importWidgets = async (widgets: WidgetData[]) => {
  store.dispatch({
    type: 'widget/importWidgets',
    payload: widgets,
  });
};

export const moveWidget = async (key: string, direction: 'up' | 'down') => {
  store.dispatch({
    type: 'widget/moveWidget',
    payload: {
      key,
      direction,
    },
  });
  await saveWidgetsToStorage(store.getState().widget.items);
};

export const removeWidget = async (key: string) => {
  store.dispatch({
    type: 'widget/removeWidget',
    payload: key,
  });
  await saveWidgetsToStorage(store.getState().widget.items);
};

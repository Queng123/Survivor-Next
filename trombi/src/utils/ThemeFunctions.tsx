import {Appearance} from 'react-native';
import {store} from './GlobalStore';
import {ThemeData} from './ThemeTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchThemeFromLocalStorage = async (): Promise<ThemeData> => {
  const promise = new Promise<ThemeData>((resolve, reject) => {
    AsyncStorage.getItem('theme').then(value => {
      if (value === null) {
        reject('No theme found in local storage');
      } else {
        const theme = JSON.parse(value);
        resolve(theme);
      }
    });
  });
  return promise;
};

export const setThemeInLocalStorage = async (theme: ThemeData) => {
  AsyncStorage.setItem('theme', JSON.stringify(theme));
};

export const setGlobalTheme = (theme: ThemeData) => {
  Appearance.setColorScheme(theme.theme);
  setThemeInLocalStorage(theme);
  store.dispatch({type: 'theme/setThemeState', payload: theme});
};

export const getTheme = (): ThemeData => {
  const state = store.getState();
  return state.theme.theme;
};

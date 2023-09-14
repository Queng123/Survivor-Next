import {LanguageData} from './LanguageTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchLanguageFromLocalStorage =
  async (): Promise<LanguageData> => {
    const promise = new Promise<LanguageData>((resolve, reject) => {
      AsyncStorage.getItem('language').then(value => {
        if (value === null) {
          reject('No language found in local storage');
        } else {
          const language = JSON.parse(value);
          resolve(language);
        }
      });
    });
    return promise;
  };

export const setLanguageInLocalStorage = async (language: LanguageData) => {
  AsyncStorage.setItem('language', JSON.stringify(language));
};

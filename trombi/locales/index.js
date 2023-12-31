import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

export const supportedLanguages = ['en', 'fr'];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'fr',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

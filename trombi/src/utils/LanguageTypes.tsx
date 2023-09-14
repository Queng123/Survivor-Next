import {supportedLanguages} from '../../locales/index';

export type Language = (typeof supportedLanguages)[number];
export type LanguageData = {
  language: Language;
};

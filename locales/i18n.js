import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
// import moment from 'moment';

// Import all locales
import en from './en';
import ru from './ru';

i18n.locale = RNLanguages.language;
// Should the app fallback to English if user locale doesn't exists
i18n.fallbacks = true;

// Define the supported translations
i18n.translations = {
  en,
  ru,
};

// Is it a RTL language?
// export const isRTL = currentLocale.indexOf('ru') === 0;

// Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return i18n.t(name, params);
}

export function numbers(name, params) {
  return i18n.l(name, params);
}

export const currentLocale: string = i18n.currentLocale();

// if (currentLocale.indexOf('ru') === 0) {
//   require('moment/locale/ru.js'); // eslint-disable-line global-require
//   moment.locale(currentLocale);
// } else {
//   moment.locale('en');
// }

export default i18n;

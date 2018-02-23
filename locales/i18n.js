import I18n from 'react-native-i18n';
import moment from 'moment';

// Import all locales
import en from './en.json';
import ru from './ru.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  ru
};

// Is it a RTL language?
//export const isRTL = currentLocale.indexOf('ru') === 0;

// Allow RTL alignment in RTL languages
//ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export function numbers(name, params) {
  return I18n.l(name, params);
}

export const currentLocale = I18n.currentLocale();

// let languages = {
//   en:  require('../common/languages/en'),
//   ru: require('../common/languages/ru'),
//   de: require('../common/languages/de')
// }

// switch (currentLocale.indexOf(currentLocale.substring(0, 2)) === 0) {
//   case 'ru':
//     return require('moment/locale/ru.js');
//   case 'en':
//     return require('moment/locale/en.js');
//   // etc...
// }

if (currentLocale.indexOf('ru') === 0) {
  require('moment/locale/ru.js');
  moment.locale(currentLocale);
} else {
  moment.locale('en');
}

export default I18n;

// @flow
import {
  LANGUAGE_CHANGED,
  COUNTRY_CHANGED,
  COUNTRY_IP_TRIGGERED,
  SCREEN_ORIENTATION_CHANGED,
} from '../actions/types';
import type { SettingsActionsTypes as Action } from '../actions/types';
import { currentLocale } from '../../locales/i18n';

type State = {
  +language: number,
  +country: number,
  +countryIP: boolean,
  +isLandscape: boolean,
};

const pickerValue = (locale: string) => {
  if (locale.substring(0, 2) === 'ru') {
    return 0;
  }
  return 1;
};

const INITIAL_STATE: State = {
  language: pickerValue(currentLocale),
  country: pickerValue(currentLocale),
  countryIP: false,
  isLandscape: false,
};

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      return { ...state, language: action.payload };
    case COUNTRY_CHANGED:
      return { ...state, country: action.payload };
    case COUNTRY_IP_TRIGGERED:
      return { ...state, countryIP: action.payload };
    case SCREEN_ORIENTATION_CHANGED:
      return { ...state, isLandscape: action.payload };
    default:
      return state;
  }
};

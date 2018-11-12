// @flow

import { LANGUAGE_CHANGED, COUNTRY_CHANGED, COUNTRY_IP_TRIGGERED } from '../actions/types';
import type { SettingsActionsTypes } from '../actions/types';
import { currentLocale } from '../../locales/i18n';

type SettingsState = {
  language: number,
  country: number,
  countryIP: boolean,
};

const radioValue = (locale: string) => {
  if (locale === 'ru-RU') {
    return 0;
  }
  return 1;
};

const INITIAL_STATE: SettingsState = {
  language: radioValue(currentLocale),
  country: radioValue(currentLocale),
  countryIP: false,
};

export default (
  state: SettingsState = INITIAL_STATE,
  action: SettingsActionsTypes,
): SettingsState => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      return { ...state, language: action.payload };
    case COUNTRY_CHANGED:
      return { ...state, country: action.payload };
    case COUNTRY_IP_TRIGGERED:
      return { ...state, countryIP: action.payload };
    default:
      return state;
  }
};

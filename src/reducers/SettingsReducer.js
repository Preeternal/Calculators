// @flow

import { LANGUAGE_CHANGED, COUNTRY_CHANGED } from '../actions/types';
import type { SettingsActionsTypes } from '../actions/types';
import { currentLocale } from '../../locales/i18n';

type SettingsState = {
  language: number,
  country: any,
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
    default:
      return state;
  }
};

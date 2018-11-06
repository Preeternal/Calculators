// @flow

import { LANGUAGE_CHANGED } from '../actions/types';
import type { SettingsActionsTypes } from '../actions/types';
import { currentLocale } from '../../locales/i18n';

const radioValue = (locale: string) => {
  if (locale === 'ru-RU') {
    return 0;
  }
  return 1;
};

type SettingsState = {
  language: number,
};

const INITIAL_STATE: SettingsState = {
  language: radioValue(currentLocale),
};

export default (
  state: SettingsState = INITIAL_STATE,
  action: SettingsActionsTypes,
): SettingsState => {
  switch (action.type) {
    case LANGUAGE_CHANGED:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

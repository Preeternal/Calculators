// @flow
import { LANGUAGE_CHANGED } from './types';
import type { SettingsActionsTypes } from './types';

export const languageChanged = (text: number): SettingsActionsTypes => ({
  type: LANGUAGE_CHANGED,
  payload: text,
});

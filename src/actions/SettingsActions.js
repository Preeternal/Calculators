// @flow
import { LANGUAGE_CHANGED, COUNTRY_CHANGED, COUNTRY_IP_TRIGGERED } from './types';
import type { SettingsActionsTypes } from './types';

export const languageChanged = (value: number): SettingsActionsTypes => ({
  type: LANGUAGE_CHANGED,
  payload: value,
});

export const countryChanged = (value: number): SettingsActionsTypes => ({
  type: COUNTRY_CHANGED,
  payload: value,
});

export const countryIpTriggered = (value: boolean): SettingsActionsTypes => ({
  type: COUNTRY_IP_TRIGGERED,
  payload: value,
});

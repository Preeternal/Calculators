// @flow
import {
  LANGUAGE_CHANGED,
  COUNTRY_CHANGED,
  COUNTRY_IP_TRIGGERED,
  SCREEN_ORIENTATION_CHANGED,
} from './types';
import type { Action } from './types';

export const languageChanged = (value: number): Action => ({
  type: LANGUAGE_CHANGED,
  payload: value,
});

export const countryChanged = (value: number): Action => ({
  type: COUNTRY_CHANGED,
  payload: value,
});

export const countryIpTriggered = (value: boolean): Action => ({
  type: COUNTRY_IP_TRIGGERED,
  payload: value,
});

export const screenOrientationChanged = (value: boolean): Action => ({
  type: SCREEN_ORIENTATION_CHANGED,
  payload: value,
});

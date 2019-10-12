// @flow
import { PRESET_CHANGED, CURRENCIES_CHANGED, PRESET_CURRENCIES_CHANGED } from './types';
import type { Action } from './types';

export const presetChanged = (array: Array<string>): Action => ({
  type: PRESET_CHANGED,
  payload: array,
});

export const currenciesChanged = (array: Array<Object>): Action => ({
  type: CURRENCIES_CHANGED,
  payload: array,
});

export const presetCurrenciesChanged = (array: Array<Object>): Action => ({
  type: PRESET_CURRENCIES_CHANGED,
  payload: array,
});

// @flow
import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED,
  DATE_CLOSED_CHANGED,
  INTEREST1_CHANGED,
  INTEREST2_CHANGED,
  PLATEZ_CHANGED,
  PLUSPERIOD_CHANGED,
  PRINPLUS_CHANGED,
  RADIO_PRESSED,
  TAX_SELECTED,
  TAX_RATE_SELECTED,
} from './types';

import type { Action } from './types';

export const principalChanged = (text: string | null): Action => ({
  type: PRINCIPAL_CHANGED,
  payload: text,
});

export const dateOpenChanged = (date: Date): Action => ({
  type: DATE_OPEN_CHANGED,
  payload: date,
});

export const dateClosedChanged = (date: Date): Action => ({
  type: DATE_CLOSED_CHANGED,
  payload: date,
});

export const interest1Changed = (text: string): Action => ({
  type: INTEREST1_CHANGED,
  payload: text,
});

export const interest2Changed = (text: string): Action => ({
  type: INTEREST2_CHANGED,
  payload: text,
});

export const platezChanged = (value: number): Action => ({
  type: PLATEZ_CHANGED,
  payload: value,
});

export const plusperiodChanged = (value: number): Action => ({
  type: PLUSPERIOD_CHANGED,
  payload: value,
});

export const prinplusChanged = (text: string): Action => ({
  type: PRINPLUS_CHANGED,
  payload: text,
});

export const radioPressed = (value: number): Action => ({
  type: RADIO_PRESSED,
  payload: value,
});

export const taxSelected = (value: number): Action => ({
  type: TAX_SELECTED,
  payload: value,
});

export const taxRateSelected = (value: number): Action => ({
  type: TAX_RATE_SELECTED,
  payload: value,
});

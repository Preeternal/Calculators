//@flow
import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED,
  DATE_CLOSED_CHANGED,
  INTEREST1_CHANGED,
  INTEREST2_CHANGED,
  PLATEZ_CHANGED,
  PLUSPERIOD_CHANGED,
  PRINPLUS_CHANGED,
  RADIO_PRESSED
} from './types';

import type { FormActionsTypes } from './types';

export const principalChanged = (text: string | null): FormActionsTypes => {
  return {
    type: PRINCIPAL_CHANGED,
    payload: text
  };
};

export const dateOpenChanged = (text: string): FormActionsTypes => {
  return {
    type: DATE_OPEN_CHANGED,
    payload: text
  };
};

export const dateClosedChanged = (text: string): FormActionsTypes => {
  return {
    type: DATE_CLOSED_CHANGED,
    payload: text
  };
};

export const interest1Changed = (text: string): FormActionsTypes => {
  return {
    type: INTEREST1_CHANGED,
    payload: text
  };
};

export const interest2Changed = (text: string): FormActionsTypes => {
  return {
    type: INTEREST2_CHANGED,
    payload: text
  };
};

export const platezChanged = (value: number): FormActionsTypes => {
  return {
    type: PLATEZ_CHANGED,
    payload: value
  };
};

export const plusperiodChanged = (value: number): FormActionsTypes => {
  return {
    type: PLUSPERIOD_CHANGED,
    payload: value
  };
};

export const prinplusChanged = (text: string): FormActionsTypes => {
  return {
    type: PRINPLUS_CHANGED,
    payload: text
  };
};

export const radioPressed = (value: number): FormActionsTypes => {
  return {
    type: RADIO_PRESSED,
    payload: value
  };
};

// @flow
import {
  CREDIT_PRINCIPAL_CHANGED,
  CREDIT_INTEREST_CHANGED,
  CREDIT_DATE_OPEN_CHANGED,
  CREDIT_SROK_VALUE_CHANGED,
  CREDIT_SROK_OPTION_SELECTED,
  CREDIT_PLATEZ_SELECTED,
  CREDIT_EDIN_COM_VALUE_CHANGED,
  CREDIT_EDIN_COM_OPTION_SELECTED,
  CREDIT_START_COST_COM_CHANGED,
  CREDIT_FIN_COST_COM_CHANGED,
  CREDIT_AC_COUNT_COM_CHANGED,
} from './types';

import type { Action } from './types';

export const creditPrincipalChanged = (text: string): Action => ({
  type: CREDIT_PRINCIPAL_CHANGED,
  payload: text,
});

export const creditInterestChanged = (text: string): Action => ({
  type: CREDIT_INTEREST_CHANGED,
  payload: text,
});

export const creditDateOpenChanged = (date: Date): Action => ({
  type: CREDIT_DATE_OPEN_CHANGED,
  payload: date,
});

export const creditSrokValueChanged = (value: string): Action => ({
  type: CREDIT_SROK_VALUE_CHANGED,
  payload: value,
});

export const creditSrokOptionSelected = (option: number): Action => ({
  type: CREDIT_SROK_OPTION_SELECTED,
  payload: option,
});

export const creditPlatezSelected = (option: number): Action => ({
  type: CREDIT_PLATEZ_SELECTED,
  payload: option,
});

export const creditEdinComValueChanged = (value: string): Action => ({
  type: CREDIT_EDIN_COM_VALUE_CHANGED,
  payload: value,
});

export const creditEdinComOptionSelected = (option: number): Action => ({
  type: CREDIT_EDIN_COM_OPTION_SELECTED,
  payload: option,
});

export const creditStartCostComChanged = (value: string): Action => ({
  type: CREDIT_START_COST_COM_CHANGED,
  payload: value,
});

export const creditFinCostComChanged = (value: string): Action => ({
  type: CREDIT_FIN_COST_COM_CHANGED,
  payload: value,
});

export const creditAcCountComChanged = (value: string): Action => ({
  type: CREDIT_AC_COUNT_COM_CHANGED,
  payload: value,
});

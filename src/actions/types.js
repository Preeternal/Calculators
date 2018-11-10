// @flow

// Depo
export const PRINCIPAL_CHANGED = 'principal_changed';
export const DATE_OPEN_CHANGED = 'date_open_changed';
export const DATE_CLOSED_CHANGED = 'date_closed_changed';
export const INTEREST1_CHANGED = 'interest1_changed';
export const INTEREST2_CHANGED = 'interest2_changed';
export const PLATEZ_CHANGED = 'platez_changed';
export const PLUSPERIOD_CHANGED = 'plusperiod_changed';
export const PRINPLUS_CHANGED = 'prinplus_changed';
export const RADIO_PRESSED = 'radio_pressed';
export const TAX_SELECTED = 'tax_selected';
export const TAX_RATE_SELECTED = 'tax_rate_selected';
export type FormActionsTypes =
  | { type: 'principal_changed', payload: string | null }
  | { type: 'date_open_changed', payload: string }
  | { type: 'date_closed_changed', payload: string }
  | { type: 'interest1_changed', payload: string }
  | { type: 'interest2_changed', payload: string }
  | { type: 'platez_changed', payload: number }
  | { type: 'plusperiod_changed', payload: number }
  | { type: 'prinplus_changed', payload: string }
  | { type: 'radio_pressed', payload: number }
  | { type: 'tax_selected', payload: number }
  | { type: 'tax_rate_selected', payload: number };

// Settings
export const LANGUAGE_CHANGED = 'language_changed';
export const COUNTRY_CHANGED = 'country_changed';
export type SettingsActionsTypes =
  | { type: 'language_changed', payload: number }
  | { type: 'country_changed', payload: number };

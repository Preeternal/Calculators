// @flow
import {
  PRESET_CHANGED,
  CURRENCIES_CHANGED,
  PRESET_CURRENCIES_CHANGED,
} from '../actions/types';
import type { ConverterActionsTypes as Action } from '../actions/types';

export type Currency = {
  charCode: string,
  id: string,
  input: string,
  name: string,
  nameEng: string,
  nominal: number,
  updatedAt: string,
  value: number,
  __typename?: 'Currency',
};

type State = {
  +currencies: Currency[],
  +preset: Array<string>,
  +presetCurrencies: Array<Currency>,
};

const INITIAL_STATE: State = {
  preset: [
    'UAH',
    'RUB',
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'BYN',
    'BRL',
    'CAD',
  ],
  currencies: [],
  presetCurrencies: [],
};

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case PRESET_CHANGED:
      return { ...state, preset: action.payload };
    case CURRENCIES_CHANGED:
      return { ...state, currencies: action.payload };
    case PRESET_CURRENCIES_CHANGED:
      return { ...state, presetCurrencies: action.payload };
    default:
      return state;
  }
};

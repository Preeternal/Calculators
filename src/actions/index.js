import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED,
  DATE_CLOSED_CHANGED,
  INTEREST1_CHANGED
} from './types';

export const principalChanged = (text) => {
  return {
    type: PRINCIPAL_CHANGED,
    payload: text
  };
};

export const dateOpenChanged = (text) => {
  return {
    type: DATE_OPEN_CHANGED,
    payload: text
  };
};

export const dateClosedChanged = (text) => {
  return {
    type: DATE_CLOSED_CHANGED,
    payload: text
  };
};

export const interest1Changed = (text) => {
  return {
    type: INTEREST1_CHANGED,
    payload: text
  };
};

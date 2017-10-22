import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED
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

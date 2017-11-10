//import moment from 'moment';
import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED,
  DATE_CLOSED_CHANGED,
  INTEREST1_CHANGED,
  INTEREST2_CHANGED,
  PLATEZ_CHANGED,
  PLUSPERIOD_CHANGED
} from '../actions/types';

import { initDate } from '../components';

const nextYear = (d) => {
  //const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  return new Date(year + 1, month, day);
};

const INITIAL_STATE = {
  principal: '1000',
  dateOpen: initDate(new Date()),
  dateClosed: initDate(nextYear(new Date())),
  interest1: '7',
  interest2: '0',
  platez: '0',
  plusperiod: '0'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRINCIPAL_CHANGED:
      return { ...state, principal: action.payload };
    case DATE_OPEN_CHANGED:
      return { ...state, dateOpen: action.payload };
    case DATE_CLOSED_CHANGED:
      return { ...state, dateClosed: action.payload };
    case INTEREST1_CHANGED:
      return { ...state, interest1: action.payload };
    case INTEREST2_CHANGED:
      return { ...state, interest2: action.payload };
    case PLATEZ_CHANGED:
      return { ...state, platez: action.payload };
    case PLUSPERIOD_CHANGED:
      return { ...state, plusperiod: action.payload };
    default:
      return state;
  }
};

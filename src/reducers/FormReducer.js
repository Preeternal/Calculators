import {
  PRINCIPAL_CHANGED,
  DATE_OPEN_CHANGED
} from '../actions/types';

let today = new Date();
const DD = today.getDate() < 10 ? '0' : 0;
const MM = today.getMonth() < 9 ? '0' : 0;
today = `${DD + today.getDate()}.${MM + (today.getMonth() + 1)}.${today.getFullYear()}`;

const INITIAL_STATE = {
  principal: '1000',
  dateOpen: today
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRINCIPAL_CHANGED:
      return { ...state, principal: action.payload };
    case DATE_OPEN_CHANGED:
      return { ...state, dateOpen: action.payload };
    default:
      return state;
  }
};

// @flow
import 'number-to-locale-string';
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
} from '../actions/types';

import type { CreditActionsTypes as Action } from '../actions/types';

type State = {
  +creditPrincipal: string,
  +creditInterest: string,
  +creditDateOpen: number,
  +creditSrok: string,
  +creditSrokOption: number,
  +creditPlatez: number,
  +creditEdinCom: string,
  +creditEdinComOption: number,
  +creditStartCostCom: string,
  +creditFinCostCom: string,
  +creditAcCountCom: string,
};

const INITIAL_STATE: State = {
  creditPrincipal: (1000).toLocaleString('ru-RU'),
  creditInterest: '10',
  creditDateOpen: new Date().valueOf(),
  creditSrok: '12',
  creditSrokOption: 0,
  creditPlatez: 0,
  creditEdinCom: '0',
  creditEdinComOption: 0,
  creditStartCostCom: '0',
  creditFinCostCom: '0',
  creditAcCountCom: '0',
};

export default (state: State = INITIAL_STATE, action: Action): State => {
  // console.log(action.type);
  switch (action.type) {
    case CREDIT_PRINCIPAL_CHANGED:
      return { ...state, creditPrincipal: action.payload };
    case CREDIT_INTEREST_CHANGED:
      return { ...state, creditInterest: action.payload };
    case CREDIT_DATE_OPEN_CHANGED:
      return { ...state, creditDateOpen: action.payload };
    case CREDIT_SROK_VALUE_CHANGED:
      return { ...state, creditSrok: action.payload };
    case CREDIT_SROK_OPTION_SELECTED:
      return { ...state, creditSrokOption: action.payload };
    case CREDIT_PLATEZ_SELECTED:
      return { ...state, creditPlatez: action.payload };
    case CREDIT_EDIN_COM_VALUE_CHANGED:
      return { ...state, creditEdinCom: action.payload };
    case CREDIT_EDIN_COM_OPTION_SELECTED:
      return { ...state, creditEdinComOption: action.payload };
    case CREDIT_START_COST_COM_CHANGED:
      return { ...state, creditStartCostCom: action.payload };
    case CREDIT_FIN_COST_COM_CHANGED:
      return { ...state, creditFinCostCom: action.payload };
    case CREDIT_AC_COUNT_COM_CHANGED:
      return { ...state, creditAcCountCom: action.payload };
    default:
      return state;
  }
};

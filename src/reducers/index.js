// @flow
import { combineReducers } from 'redux';
import DepoReducer from './DepoReducer';
import CreditReducer from './CreditReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  depo: DepoReducer,
  credit: CreditReducer,
  settings: SettingsReducer,
});

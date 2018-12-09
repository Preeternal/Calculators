// @flow
import { combineReducers } from 'redux';
import DepoReducer from './DepoReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  depo: DepoReducer,
  settings: SettingsReducer,
});

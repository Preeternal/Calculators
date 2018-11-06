// @flow
import { combineReducers } from 'redux';
import FormReducer from './FormReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  form: FormReducer,
  settings: SettingsReducer,
});

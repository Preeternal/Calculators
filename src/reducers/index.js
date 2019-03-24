import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import DepoReducer from './DepoReducer';
import CreditReducer from './CreditReducer';
import SettingsReducer from './SettingsReducer';

const depoPersistConfig = {
  key: 'depo',
  storage,
  blacklist: ['dateOpen', 'dateClosed'],
};

const creditPersistConfig = {
  key: 'credit',
  storage,
  blacklist: ['creditDateOpen'],
};

const rootReducer = combineReducers({
  depo: persistReducer(depoPersistConfig, DepoReducer),
  credit: persistReducer(creditPersistConfig, CreditReducer),
  settings: SettingsReducer,
});

export default rootReducer;

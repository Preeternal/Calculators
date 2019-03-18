/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  // stateReconciler: autoMergeLevel2,
  // stateReconciler: hardSet,
  // blacklist: ['depo', 'credit'],
  whitelist: ['settings'],
  // debug: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  // reducers,
  persistedReducer,
  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line no-undef
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistor = persistStore(store);
// export default store;

export { store, persistor };

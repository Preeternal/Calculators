/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { composeWithDevTools } from 'redux-devtools-extension';

// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // stateReconciler: autoMergeLevel2,
  // stateReconciler: hardSet,
  // blacklist: ['depo', 'credit'],
  whitelist: ['converter', 'settings'],
  // debug: true,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeWithDevTools(),
  // __DEV__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const persistor = persistStore(store);

export { store, persistor };

/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line no-undef
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

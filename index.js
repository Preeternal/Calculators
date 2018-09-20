// import libraries
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {
  AppRegistry,
  // Text,
  ScrollView,
  //  StyleSheet
} from 'react-native';

import App from './App';
import { name as appName } from './app';
import reducers from './src/reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// export const subscribe = store.subscribe(() => {
//   return store.getState();
// });

const Start = () => (
  <Provider store={store}>
    <ScrollView>
      <App />
      {/* <Text> {'\n'} </Text> */}
    </ScrollView>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Start);

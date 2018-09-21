import React from 'react';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';

import { AppRegistry, ScrollView } from 'react-native';

import App from './App';
import { name as appName } from './app';
import store from './src/store';
// import reducers from './src/reducers';

// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

const Start = () => (
  <Provider store={store}>
    <ScrollView>
      <App />
    </ScrollView>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Start);

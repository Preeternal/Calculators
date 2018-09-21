import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, ScrollView } from 'react-native';

import App from './App';
import { name as appName } from './app';
import store from './src/store';

const Start = () => (
  <Provider store={store}>
    <ScrollView>
      <App />
    </ScrollView>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Start);

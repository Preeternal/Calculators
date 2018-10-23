import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import store from './src/store';
import Navigator from './src/screens';
import { name as appName } from './app';

const Start = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Start);

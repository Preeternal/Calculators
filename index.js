import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';

import { store, persistor } from './src/store';
import App from './src/screens';
import { name as appName } from './app';
import { Screen } from './src/components/common';

const Start = () => (
  <Provider store={store}>
    <PersistGate loading={<Screen />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Start)

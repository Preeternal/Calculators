import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry, YellowBox } from 'react-native';

import { ApolloProvider } from 'react-apollo';

import { store, persistor } from './src/store';
import client from './src/client';
import App from './src/screens';
import { name as appName } from './app';
import { Screen } from './src/components/common';

YellowBox.ignoreWarnings(['`-[RCTRootView cancelTouches]`']);

const Start = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={<Screen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Start);

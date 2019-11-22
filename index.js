import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';

import { ApolloProvider } from 'react-apollo';

import { store, persistor } from './src/store';
import client from './src/client';
import App from './src/screens';
import { name as appName } from './app';
import { Screen } from './src/components/common';

const Start = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={<Screen />} persistor={persistor}>
        {console.log(!!global.HermesInternal)}
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Start);

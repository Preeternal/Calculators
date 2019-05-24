import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';
import ApolloBoost from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { store, persistor } from './src/store';
import App from './src/screens';
import { name as appName } from './app';
import { Screen } from './src/components/common';

const client = new ApolloBoost({
  uri: 'https://aqueous-reef-98968.herokuapp.com/',
  // uri: 'http://127.0.0.1:4000',
});

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

//import libraries
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {
  AppRegistry,
  // Text,
  ScrollView
  //  StyleSheet
} from 'react-native';

import App from './App';
import reducers from './src/reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Start = () => (
  <Provider store={store}>
    <ScrollView>
      <App />
      {/* <Text> {'\n'} </Text> */}
    </ScrollView>
  </Provider>
);

// const styles = StyleSheet.create({
//   ViewStyle: {
//      flex: 1,
//      //justifyContent: 'space-around',
//      //alignItems: 'center',
//      backgroundColor: '#F5FCFF'
//    }
// });

AppRegistry.registerComponent('Calculators', () => Start);

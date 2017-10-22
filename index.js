// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('Calculators', () => App

//import libraries
import React, {
    //Component
} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {
    AppRegistry,
//    Text,
    ScrollView,
//  StyleSheet
} from 'react-native';

//import Button from 'react-native-button';

import App from './App';
import reducers from './src/reducers';


const store = createStore(reducers);

const Start = () => (
      <Provider store={store}>
      <ScrollView>
        <App />

        {/* <Text> {'\n'} </Text> */}
        {/* <One hello={helloEN} /> */}
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

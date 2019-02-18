import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import store from './src/store';
import App from './src/screens';
import { name as appName } from './app';

class Start extends PureComponent {
  componentDidMount() {
    RNLanguages.addEventListener('change', this.handleLanguageChange);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this.handleLanguageChange);
  }

  handleLanguageChange = ({ language }) => {
    i18n.locale = language;
  };

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Start);

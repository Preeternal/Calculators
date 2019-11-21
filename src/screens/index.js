// @flow
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  getActiveChildNavigationOptions,
} from 'react-navigation';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import 'number-to-locale-string';

import Depo from './Depo';
import Credit from './Credit';
import Converter from './Converter';
import AddCurrency from './Converter/AddCurrency';
import EditPreset from './Converter/EditPreset';
import Settings from './Settings';
import Help from './Help';
import DrawerScreen from './Common/DrawerScreen';
import { languageChanged } from '../actions';
import storeCurrencies from '../lib/storeCurrencies';

const ConverterStack = createStackNavigator(
  {
    Converter,
    AddCurrency,
    EditPreset,
  },
  {
    mode: 'modal',
    // headerMode: 'none',
    headerMode: 'float',
  },
);

const Navigator = createDrawerNavigator(
  {
    Depo,
    Credit,
    ConverterStack: {
      screen: ConverterStack,
      // navigationOptions: {
      //   title: strings('converter.header'), // drawer label initialization
      //   drawerLabel: navigation.state.params && navigation.state.params.DLabel,
      //   drawerIcon: ({ tintColor }) => (
      //     <Icon type="FontAwesome" name="retweet" style={{ fontSize: 22, color: tintColor }} />
      //   ),
      // },
      navigationOptions: ({ navigation, screenProps }) => ({
        // you can put fallback values before here, eg: a default tabBarLabel
        ...getActiveChildNavigationOptions(navigation, screenProps),
        // put other navigationOptions that you don't want the active child to
        // be able to override here!
      }),
    },
    // Converter,
    Settings,
    Help,
  },
  {
    initialRouteName: 'Depo',
    // initialRouteName: 'ConverterStack',
    contentComponent: DrawerScreen,
    drawerWidth: 300,
    overlayColor: 'rgba(52, 52, 52, 0.5)',
    // drawerBackgroundColor: 'transparent',
    // unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#525050',
    },
  },
);

// const DepoStack = createStackNavigator(
//   {
//     Depo,
//     // Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       drawerLabel: strings('header'),
//       drawerIcon: ({ tintColor }) => (
//         <Icon type="Entypo" name="wallet" style={{ fontSize: 24, color: tintColor }} />
//       ),
//     },
//   },
// );

// const CreditStack = createStackNavigator(
//   {
//     Credit,
//     // Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       drawerLabel: strings('headerCredit'),
//       drawerIcon: ({ tintColor }) => (
//     import 'number-to-locale-string';ad" style={{ fontSize: 24, color: tintColor }} />
//     import 'number-to-locale-string';
//     import 'number-to-locale-string';
//   },import 'number-to-locale-string';
// );

// const SettingsStack = createStackNavigator(
//   {
//     Settings,
//     // Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       // headerTitle: strings('settings.settings'),
//       title: strings('settings.settings'),
//       drawerLabel: strings('settings.settings'), // Settings
//       drawerIcon: ({ tintColor }) => (
//         <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
//       ),
//     },
//   },
// );

// const Navigator = createDrawerNavigator(
//   {
//     DepoStack,
//     CreditStack,
//     SettingsStack,
//   },
//   {
//     // initialRouteName: 'Depo',
//     contentComponent: DrawerScreen,
//     drawerWidth: 300,
//     contentOptions: {
//       activeTintColor: '#000000',
//       inactiveTintColor: '#525050',
//     },
//   },
// );

const AppContainer = createAppContainer(Navigator);

type Props = {
  language: string,
  languageChanged: Function,
};

class App extends Component<Props> {
  componentDidMount() {
    RNLanguages.addEventListener('change', this.handleLanguageChange);
    storeCurrencies();
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this.handleLanguageChange);
  }

  handleLanguageChange = ({ language }: { language: string }) => {
    i18n.locale = language;
    if (this.props.language !== this.pickerValue(i18n.currentLocale())) {
      this.props.languageChanged(this.pickerValue(i18n.currentLocale()));
    }
  };

  pickerValue = (locale: string) => {
    if (locale.substring(0, 2) === 'ru') {
      return 0;
    }
    return 1;
  };

  // getLocalInput = input => {
  //   const minimumFractionDigits =
  //     Math.ceil(Number(input)) !== Number(input) ? 2 : 0;
  //   return Number(number(`${input}`)).toLocaleString('ru-RU', {
  //     minimumFractionDigits,
  //     maximumFractionDigits: minimumFractionDigits,
  //   });
  // };

  render() {
    // console.log(new Date().getTimezoneOffset());
    return <AppContainer />;
  }
}

const mapStateToProps = state => ({
  language: state.settings.language,
});
const mapDispatchToActions = { languageChanged };

export default connect<any, any, any, any, any, any>(
  mapStateToProps,
  mapDispatchToActions,
)(App);

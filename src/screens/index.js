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
// import { Icon } from 'native-base';
import i18n from 'i18n-js';

import Depo from './Depo';
import Credit from './Credit';
import Converter from './Converter';
import AddCurrency from './Converter/AddCurrency';
import Settings from './Settings';
import Help from './Help';
import DrawerScreen from './Common/DrawerScreen';
import { languageChanged } from '../actions';
// import { strings } from '../../locales/i18n';

const ConverterStack = createStackNavigator(
  {
    Converter,
    AddCurrency,
  },
  {
    mode: 'modal',
    headerMode: 'none',
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
    initialRouteName: 'ConverterStack',
    contentComponent: DrawerScreen,
    drawerWidth: 300,
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
//         <Icon name="md-download" style={{ fontSize: 24, color: tintColor }} />
//       ),
//     },
//   },
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
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this.handleLanguageChange);
  }

  handleLanguageChange = ({ language }) => {
    i18n.locale = language;
    if (this.props.language !== this.pickerValue(i18n.currentLocale())) {
      this.props.languageChanged(this.pickerValue(i18n.currentLocale()));
    }
  };

  pickerValue = (locale) => {
    if (locale.substring(0, 2) === 'ru') {
      return 0;
    }
    return 1;
  };

  render() {
    return <AppContainer />;
  }
}

const mapStateToProps = state => ({ language: state.settings.language });
const mapDispatchToActions = { languageChanged };

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(App);

// @flow
import React, { Component } from 'react';
import {
  NavigationContainer,
  createAppContainer,
  getActiveChildNavigationOptions,
} from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
// import { createCompatNavigatorFactory } from '@react-navigation/compat';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import { Icon } from 'native-base';
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
import { strings } from '../../locales/i18n';

enableScreens();

const Stack = createStackNavigator();

const ConverterStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Converter"
      // screenOptions={{ gestureEnabled: false }}
      mode="modal"
      // headerMode: 'none',
      headerMode="float"
    >
      <Stack.Screen
        name="Converter"
        component={Converter}
        // options={{ title: 'My app' }}
      />
      <Stack.Screen
        name="AddCurrency"
        component={AddCurrency}
        // initialParams={{ user: 'me' }}
      />
      <Stack.Screen
        name="EditPreset"
        component={EditPreset}
        // initialParams={{ user: 'me' }}
      />
    </Stack.Navigator>
  );
};

// const ConverterStack = createCompatNavigatorFactory(createStackNavigator)(
//   {
//     Converter,
//     AddCurrency,
//     EditPreset,
//   },
//   {
//     mode: 'modal',
//     // headerMode: 'none',
//     headerMode: 'float',
//   },
// );

// const Navigator = createDrawerNavigator(
//   {
//     Depo,
//     Credit,
//     ConverterStack: {
//       screen: ConverterStack,
//       // navigationOptions: {
//       //   title: strings('converter.header'), // drawer label initialization
//       //   drawerLabel: navigation.state.params && navigation.state.params.DLabel,
//       //   drawerIcon: ({ tintColor }) => (
//       //     <Icon type="FontAwesome" name="retweet" style={{ fontSize: 22, color: tintColor }} />
//       //   ),
//       // },
//       navigationOptions: ({ navigation, screenProps }) => ({
//         // you can put fallback values before here, eg: a default tabBarLabel
//         ...getActiveChildNavigationOptions(navigation, screenProps),
//         // put other navigationOptions that you don't want the active child to
//         // be able to override here!
//       }),
//     },
//     // Converter,
//     Settings,
//     Help,
//   },
//   {
//     initialRouteName: 'Depo',
//     // initialRouteName: 'ConverterStack',
//     contentComponent: DrawerScreen,
//     drawerWidth: 300,
//     overlayColor: 'rgba(52, 52, 52, 0.5)',
//     // drawerBackgroundColor: 'transparent',
//     // unmountInactiveRoutes: true,
//     contentOptions: {
//       activeTintColor: '#000000',
//       inactiveTintColor: '#525050',
//       labelStyle: {
//         fontFamily: 'Ubuntu',
//         fontWeight: '700',
//         // fontStyle: 'italic'
//       },
//     },
//   },
// );

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Depo"
      drawerContent={DrawerScreen}
      drawerContentOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#525050',
        labelStyle: {
          fontFamily: 'Ubuntu',
          fontWeight: '700',
          // fontStyle: 'italic'
        },
      }}
      // minSwipeDistance={300}
      drawerStyle={
        {
          // backgroundColor: '#c6cbef',
          // width: 300,
        }
      }
      // overlayColor="rgba(52, 52, 52, 0.5)"
      // hideStatusBar
    >
      <Drawer.Screen
        name="Depo"
        component={Depo}
        options={{
          title: strings('header'),
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              type={focused ? 'Entypo' : 'FontAwesome5'}
              name="wallet"
              style={{ fontSize: focused ? size + 2 : size, color }}
            />
          ),
        }}
      />
      <Drawer.Screen name="Credit" component={Credit} />
      <Drawer.Screen name="Converter" component={ConverterStack} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
};

// const AppContainer = createAppContainer<any, any>(Navigator);
const AppContainer = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

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

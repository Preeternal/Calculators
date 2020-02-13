// @flow
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import Settings, { LocalizationContext } from './Settings';
import Help from './Help';
import DrawerScreen from './Common/DrawerScreen';
import { languageChanged } from '../actions';
import storeCurrencies from '../lib/storeCurrencies';
import { strings, currentLocale } from '../../locales/i18n';

enableScreens();
const styles = {
  headerStyle: {
    backgroundColor: '#525050',
  },
  headerTitleStyle: {
    fontFamily: 'Ubuntu',
    color: '#ffffff',
    fontSize: 18,
  },
  headerTintColor: '#fff',
};
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const ConverterStack = () => {
  const { headerStyle, headerTitleStyle, headerTintColor } = styles;
  return (
    <Stack.Navigator
      initialRouteName="Converter"
      // screenOptions={{ gestureEnabled: false }}
      // mode="modal"
      // headerMode="none"
      // headerMode="float"
    >
      <Stack.Screen
        name="Converter"
        component={Converter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCurrency"
        component={AddCurrency}
        options={{
          title: strings('converter.addCurrency'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
        }}
      />

      <Stack.Screen
        name="EditPreset"
        component={EditPreset}
        options={{
          title: strings('converter.changeCurr'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
        }}
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

const iconStyle = (focused, color, size) => ({
  textAlign: 'center',
  width: 30,
  fontSize: size,
  color: focused ? color : 'gray',
});

const Navigator = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  console.log('locale', locale);
  console.log(t('headerDeposit'));
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
        },
        itemStyle: {
          // alignSelf: 'flex-end', justifyContent: 'flex-end'
          // flex: 1,
        },
      }}
      // minSwipeDistance={300}
      drawerStyle={
        {
          // marginTop: 10,
          // backgroundColor: '#c6cbef',
          // width: 300.5,
        }
      }
      // style={{ marginTop: 10 }}
      // overlayColor="rgba(52, 52, 52, 0.5)"
      // hideStatusBar
    >
      <Drawer.Screen
        name="Depo"
        component={Depo}
        options={({ route }) => ({
          title: strings('headerDeposit'),
          drawerLabel: route.params && route.params.DLabel,
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              // type={focused ? 'Entypo' : 'FontAwesome5'}
              type="Entypo"
              name="wallet"
              style={iconStyle(focused, color, size)}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Credit"
        component={Credit}
        options={({ route }) => ({
          title: strings('headerCredit'),
          drawerLabel: route.params && route.params.DLabel,
          drawerIcon: ({ focused, color, size }) => (
            <Icon name="md-download" style={iconStyle(focused, color, size)} />
          ),
        })}
      />
      <Drawer.Screen
        name="Converter"
        component={ConverterStack}
        options={({ route }) => ({
          title: strings('converter.header'),
          drawerLabel: route.params && route.params.DLabel,
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              type="FontAwesome"
              name="retweet"
              style={iconStyle(focused, color, size - 2)}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          title: strings('settings.settings'),
          drawerLabel: route.params && route.params.DLabel,
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="md-settings"
              style={iconStyle(focused, color, size - 2)}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={({ route }) => ({
          title: strings('help.header'),
          drawerLabel: route.params && route.params.DLabel,
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name="md-help-circle"
              style={iconStyle(focused, color, size - 2)}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

// const AppContainer = createAppContainer<any, any>(Navigator);

const AppContainer = () => {
  const [locale, setLocale] = React.useState(currentLocale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  );
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </LocalizationContext.Provider>
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
    console.log('language', language);
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
    // key={this.props.language} />;
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

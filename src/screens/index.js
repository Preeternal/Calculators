// @flow
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
import { DrawerButton, DrawerScreen } from './Common';
import { languageChanged } from '../actions';
import storeCurrencies from '../lib/storeCurrencies';
import { store } from '../store';
import { LocalizationContext } from '../Context';

enableScreens();
const styles = {
  headerStyle: {
    backgroundColor: '#525050',
  },
  headerTitleStyle: {
    fontFamily: 'Ubuntu',
    color: '#ffffff',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  headerTintColor: '#fff',
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
  headerRightContainerStyle: {
    marginRight: 20,
  },
};
const Stack = createStackNavigator();

const DepoStack = ({ navigation }) => {
  const {
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeftContainerStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);
  return (
     <SafeAreaView
        style={{ flex: 1, backgroundColor: '#525050' }}
        forceInset={{ top: 'always', horizontal: 'never' }}
      > 
    <Stack.Navigator>
      <Stack.Screen
        name="Depo"
        component={Depo}
        options={() => ({
          title: t('titleDeposit'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerLeftContainerStyle,
          headerStatusBarHeight: 23,
          headerLeft: () => <DrawerButton onPress={navigation.openDrawer} />,
        })}
      />
    </Stack.Navigator>
    </SafeAreaView>
  );
};

const CreditStack = ({ navigation }) => {
  const {
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeftContainerStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Credit"
        component={Credit}
        options={() => ({
          title: t('titleCredit'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerLeftContainerStyle,
          headerStatusBarHeight: 23,
          headerLeft: () => <DrawerButton onPress={navigation.openDrawer} />,
        })}
      />
    </Stack.Navigator>
  );
};

const ConverterStack = ({ navigation }) => {
  const {
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeftContainerStyle,
    headerRightContainerStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);
  return (
    <Stack.Navigator initialRouteName="Converter">
      <Stack.Screen
        name="Converter"
        component={Converter}
        options={{
          title: t('converter.title'),
          headerLargeTitle: true,
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerLeftContainerStyle,
          headerRightContainerStyle,
          headerStatusBarHeight: 23,
          headerLeft: () => <DrawerButton onPress={navigation.openDrawer} />,
          headerRight: () => (
            <DrawerButton
              name="md-create"
              onPress={() => navigation.navigate('EditPreset')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddCurrency"
        component={AddCurrency}
        options={options => ({
          title: t('converter.addCurrency'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerLeftContainerStyle,
          headerStatusBarHeight: 23,
          headerLeft: () => (
            <DrawerButton name="md-close" onPress={options.navigation.goBack} />
          ),
        })}
      />
      <Stack.Screen
        name="EditPreset"
        component={EditPreset}
        options={{
          title: t('converter.changeCurr'),
          // headerBackTitle: '',
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerStatusBarHeight: 23,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = ({ navigation }) => {
  const {
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeftContainerStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          title: t('settings.settings'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerLeftContainerStyle,
          headerStatusBarHeight: 23,
          headerLeft: () => <DrawerButton onPress={navigation.openDrawer} />,
        })}
      />
    </Stack.Navigator>
  );
};

const HelpStack = ({ navigation }) => {
  const {
    headerStyle,
    headerTitleStyle,
    headerTintColor,
    headerLeftContainerStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Help"
        component={Help}
        options={() => ({
          title: t('help.header'),
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerLeftContainerStyle,
          headerStatusBarHeight: 23,
          headerLeft: () => <DrawerButton onPress={navigation.openDrawer} />,
        })}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const iconStyle = (focused, color, size) => ({
  textAlign: 'center',
  width: 30,
  fontSize: size,
  color: focused ? color : '#757171',
});

const Navigator = () => {
  const { t } = React.useContext(LocalizationContext);
  return (
    <>
      {/* <SafeAreaView
        style={{ flex: 1 }}
        forceInset={{ top: 'always', horizontal: 'never' }}
      > */}
      <StatusBar animated translucent backgroundColor="rgba(0, 0, 0, 0)" />
      <Drawer.Navigator
        initialRouteName="DepoStack"
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
      >
        <Drawer.Screen
          name="DepoStack"
          component={DepoStack}
          options={({ route }) => ({
            title: t('headerDeposit'),
            drawerLabel: route.params && route.params.DLabel,
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                type="Entypo"
                name="wallet"
                style={iconStyle(focused, color, size)}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="CreditStack"
          component={CreditStack}
          options={() => ({
            title: t('headerCredit'),
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                name="md-download"
                style={iconStyle(focused, color, size)}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="ConverterStack"
          component={ConverterStack}
          options={() => ({
            title: t('converter.header'),
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
          name="SettingsStack"
          component={SettingsStack}
          options={() => ({
            title: t('settings.settings'),
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                name="md-settings"
                style={iconStyle(focused, color, size - 2)}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="HelpStack"
          component={HelpStack}
          options={() => ({
            title: t('help.header'),
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                name="md-help-circle"
                style={iconStyle(focused, color, size - 2)}
              />
            ),
          })}
        />
      </Drawer.Navigator>
      {/* </SafeAreaView> */}
    </>
  );
};

const AppContainer = () => {
  const selectLanguage = state => state.settings.language;
  const language = selectLanguage(store.getState());
  const reduxLocale = language === 0 ? 'ru' : 'en';
  const [locale, setLocale] = React.useState(reduxLocale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  );
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#525050" />
      <LocalizationContext.Provider value={localizationContext}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </LocalizationContext.Provider>
    </SafeAreaProvider>
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

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
import { gql } from 'apollo-boost';
import { DateTime } from 'luxon';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import 'number-to-locale-string';

import Depo from './Depo';
import Credit from './Credit';
import Converter from './Converter';
import AddCurrency from './Converter/AddCurrency';
import EditPreset from './Converter/EditPreset';
import Settings from './Settings';
import Help from './Help';
import DrawerScreen from './Common/DrawerScreen';
import { languageChanged, currenciesChanged } from '../actions';
import client from '../client';
import { number } from '../lib';
import parseXML from '../lib/parseXML';

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
  currenciesChanged: Function,
  currencies: Object,
};

const dailyUrl = 'https://www.cbr.ru/scripts/XML_daily.asp';
const dailyEnUrl = 'https://www.cbr.ru/scripts/XML_daily_eng.asp';

class App extends Component<Props> {
  componentDidMount() {
    RNLanguages.addEventListener('change', this.handleLanguageChange);
    client
      .query({
        query: getCurrencies,
      })
      .then((response) => {
        const currenciesWithInputField = response.data.currencies.map((currency) => {
          const curr = { ...currency };
          curr.input = this.getLocalInput(curr.nominal / curr.value);
          return curr;
        });
        const dt = DateTime.fromISO(currenciesWithInputField[0].updatedAt);
        // if (dt.minus({ hours: 1 }).toMillis() > dt.toMillis()) {
        // parseXML().then(x => console.log(x));
        // (async function () {
        //   const accessToken = await parseXML();
        //   console.log(accessToken);
        // }());
        // console.log(newReq);
        parseXML();
        // }
        // console.log(response);

        // axios({
        //   method: 'get',
        //   url: dailyUrl,
        //   responseType: 'arraybuffer',
        // })
        //   .then((res) => {
        //     const result = iconv.decode(Buffer.from(res.data), 'windows-1251');
        //     parseString(result, (err, data) => {
        //       currenciesWithInputField = data.ValCurs.Valute.map((element) => {
        //         const charCode = element.CharCode[0];
        //         const name = element.Name[0];
        //         const nominal = element.Nominal[0];
        //         const updatedAt = new Date().toJSON();
        //         const value = Number(
        //           element.Value[0].match(',')
        //             ? element.Value[0].replace(',', '.')
        //             : element.Value[0],
        //         );
        //         return {
        //           charCode,
        //           name,
        //           nominal,
        //           updatedAt,
        //           value,
        //         };
        //       });
        //       if (this.props.currencies.length === 35 && !!this.props.currencies[1].nameEng) {
        //         console.log(!!this.props.currencies[1].nameEng);
        //       }
        //       this.onCurrencyChange([
        //         {
        //           charCode: 'RUB',
        //           id: '1',
        //           input: 1,
        //           name: 'Российский рубль',
        //           nameEng: 'Russian ruble',
        //           nominal: 1,
        //           updatedAt: currenciesWithInputField[0].updatedAt,
        //           value: 1,
        //           __typename: 'Currency',
        //         },
        //         ...currenciesWithInputField,
        //       ]);
        //       // return parsed;
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        this.onCurrencyChange([
          {
            charCode: 'RUB',
            id: '1',
            input: 1,
            name: 'Российский рубль',
            nameEng: 'Russian ruble',
            nominal: 1,
            updatedAt: currenciesWithInputField[0].updatedAt,
            value: 1,
            __typename: 'Currency',
          },
          ...currenciesWithInputField,
        ]);
        // console.log(this.props.currencies);
      })
      .catch((err) => {
        console.log(err);
      });
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

  pickerValue = (locale: string) => {
    if (locale.substring(0, 2) === 'ru') {
      return 0;
    }
    return 1;
  };

  onCurrencyChange = (array) => {
    this.props.currenciesChanged(array);
  };

  getLocalInput = (input) => {
    const minimumFractionDigits = Math.ceil(Number(input)) !== Number(input) ? 2 : 0;
    return Number(number(`${input}`)).toLocaleString('ru-RU', {
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
    });
  };

  render() {
    console.log(this.props.currencies);
    // console.log(new Date().getTimezoneOffset());
    return <AppContainer />;
  }
}

const mapStateToProps = state => ({
  language: state.settings.language,
  currencies: state.converter.currencies,
});
const mapDispatchToActions = { languageChanged, currenciesChanged };

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(App);

const getCurrencies = gql`
  query {
    currencies {
      id
      name
      nameEng
      charCode
      value
      nominal
      updatedAt
    }
  }
`;

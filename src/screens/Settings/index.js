// @flow
import React, { Component, Fragment } from 'react';
import { ScrollView, Platform, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, Button } from 'native-base';
import i18n from 'i18n-js';
import * as RNIap from 'react-native-iap';
import 'number-to-locale-string';
import type { NavigationDrawerScreenOptions } from 'react-navigation';

import { languageChanged, countryChanged } from '../../actions';
import {
  InputPicker,
  Card,
  Header,
  TableSection,
  CardSection,
} from '../../components/common';
import { strings } from '../../../locales/i18n';
import CustomHeader from '../Common/CustomHeader';

type Props = {
  navigation: Object,
  language: number,
  country: number,
  languageChanged: Function,
  countryChanged: Function,
};

type State = {
  iapConnection: boolean,
  products: Array<Object>,
  purchased: boolean,
};

const prodItems = Platform.select({
  android: [
    'android.banoka.donat1',
    'android.banoka.donat2',
    'android.banoka.donat3',
    // 'android.test.purchased',
  ],
});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;

class Settings extends Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: Object): NavigationDrawerScreenOptions => {
    const { params } = navigation.state;
    return {
      title: strings('settings.settings'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
      ),
    };
  };

  state = {
    iapConnection: false,
    products: [],
    purchased: false,
  };

  // no need to preset drawer label because we define title in navigationOptions
  // componentWillMount() {
  //   this.props.navigation.setParams({ DLabel: strings('settings.settings') });
  // }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      RNIap.initConnection();
      // if (purchaseUpdateSubscription) {
      //   purchaseUpdateSubscription.remove();
      //   purchaseUpdateSubscription = null;
      // }
      // if (purchaseErrorSubscription) {
      //   console.log(purchaseErrorSubscription);
      //   purchaseErrorSubscription.remove();
      //   purchaseErrorSubscription = null;
      // }
      // purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(purchase => {
      //   // console.log('purchaseUpdatedListener', purchase);
      //   console.log(this.state.products);
      //   console.log(this.state.products.length);
      //   if (purchase.transactionReceipt && this.state.products.length) {
      //     // this.setState(prevState => ({
      //     //   products: prevState.products.filter(
      //     //     product => purchase.productId !== product.productId,
      //     //   ),
      //     //   purchased: true,
      //     // }));
      //   }
      // });
      // purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
      //   console.log('purchaseErrorListener', error);
      //   Alert.alert('purchase error', JSON.stringify(error));
      // });
      try {
        const iapConnection = await RNIap.initConnection();
        const products = await RNIap.getProducts(prodItems);
        const purchases = await RNIap.getAvailablePurchases();
        if (purchases.length) {
          // await RNIap.consumeAllItemsAndroid(); did not work as expected, need to open issue
          purchases.map(async purchase => {
            await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
          });
        }
        this.setState({ iapConnection, products });
      } catch (err) {
        console.warn(err.code, err.message);
        // throw new Error('Ошибка');
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.language !== prevProps.language) {
      this.props.navigation.setParams({ DLabel: strings('settings.settings') });
      const setDepoLabel = NavigationActions.setParams({
        params: { DLabel: strings('header') },
        key: 'Depo',
      });
      this.props.navigation.dispatch(setDepoLabel);
      const setCreditLabel = NavigationActions.setParams({
        params: { DLabel: strings('headerCredit') },
        key: 'Credit',
      });
      this.props.navigation.dispatch(setCreditLabel);
      const setConverterLabel = NavigationActions.setParams({
        params: { DLabel: strings('converter.header') },
        key: 'ConverterStack',
      });
      this.props.navigation.dispatch(setConverterLabel);
      const setHelpLabel = NavigationActions.setParams({
        params: { DLabel: strings('help.header') },
        key: 'Help',
      });
      this.props.navigation.dispatch(setHelpLabel);
      // const screens = ['Depo', 'Credit', 'Help', 'Settings'];
      // screens.forEach(this.resetScreens);
    }
  }

  componentWillUnmount() {
    if (this.state.iapConnection) {
      RNIap.endConnection();
    }
  }

  // resetScreens = (screen) => {
  //   const action = NavigationActions.navigate({
  //     routeName: screen,
  //     params: {},
  //     // action: NavigationActions.init(),
  //     action: this.forceUpdate(),
  //   });
  //   this.props.navigation.dispatch(action);
  // };

  buyItem = async (sku: string) => {
    try {
      await RNIap.requestPurchase(sku);
      purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(purchase => {
        // console.log('purchaseUpdatedListener', purchase);
        console.log(this.state.products);
        console.log(this.state.products.length);
        if (purchase.transactionReceipt && this.state.products.length) {
          this.setState(prevState => ({
            products: prevState.products.filter(
              product => purchase.productId !== product.productId,
            ),
            purchased: true,
          }));
        }
      });
    } catch (err) {
      console.warn(err.code, err.message);
      purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      });
    }
  };

  onLanguageChange = (value: number) => {
    this.props.languageChanged(value);
    i18n.locale = value === 0 ? 'ru' : 'en';
  };

  onCountryChange = (value: number) => {
    this.props.countryChanged(value);
  };

  render() {
    console.log(this.state.iapConnection);
    return (
      <Fragment>
        <CustomHeader
          // title="Settings"
          title={strings('settings.settings')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Локальные данные" /> */}
            <Header headerText={strings('settings.localization')} />
            <TableSection>
              <InputPicker
                // label="Язык"
                label={strings('settings.language')}
                options={['русский', 'english']}
                selectedValue={this.props.language}
                onValueChange={this.onLanguageChange}
              />
              <InputPicker
                // label="Страна"
                label={strings('settings.country')}
                options={['Россия', 'Other', 'Украина']}
                selectedValue={this.props.country}
                onValueChange={this.onCountryChange}
              />
            </TableSection>
          </Card>
          {Platform.OS === 'android' &&
            this.state.iapConnection &&
            this.state.products && (
              <Card>
                <Header headerText={strings('settings.donat.header')} />
                {this.state.purchased && (
                  <CardSection>
                    <Text
                      style={{ fontSize: 17, margin: 10, textAlign: 'center' }}
                    >
                      {strings('settings.donat.thanks')}
                    </Text>
                  </CardSection>
                )}
                {this.state.products.map((product, i) => (
                  <CardSection key={i.toString()}>
                    <Text
                      style={{
                        marginTop: 10,
                        textAlign: 'center',
                      }}
                    >
                      {`${strings('settings.donat.header')} ${strings(
                        'settings.donat.for',
                      )} ${product.localizedPrice}`}
                    </Text>
                    <Button
                      rounded
                      // block
                      onPress={() => this.buyItem(product.productId)}
                      style={{
                        marginTop: 10,
                        paddingLeft: 5,
                        paddingRight: 5,
                        alignSelf: 'center',
                        backgroundColor: '#525050',
                      }}
                    >
                      <Icon type="FontAwesome5" name="donate" />
                      <Text style={{ color: 'white' }}>
                        {product.localizedPrice}
                      </Text>
                    </Button>
                  </CardSection>
                ))}
              </Card>
            )}
        </ScrollView>
      </Fragment>
    );
  }
}

Settings.propTypes = {
  language: PropTypes.number,
  country: PropTypes.number,
};

const mapStateToProps = state => ({
  language: state.settings.language,
  country: state.settings.country,
});
export default connect<any, any, any, any, any, any>(
  mapStateToProps,
  {
    languageChanged,
    countryChanged,
  },
)(Settings);

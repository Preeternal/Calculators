import React, { Component, Fragment } from 'react';
import {
  ScrollView, Platform, Text, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, Button } from 'native-base';
import i18n from 'i18n-js';
import * as RNIap from 'react-native-iap';
import 'number-to-locale-string';

import { languageChanged, countryChanged } from '../../actions';
import {
  InputPicker, Card, Header, TableSection, CardSection,
} from '../../components/common';
import { strings } from '../../../locales/i18n';
import CustomHeader from '../Common/CustomHeader';

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

class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
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
    receipt: '',
  };

  // no need to preset drawer label because we define title in navigationOptions
  // componentWillMount() {
  //   this.props.navigation.setParams({ DLabel: strings('settings.settings') });
  // }

  componentWillMount() {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }


  async componentDidMount() {
    if (Platform.OS === 'android') {
      purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
        console.log('purchaseUpdatedListener', purchase);
        // this.setState({ receipt: purchase.transactionReceipt }, () => this.goNext());
      });
      purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      });
      // console.log(this.state.receipt);
      try {
        const iapConnection = await RNIap.initConnection();
        await RNIap.consumeAllItemsAndroid();
        const products = await RNIap.getProducts(prodItems);
        // const purchases = await RNIap.getAvailablePurchases();
        // const availableProducts = products.filter(
        //   product => purchases.every(purchase => purchase.productId !== product.productId),
        // );
        this.setState({ iapConnection, products });
        // console.log('State', this.state.products);
        // console.log(availableProducts);
      } catch (err) {
        console.warn(err.code, err.message);
        // throw new Error('Ошибка');
      }
    }
  }


  componentDidUpdate(prevProps) {
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
    RNIap.endConnection();
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

  buyItem = async (sku) => {
    // console.info(`buyItem: ${sku}`);
    // const purchase = await RNIap.buyProduct(sku);
    // const products = await RNIap.buySubscription(sku);
    // const purchase = await RNIap.buyProductWithoutFinishTransaction(sku);

    try {
      const purchase: any = await RNIap.requestPurchase(sku);
      // this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
      // console.log(purchase);

      if (purchase) {
        this.setState(prevState => ({
          purchased: true,
          products: prevState.products.filter(product => purchase.productId !== product.productId),
        }));
      }
    } catch (err) {
      console.warn(err.code, err.message);
      // const subscription = RNIap.addAdditionalSuccessPurchaseListenerIOS(async (purchase) => {
      //   this.setState({ receipt: purchase.transactionReceipt }, () => this.goToNext());
      //   subscription.remove();
      // });
    }
  };

  onLanguageChange = (value) => {
    this.props.languageChanged(value);
    i18n.locale = value === 0 ? 'ru' : 'en';
  };

  onCountryChange = (value) => {
    this.props.countryChanged(value);
  };

  render() {
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
          {Platform.OS === 'android' && this.state.iapConnection && this.state.products && (
            <Card>
              <Header headerText={strings('settings.donat.header')} />
              {/* {this.state.purchased && ( */}
              {purchaseUpdateSubscription && (
                <CardSection>
                  <Text style={{ fontSize: 17, margin: 10, textAlign: 'center' }}>
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
                    {`${strings('settings.donat.header')} ${strings('settings.donat.for')} ${
                      product.localizedPrice
                    }`}
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
                    <Text style={{ color: 'white' }}>{product.localizedPrice}</Text>
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
export default connect(
  mapStateToProps,
  {
    languageChanged,
    countryChanged,
  },
)(Settings);

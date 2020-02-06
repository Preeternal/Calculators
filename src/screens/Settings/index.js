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

class Settings extends Component<Props, State> {
  static navigationOptions = ({ navigation }: Object) => {
    const { params } = navigation.state;
    return {
      title: strings('settings.settings'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }: { tintColor: ?string }) => (
        <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
      ),
    };
  };

  state = {
    iapConnection: false,
    products: [],
    purchased: false,
  };

  purchaseUpdateSubscription = null;

  purchaseErrorSubscription = null;

  // no need to preset drawer label because we define title in navigationOptions
  // componentWillMount() {
  //   this.props.navigation.setParams({ DLabel: strings('settings.settings') });
  // }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const iapConnection = await RNIap.initConnection();
        const products = await RNIap.getProducts(prodItems);
        this.setState({ iapConnection, products });
        const purchases = await RNIap.getAvailablePurchases();
        if (purchases.length) {
          // await RNIap.consumeAllItemsAndroid(); did not work as expected, need to open issue
          purchases.map(async purchase => {
            await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
          });
        }
        this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
          purchase => {
            if (purchase.transactionReceipt && this.state.products.length) {
              this.setState(prevState => ({
                products: prevState.products.filter(
                  product => purchase.productId !== product.productId,
                ),
                purchased: true,
              }));
            }
          },
        );
        this.purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
          console.warn('purchaseErrorListener', error);
          Alert.alert('purchase error', JSON.stringify(error));
        });
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
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
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
      this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
        purchase => {
          if (purchase.transactionReceipt && this.state.products.length) {
            this.setState(prevState => ({
              products: prevState.products.filter(
                product => purchase.productId !== product.productId,
              ),
              purchased: true,
            }));
          }
        },
      );
    } catch (err) {
      console.warn(err.code, err.message);
      this.purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
        console.warn('purchaseErrorListener', error);
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
                <Header headerText={strings('settings.donat.investments')} />
                {this.state.purchased && (
                  <CardSection>
                    <Text
                      style={{
                        fontFamily: 'Ubuntu',
                        fontSize: 17,
                        margin: 10,
                        textAlign: 'center',
                      }}
                    >
                      {strings('settings.donat.thanks')}
                    </Text>
                  </CardSection>
                )}
                {this.state.products.map((product, i) => (
                  <CardSection key={i.toString()}>
                    <Text
                      style={{
                        fontFamily: 'Ubuntu',
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
                      <Text style={{ fontFamily: 'Ubuntu', color: 'white' }}>
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
export default connect<any, any, any, any, any, any>(mapStateToProps, {
  languageChanged,
  countryChanged,
})(Settings);

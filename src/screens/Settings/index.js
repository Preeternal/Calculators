// @flow
import React, { Component, Fragment } from 'react';
import { ScrollView, Platform, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

import { LocalizationContext } from '../../Context';

type Props = {
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
  state = {
    iapConnection: false,
    products: [],
    purchased: false,
  };

  purchaseUpdateSubscription = null;

  purchaseErrorSubscription = null;

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
      }
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
    this.context.setLocale(value === 0 ? 'ru' : 'en');
    i18n.locale = value === 0 ? 'ru' : 'en';
  };

  onCountryChange = (value: number) => {
    this.props.countryChanged(value);
  };

  static contextType = LocalizationContext;

  render() {
    const { t } = this.context;
    return (
      <Fragment>
        <ScrollView style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Локальные данные" /> */}
            <Header headerText={t('settings.localization')} />
            <TableSection>
              <InputPicker
                // label="Язык"
                label={t('settings.language')}
                options={['русский', 'english']}
                selectedValue={this.props.language}
                onValueChange={this.onLanguageChange}
              />
              <InputPicker
                // label="Страна"
                label={t('settings.country')}
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
                <Header headerText={t('settings.donat.investments')} />
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
                      {t('settings.donat.thanks')}
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
                      {`${t('settings.donat.header')} ${t(
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

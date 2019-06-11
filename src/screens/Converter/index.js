// @flow
import React, { Component, Fragment } from 'react';
import {
  ScrollView, FlatList, TouchableOpacity, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { gql } from 'apollo-boost';
// import { graphql } from 'react-apollo';
import 'number-to-locale-string';

// import CurrencyComponent from './CurrencyComponent';
import client from '../../client';
import {
  Card, Header, TableSection, CurrencyInput,
} from '../../components/common';
import { strings, currentLocale } from '../../../locales/i18n';
import CustomHeader from '../Common/CustomHeader';
import { number } from '../../lib';

const textColor = '#525050';
const activeTextColor = '#000000';

type Props = {
  language: number,
  country: number,
  // data: Object,
  navigation: Function,
};

type State = {
  currencies: Array<Object>,
  preset: Array<string>,
  presetCurrencies: Array<Object>,
  inputStyle: Array<string>,
  userCountryCode?: string,
};

class Converter extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: strings('converter.header'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" name="retweet" style={{ fontSize: 22, color: tintColor }} />
      ),
    };
  };

  state = {
    currencies: [],
    preset: ['UAH', 'RUB', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'BYN', 'BRL', 'CAD'],
    presetCurrencies: [],
    inputStyle: [],
  };

  componentDidMount() {
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
        this.setState({
          currencies: [
            {
              charCode: 'RUB',
              id: '1',
              input: 1,
              name: 'Российский рубль',
              nameEng: 'Russian ruble',
              nominal: 1,
              updatedAt: '2019-05-30T11:02:01.574Z',
              value: 1,
              __typename: 'Currency',
            },
            ...currenciesWithInputField,
          ],
          inputStyle: Array(currenciesWithInputField.length + 1).fill(textColor),
        });
        const { currencies, preset } = this.state;
        const filter = currencies.filter(currency => preset.includes(currency.charCode));
        filter.sort((a, b) => preset.indexOf(a.charCode) - preset.indexOf(b.charCode));
        this.setState({
          presetCurrencies: [...filter],
        });
      });
  }

  onChangeCurrency = (index, input: string) => {
    this.setState((prevState) => {
      const currencies = [...prevState.presetCurrencies];
      const divider = Number(number(input)) / (currencies[index].nominal / currencies[index].value);
      const currenciesWithDivider = currencies.map((currency, ind) => {
        const curr = { ...currency };
        if (ind === index) {
          curr.input = number(input);
        } else {
          curr.input = this.getLocalInput((curr.nominal / curr.value) * divider);
        }
        return curr;
      });
      return {
        presetCurrencies: currenciesWithDivider,
      };
    });
  };

  onFocus = (index) => {
    this.setState((prevState) => {
      const currencies = [...prevState.presetCurrencies];
      if (currencies[index].input === 0 || currencies[index].input === '0,00') {
        currencies[index].input = '';
      }
      const inputStyle = [...prevState.inputStyle];
      inputStyle.splice(index, 1, activeTextColor);
      return {
        presetCurrencies: currencies,
        inputStyle,
      };
    });
    // }
    // if (text === '0' || text === '0,00') {
    //   this.props[`${input}Changed`]('');
    // } else {
    //   this.props[`${input}Changed`](number(text));
    // }
  };

  onBlur = (index) => {
    this.setState((prevState) => {
      const currencies = [...prevState.presetCurrencies];
      if (currencies[index].input === '') {
        currencies[index].input = 0;
      } else {
        currencies[index].input = this.getLocalInput(currencies[index].input);
      }
      const inputStyle = [...prevState.inputStyle];
      inputStyle.splice(index, 1, textColor);
      return {
        presetCurrencies: currencies,
        inputStyle,
      };
    });
    // if (text === '') {
    //   this.props[`${input}Changed`]('0');
    // } else {
    //   const minimumFractionDigits = Math.ceil(Number(text)) !== Number(text) ? 2 : 0;
    //   this.props[`${input}Changed`](
    //     Number(number(text)).toLocaleString('ru-RU', {
    //       minimumFractionDigits,
    //       maximumFractionDigits: minimumFractionDigits,
    //     }),
    //   );
    // }
  };

  getLocalInput = (input) => {
    const minimumFractionDigits = Math.ceil(Number(input)) !== Number(input) ? 2 : 0;
    return Number(number(`${input}`)).toLocaleString('ru-RU', {
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
    });
  };

  render() {
    return (
      <Fragment>
        <CustomHeader
          title={strings('converter.title')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView key={`${this.props.language}${this.props.country}`} style={{ flex: 1 }}>
          <Card>
            <Header headerText={strings('converter.header')} />
            <TableSection>
              <FlatList
                data={[...this.state.presetCurrencies]}
                renderItem={({ item, index }) => (
                  <CurrencyInput
                    // placeholder={item.name}
                    label={item.charCode}
                    name={`${item.nominal} ${
                      currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng
                    }`}
                    onChangeText={(input) => {
                      this.onChangeCurrency(index, input);
                    }}
                    onFocus={() => this.onFocus(index)}
                    onBlur={() => this.onBlur(index)}
                    appInputStyle={{ color: this.state.inputStyle[index] }}
                    value={`${item.input}`}
                  />
                )}
                ListFooterComponent={() => <View style={{ minHeight: 32 }} />}
                keyExtractor={item => item.charCode}
              />

              {/* <CurrencyComponent navigation={this.props.navigation} /> */}
            </TableSection>
          </Card>
        </ScrollView>
        <View style={{ minHeight: 32 }}>
          <Text>
            Последнее обновление
            {/* {this.state.currencies[2].updatedAt} */}
          </Text>
        </View>
        {/* <ActionButton
          buttonColor="rgba(231,76,60,1)"
          // verticalOrientation="up"
          position="center"
          // offsetX={70}
          offsetY={10}
        >
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            // onPress={() => console.log('notes tapped!')}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton> */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCurrency');
          }}
          style={styles.button}
        >
          <Icon name="md-add" style={styles.actionButtonIcon} />
        </TouchableOpacity>
      </Fragment>
    );
  }
}

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

const styles = {
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    backgroundColor: 'rgba(231,76,60,1)',
    borderRadius: 30,
  },
};

const mapStateToProps = state => ({
  language: state.settings.language,
  country: state.settings.country,
});

export default connect(mapStateToProps)(Converter);

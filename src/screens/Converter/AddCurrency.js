// @flow
import React, { Component, Fragment } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Icon } from 'native-base';
import 'number-to-locale-string';

import client from '../../client';
import { CurrencyInput } from '../../components/common';
import { currentLocale } from '../../../locales/i18n';
import { number } from '../../lib';

const textColor = '#525050';
const activeTextColor = '#000000';

type Props = {
  data: Object,
};

type State = {
  currencies: Array<Object>,
  preset: Array<string>,
  presetCurrencies: Array<Object>,
  inputStyle: Array<string>,
};

class AddCurrency extends Component<Props, State> {
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
        const filter = this.state.currencies.filter(currency => this.state.preset.includes(currency.charCode));
        filter.sort(
          (a, b) => this.state.preset.indexOf(a.charCode) - this.state.preset.indexOf(b.charCode),
        );
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
    const { error, currencies, loading } = this.props.data;
    if (error) {
      return <Text>{error.message}</Text>;
    }
    if (currencies) {
      return (
        <Fragment>
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
            keyExtractor={item => item.charCode}
          />
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Icon name="md-add" style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </Fragment>
      );
    }
    if (loading) return <Text>Loading...</Text>;
    return <Text>Something goes wrong. Please try again later.</Text>;
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

export default graphql(getCurrencies)(AddCurrency);

const styles = {
  actionButtonIcon: {
    fontSize: 20,
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

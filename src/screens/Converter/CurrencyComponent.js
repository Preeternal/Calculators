// @flow
import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import client from '../../client';
import { CurrencyInput } from '../../components/common';
import { currentLocale } from '../../../locales/i18n';

type Props = {
  data: Object,
};

type State = {
  currencies: Array<Object>,
};

class CurrencyComponent extends Component<Props, State> {
  state = { currencies: [] };

  componentDidMount() {
    // console.log(this.props);
    // if (this.props.data.currencies) this.setState({ currencies: this.props.data });
    client
      .query({
        query: getCurrencies,
      })
      .then((response) => {
        const currenciesWithInputField = response.data.currencies.map((currency) => {
          const curr = { ...currency };
          curr.input = curr.nominal / curr.value; // 10/24 = 0.41 grn for rub
          // 10 - 24 р
          // х - 1
          // х = 10/24 = 0.41
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
        });
      });
  }

  onChangeCurrency = (index, input) => {
    this.setState((prevState) => {
      const currencies = [...prevState.currencies];
      const divider = input / currencies[index].nominal / currencies[index].value;
      const currenciesWithDivider = currencies.map((currency, ind) => {
        const curr = { ...currency };
        if (ind === index) {
          curr.input = input;
        } else {
          curr.input = (curr.nominal / curr.value) * divider;
        }
        return curr;
      });
      return {
        currencies: currenciesWithDivider,
      };
    });
  };

  render() {
    const { error, currencies, loading } = this.props.data;
    if (error) {
      return <Text>{error.message}</Text>;
    }
    if (currencies) {
      console.log(this.state.currencies);
      return (
        <FlatList
          data={[
            // {
            //   charCode: 'RUB',
            //   id: '1',
            //   name: 'Российский рубль',
            //   nameEng: 'Russian ruble',
            //   nominal: 1,
            //   updatedAt: '2019-05-30T11:02:01.574Z',
            //   value: 1,
            //   __typename: 'Currency',
            // },
            ...this.state.currencies,
          ]}
          renderItem={({ item, index }) => (
            <CurrencyInput
              // key={item.charCode}
              // placeholder={item.name}
              // label="Сумма вклада"
              label={item.charCode}
              name={`${item.nominal} ${
                currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng
              }`}
              onChangeText={(input) => {
                this.onChangeCurrency(index, input);
              }}
              // onFocus={() => this.onFocus('principal', this.props.principal)}
              // onBlur={() => this.onBlur('principal', this.props.principal)}
              // appInputStyle={{ color: this.state.principalColor }}
              value={`${item.input}`}
            />
          )}
          keyExtractor={item => item.charCode}
        />
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

export default graphql(getCurrencies)(CurrencyComponent);

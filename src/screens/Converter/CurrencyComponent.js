// @flow
import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { CurrencyInput } from '../../components/common';
import { currentLocale } from '../../../locales/i18n';

type Props = {
  data: Object,
};

// eslint-disable-next-line react/prefer-stateless-function
class CurrencyComponent extends Component<Props> {
  onChangeCurrency = () => {
    console.log('Changed!');
  };

  render() {
    console.log(this.props);
    const { error, currencies, loading } = this.props.data;
    if (error) {
      return <Text>{error.message}</Text>;
    }
    if (currencies) {
      console.log(currentLocale);
      return (
        <FlatList
          data={[
            {
              charCode: 'RUB',
              id: '1',
              name: 'Российский рубль',
              nameEng: 'Russian ruble',
              nominal: 1,
              updatedAt: '2019-05-30T11:02:01.574Z',
              value: 1,
              __typename: 'Currency',
            },
            ...currencies,
          ]}
          renderItem={({ item }) => (
            <CurrencyInput
              key={item.charCode}
              // placeholder={item.name}
              // label="Сумма вклада"
              label={item.charCode}
              name={`${item.nominal} ${
                currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng
              }`}
              onChangeText={this.onChangeCurrency}
              // onFocus={() => this.onFocus('principal', this.props.principal)}
              // onBlur={() => this.onBlur('principal', this.props.principal)}
              // appInputStyle={{ color: this.state.principalColor }}
              value={`${item.value / item.nominal}`}
            />
          )}
          keyExtractor={(item, index) => item + index}
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

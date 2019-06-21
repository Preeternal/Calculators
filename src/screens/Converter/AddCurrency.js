// @flow
import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { CurrencyInput } from '../../components/common';
import { currentLocale } from '../../../locales/i18n';
import { presetChanged, currenciesChanged, presetCurrenciesChanged } from '../../actions';

type Props = {
  // preset: Array<string>,
  // currencies: Array<Object>,
  presetCurrencies: Array<Object>,
};

type State = {};

class AddCurrency extends Component<Props, State> {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <FlatList
          data={[...this.props.presetCurrencies]}
          renderItem={({ item, index }) => (
            <CurrencyInput
              // placeholder={item.name}
              label={item.charCode}
              name={`${item.nominal} ${
                currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng
              }`}
              // onChangeText={(input) => {
              //   this.onChangeCurrency(index, input);
              // }}
              // onFocus={() => this.onFocus(index)}
              // onBlur={() => this.onBlur(index)}
              // appInputStyle={{ color: this.state.inputStyle[index] }}
              value={`${item.input}`}
            />
          )}
          keyExtractor={item => item.charCode}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  preset: state.converter.preset,
  currencies: state.converter.currencies,
  presetCurrencies: state.converter.presetCurrencies,
});

const mapDispatchToActions = {
  presetChanged,
  currenciesChanged,
  presetCurrenciesChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(AddCurrency);

// const styles = {
//   actionButtonIcon: {
//     fontSize: 20,
//     height: 22,
//     color: 'white',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 16,
//     right: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 56,
//     height: 56,
//     backgroundColor: 'rgba(231,76,60,1)',
//     borderRadius: 30,
//   },
// };

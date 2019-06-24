// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { CurrencyAdditional } from '../../components/common';
import { strings, currentLocale } from '../../../locales/i18n';
import { presetChanged, currenciesChanged, presetCurrenciesChanged } from '../../actions';

type Props = {
  preset: Array<string>,
  currencies: Array<Object>,
  presetCurrencies: Array<Object>,
  // navigation: Function,
};

type State = { additionalCurrencies: Array<Object> };

const styles = {
  headerText: {
    color: '#ffffff',
    fontSize: 18,
  },
  button: {
    marginRight: 15,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
};

class AddCurrency extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={styles.headerText}>{strings('converter.addCurrency')}</Text>,
    headerStyle: {
      // backgroundColor: '#f4511e',
      backgroundColor: '#525050',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackImage: <Icon name="md-close" style={styles.actionButtonIcon} />,
    headerRight: (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon type="MaterialIcons" name="done" style={styles.actionButtonIcon} />
        {/* md-checkmark */}
      </TouchableOpacity>
    ),
  });

  state = { additionalCurrencies: [] };

  componentDidMount() {
    const { preset, currencies } = this.props;
    const filter = currencies.filter(currency => !preset.includes(currency.charCode));
    this.setState({
      additionalCurrencies: [...filter],
    });
  }

  render() {
    return (
      <Fragment>
        <FlatList
          data={[...this.state.additionalCurrencies]}
          renderItem={({ item, index }) => (
            <CurrencyAdditional
              // placeholder={item.name}
              label={item.charCode}
              name={currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng}
              // onPress
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

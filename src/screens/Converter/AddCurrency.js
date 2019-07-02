// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { CurrencyAdditional } from '../../components/converter/CurrencyAdditional';
import { strings, currentLocale } from '../../../locales/i18n';
import { presetChanged, presetCurrenciesChanged } from '../../actions';
import { number } from '../../lib';

type Props = {
  preset: Array<string>,
  currencies: Array<Object>,
  presetCurrencies: Array<Object>,
  presetChanged: Function,
  presetCurrenciesChanged: Function,
  navigation: Function,
};

type State = {
  additionalCurrencies: Array<Object>,
  checked: Array<string | null>,
};

const styles = {
  headerText: {
    color: '#ffffff',
    fontSize: 18,
  },
  rightButton: {
    marginRight: 15,
  },
  leftButton: {
    marginLeft: 15,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
};

class AddCurrency extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    drawerLockMode: 'locked-closed',
    headerTitle: <Text style={styles.headerText}>{strings('converter.addCurrency')}</Text>,
    headerStyle: {
      // backgroundColor: '#f4511e',
      backgroundColor: '#525050',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: (
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="md-close" style={styles.actionButtonIcon} />
      </TouchableOpacity>
    ),
    // headerBackImage: <Icon name="md-close" style={styles.actionButtonIcon} />,
    headerRight: (
      <TouchableOpacity style={styles.rightButton} onPress={navigation.getParam('handleSave')}>
        <Icon type="MaterialIcons" name="done" style={styles.actionButtonIcon} />
        {/* md-checkmark */}
      </TouchableOpacity>
    ),
  });

  state = { additionalCurrencies: [], checked: [] };

  componentDidMount() {
    const { preset, currencies } = this.props;
    const filter = currencies.filter(currency => !preset.includes(currency.charCode));
    this.setState({
      additionalCurrencies: [...filter],
      checked: filter.map(() => null),
    });
    this.props.navigation.setParams({ handleSave: this.saveDetails });
  }

  handleClick = (charCode, index) => {
    this.setState((prevState) => {
      const checked = [...prevState.checked];
      checked[index] = prevState.checked[index] === charCode ? null : charCode;
      return { checked };
    });
  };

  saveDetails = () => {
    const presetSelected = this.state.checked.filter(item => item !== null);
    const preset = this.props.preset.concat(presetSelected);
    this.onPresetChange(preset);
    const { currencies, presetCurrencies } = this.props;
    const filter = currencies.filter(currency => preset.includes(currency.charCode));
    filter.sort((a, b) => preset.indexOf(a.charCode) - preset.indexOf(b.charCode));
    if (!presetCurrencies[0] || presetCurrencies[0].input === filter[0].input) {
      this.onPresetCurrencyChange(filter);
    } else if (presetCurrencies[0].input !== filter[0].input) {
      this.onPresetCurrencyChangeWithDivider(0, presetCurrencies[0].input, filter);
    }
    this.props.navigation.goBack();
  };

  onPresetChange = (array) => {
    this.props.presetChanged(array);
  };

  onPresetCurrencyChange = (array) => {
    this.props.presetCurrenciesChanged(array);
  };

  onPresetCurrencyChangeWithDivider = (
    index: number,
    input: string,
    presetCurrencies: Array<Object>,
  ) => {
    const currencies = [...presetCurrencies];
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
    this.onPresetCurrencyChange(currenciesWithDivider);
  };

  getLocalInput = (input) => {
    const minimumFractionDigits = Math.ceil(Number(input)) !== Number(input) ? 2 : 0;
    return Number(number(`${input}`)).toLocaleString('ru-RU', {
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
    });
  };

  render() {
    // console.log(this.state.checked);
    // console.log(this.props.preset);
    return (
      <Fragment>
        <FlatList
          data={[...this.state.additionalCurrencies]}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <CurrencyAdditional
              name={currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng}
              char={item.charCode}
              checked={!!this.state.checked[index]}
              handleClick={() => this.handleClick(item.charCode, index)}
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
  presetCurrenciesChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(AddCurrency);

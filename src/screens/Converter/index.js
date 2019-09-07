// @flow
import React, { Component, Fragment } from 'react';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button } from 'native-base';
import 'number-to-locale-string';

import { Card, Header, TableSection } from '../../components/common';
import { CurrencyInput } from '../../components/converter/CurrencyInput';
import { strings } from '../../../locales/i18n';
import CustomHeader from '../Common/CustomHeader';
import { number, initDate } from '../../lib';
import { currenciesChanged, presetCurrenciesChanged } from '../../actions';

const textColor = '#525050';
const activeTextColor = '#000000';

type Props = {
  language: number,
  country: number,
  navigation: Object,
  preset: Array<string>,
  currencies: Array<Object>,
  presetCurrencies: Array<Object>,
  currenciesChanged: Function,
  presetCurrenciesChanged: Function,
};

type State = {
  inputStyle: Array<string>,
  userCountryCode?: string,
  keyboard: boolean,
};

class Converter extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: null,
      headerStyle: {
        backgroundColor: '#525050',
      },
      title: strings('converter.header'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" name="retweet" style={{ fontSize: 22, color: tintColor }} />
      ),
    };
  };

  state = {
    inputStyle: [],
    keyboard: false,
  };

  componentDidMount() {
    this.handlePreset();
  }

  componentDidUpdate(prevProps) {
    if (this.props.preset !== prevProps.preset) {
      this.handlePreset();
    }
  }

  handlePreset = () => {
    const { preset, currencies, presetCurrencies } = this.props;
    if (preset.length) {
      const filter = currencies.filter(currency => preset.includes(currency.charCode));
      filter.sort((a, b) => preset.indexOf(a.charCode) - preset.indexOf(b.charCode));
      // if (filter.length) {
      if (!presetCurrencies[0] || presetCurrencies[0].input === filter[0].input) {
        this.onPresetCurrencyChange(filter);
      } else if (presetCurrencies[0].input !== filter[0].input) {
        this.onPresetCurrencyChangeWithDivider(0, presetCurrencies[0].input, filter);
      }
    } else {
      this.onPresetCurrencyChange([]);
    }
    this.setState({
      inputStyle: Array(this.props.presetCurrencies.length).fill(textColor),
    });
  };

  onCurrencyChange = (array) => {
    this.props.currenciesChanged(array);
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

  onFocus = (index) => {
    this.setState((prevState) => {
      const inputStyle = [...prevState.inputStyle];
      inputStyle.splice(index, 1, activeTextColor);
      return {
        keyboard: true,
        inputStyle,
      };
    });
    const currencies = [...this.props.presetCurrencies];
    if (
      currencies[index].input === 0
      || currencies[index].input === '0,00'
      || currencies[index].input === '0'
    ) {
      currencies[index].input = '';
      this.onPresetCurrencyChange(currencies);
    }
  };

  onBlur = (index) => {
    this.setState((prevState) => {
      const inputStyle = [...prevState.inputStyle];
      inputStyle.splice(index, 1, textColor);
      return {
        keyboard: false,
        inputStyle,
      };
    });
    const currencies = [...this.props.presetCurrencies];
    if (currencies[index].input === '') {
      currencies[index].input = 0;
    } else {
      currencies[index].input = this.getLocalInput(currencies[index].input);
    }
    this.onPresetCurrencyChange(currencies);
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
          right={
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('EditPreset');
              }}
            >
              <Icon name="md-create" style={{ fontSize: 30, color: 'white' }} />
            </Button>
          }
        />
        {this.props.currencies.length ? (
          <ScrollView key={`${this.props.language}${this.props.country}`} style={{ flex: 1 }}>
            <Card>
              <Header headerText={strings('converter.header')} />
              <TableSection>
                <FlatList
                  data={[...this.props.presetCurrencies]}
                  extraData={this.props}
                  renderItem={({ item, index }) => (
                    <CurrencyInput
                      // placeholder={item.name}
                      label={item.charCode}
                      name={this.props.language === 0 ? item.name : item.nameEng}
                      onChangeText={(input: string) => {
                        this.onPresetCurrencyChangeWithDivider(
                          index,
                          input,
                          this.props.presetCurrencies,
                        );
                      }}
                      onFocus={() => this.onFocus(index)}
                      onBlur={() => this.onBlur(index)}
                      appInputStyle={{ color: this.state.inputStyle[index] }}
                      value={`${item.input}`}
                    />
                  )}
                  keyExtractor={item => item.charCode}
                />
              </TableSection>
            </Card>
            <View style={{ minHeight: 32 }} />
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={textColor} />
          </View>
        )}
        {this.props.currencies[1] && !this.state.keyboard && (
          <Fragment>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                {/* {` ${strings('converter.lastUpdate')} ${new Date(
                  Date.parse(this.props.currencies[1].updatedAt),
                ).toLocaleString(currentLocale, { hour12: false })}`} */}
                {/* {`${strings('converter.lastUpdate')} ${DateTime.fromJSDate(
                  new Date(Date.parse(this.props.currencies[1].updatedAt)),
                )
                  .setLocale('ru')
                  .toLocaleString(DateTime.DATE_SHORT)}`} */}
                {`${strings('converter.lastUpdate')} ${initDate(
                  new Date(Date.parse(this.props.currencies[1].updatedAt)),
                )}`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddCurrency');
              }}
              style={styles.button}
            >
              <Icon name="md-add" style={styles.actionButtonIcon} />
            </TouchableOpacity>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

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
  footerView: {
    minHeight: 32,
    backgroundColor: '#525050',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    position: 'relative',
  },
  footerText: {
    fontSize: 14,
    color: '#ffffff',
  },
};

const mapStateToProps = state => ({
  language: state.settings.language,
  country: state.settings.country,
  preset: state.converter.preset,
  currencies: state.converter.currencies,
  presetCurrencies: state.converter.presetCurrencies,
});

const mapDispatchToActions = {
  currenciesChanged,
  presetCurrenciesChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(Converter);

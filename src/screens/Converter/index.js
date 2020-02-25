// @flow
import React, { Component, Fragment } from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
// import { DateTime } from 'luxon';
import 'number-to-locale-string';

import { Header } from '../../components/common';
import { CurrencyInput } from '../../components/converter/CurrencyInput';
import { LocalizationContext } from '../../Context';
import { number, initDate } from '../../lib';
import { currenciesChanged, presetCurrenciesChanged } from '../../actions';
import storeCurrencies from '../../lib/storeCurrencies';

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
  refreshing: boolean,
};

const textColor = '#525050';
const activeTextColor = '#000000';

class Converter extends Component<Props, State> {
  state = {
    inputStyle: [],
    keyboard: false,
    refreshing: false,
  };

  listRef: { current: null | FlatList<Object> } = React.createRef();

  componentDidMount() {
    this.handlePreset();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.preset !== prevProps.preset) {
      this.handlePreset();
    }
    if (this.props.currencies !== prevProps.currencies) {
      this.handlePreset();
      this.handleRefresh();
    }
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    storeCurrencies();
  };

  handleRefresh = () => {
    this.setState({
      refreshing: false,
    });
  };

  handlePreset = () => {
    const { preset, currencies, presetCurrencies } = this.props;
    if (preset.length) {
      const filter = currencies.filter(currency =>
        preset.includes(currency.charCode),
      );
      filter.sort(
        (a, b) => preset.indexOf(a.charCode) - preset.indexOf(b.charCode),
      );

      if (
        !presetCurrencies[0] ||
        presetCurrencies[0].input === filter[0].input
      ) {
        this.onPresetCurrencyChange(filter);
      } else if (presetCurrencies[0].input !== filter[0].input) {
        this.onPresetCurrencyChangeWithDivider(
          0,
          presetCurrencies[0].input,
          filter,
        );
      }
    } else {
      this.onPresetCurrencyChange([]);
    }
    this.setState({
      inputStyle: Array(this.props.presetCurrencies.length).fill(textColor),
    });
  };

  onCurrencyChange = (array: Array<Object>) => {
    this.props.currenciesChanged(array);
  };

  onPresetCurrencyChange = (array: Array<Object>) => {
    this.props.presetCurrenciesChanged(array);
  };

  onPresetCurrencyChangeWithDivider = (
    index: number,
    input: string,
    presetCurrencies: Array<Object>,
  ) => {
    const currencies = [...presetCurrencies];
    const divider =
      Number(number(input)) /
      (currencies[index].nominal / currencies[index].value);
    const currenciesWithDivider = currencies.map((currency, ind) => {
      const curr = { ...currency };
      if (ind === index) {
        curr.input = number(input);
      } else {
        curr.input = this.getLocalInput(
          ((curr.nominal / curr.value) * divider).toString(),
        );
      }
      return curr;
    });
    this.onPresetCurrencyChange(currenciesWithDivider);
  };

  onFocus = (index: number) => {
    this.scrollToIndex(index);
    this.setState(prevState => {
      const inputStyle = [...prevState.inputStyle];
      inputStyle.splice(index, 1, activeTextColor);
      return {
        keyboard: true,
        inputStyle,
      };
    });
    const currencies = [...this.props.presetCurrencies];
    if (
      currencies[index].input === 0 ||
      currencies[index].input === '0,00' ||
      currencies[index].input === '0'
    ) {
      currencies[index].input = '';
      this.onPresetCurrencyChange(currencies);
    }
  };

  onBlur = (index: number) => {
    this.setState(prevState => {
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

  getLocalInput = (input: string) => {
    const minimumFractionDigits =
      Math.ceil(Number(input)) !== Number(input) ? 2 : 0;
    return Number(number(`${input}`)).toLocaleString('ru-RU', {
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
    });
  };

  scrollToIndex = (index: number) => {
    if (this.listRef.current) {
      this.listRef.current.scrollToIndex({ animated: true, index });
    }
  };

  static contextType = LocalizationContext;

  render() {
    const { t } = this.context;
    return (
      <Fragment>
        {this.props.currencies.length ? (
          <Fragment>
            <View
              key={`${this.props.language}${this.props.country}`}
              style={{ flex: 1 }}
            >
              <FlatList
                ref={this.listRef}
                data={[...this.props.presetCurrencies]}
                extraData={this.props}
                ListHeaderComponent={
                  <Header
                    headerText={t('converter.header')}
                    headerStyle={styles.header}
                  />
                }
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
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }
                ListFooterComponent={<View style={{ minHeight: 44 }} />}
              />
            </View>
            {this.props.currencies[1] && !this.state.keyboard && (
              <Fragment>
                <View style={styles.footerView}>
                  <Text style={styles.footerText}>
                    {/* {` ${t('converter.lastUpdate')} ${new Date(
                    Date.parse(this.props.currencies[1].updatedAt),
                  ).toLocaleString(currentLocale, { hour12: false })}`} */}
                    {/* {`${t('converter.lastUpdate')} ${DateTime.fromJSDate(
                    new Date(Date.parse(this.props.currencies[1].updatedAt)),
                  )
                    .setLocale('ru')
                    .toLocaleString(DateTime.DATE_SHORT)}`} */}

                    {`${t('converter.lastUpdate')} ${initDate(
                      new Date(Date.parse(this.props.currencies[1].updatedAt)),
                    )} ${new Date(
                      Date.parse(this.props.currencies[1].updatedAt) -
                        new Date().getTimezoneOffset() * 1000,
                    ).toLocaleTimeString()}`}

                    {/* {new Date(Date.parse(this.props.currencies[1].updatedAt)).valueOf()
                    - new Date(Date.parse(new Date().toUTCString())).valueOf()} */}
                    {/* {new Date().toUTCString()} */}
                    {/* {new Date(
                    new Date(Date.parse(this.props.currencies[1].updatedAt)).valueOf()
                      - (new Date(Date.parse(this.props.currencies[1].updatedAt)).valueOf()
                        - new Date(Date.parse(new Date().toUTCString())).valueOf()),
                  ).toLocaleTimeString()} */}
                    {/* {`${t('converter.lastUpdate')} ${DateTime.fromISO(
                      this.props.currencies[1].updatedAt,
                      { locale },
                    ).toLocaleString(DateTime.DATETIME_SHORT)}`} */}
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
  header: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  footerView: {
    minHeight: 32,
    backgroundColor: '#525050',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  footerText: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
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

export default connect<any, any, any, any, any, any>(
  mapStateToProps,
  mapDispatchToActions,
)(Converter);

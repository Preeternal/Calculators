// @flow
import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  // InteractionManager,
  // ActivityIndicator,
} from 'react-native';
import { NavigationActions } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import Pie from 'react-native-pie';
import { Icon } from 'native-base';
import 'number-to-locale-string';

import {
  principalChanged,
  dateOpenChanged,
  dateClosedChanged,
  interest1Changed,
  interest2Changed,
  platezChanged,
  plusperiodChanged,
  prinplusChanged,
  radioPressed,
  taxSelected,
  taxRateSelected,
  countryChanged,
  countryIpTriggered,
} from '../../actions';

import {
  Input,
  InputDate,
  InputPicker,
  CardSection,
  Card,
  Header,
  Result,
  ResultSrok,
  Table,
  TableSection,
} from '../../components/common';

import { strings, currentLocale } from '../../../locales/i18n';

import config from '../../../config';

import { initDate, number } from '../../lib';
import calculate from '../../lib/calculate';

import CustomHeader from '../Common/CustomHeader';

import images from '../../assets/images';

type Props = {
  principal: string,
  dateOpen: number,
  dateClosed: number,
  interest1: string,
  interest2: string,
  platez: number,
  plusperiod: number,
  prinplus: string,
  radio: number,
  taxCheck: number,
  taxRate: number,
  language: number,
  country: number,
  countryIP: boolean,
  principalChanged: Function,
  dateOpenChanged: Function,
  dateClosedChanged: Function,
  interest1Changed: Function,
  interest2Changed: Function,
  platezChanged: Function,
  plusperiodChanged: Function,
  prinplusChanged: Function,
  radioPressed: Function,
  taxSelected: Function,
  taxRateSelected: Function,
  countryChanged: Function,
  countryIpTriggered: Function,

  calculated: typeof calculate,
  navigation: Object,
};

const textColor = '#525050';
const activeTextColor = '#000000';

type State = {
  didFinishInitialAnimation?: boolean,
  principalColor?: string,
  interest1Color?: string,
  interest2Color?: string,
  prinplusColor?: string,
  isDatePickerVisible?: boolean,
  isDatePicker2Visible?: boolean,
  userCountryCode?: string,
};

const pickerValue = (locale: string) => {
  if (locale.substring(0, 2) === 'ru') {
    return 0;
  }
  return 1;
};

class Depo extends Component<Props, State> {
  // static Options = ({ navigation }: { navigation: Object }) => {
  //   const { params } = navigation.state;
  //   return {
  //     title: strings('headerDeposit'), // drawer label initialization
  //     drawerLabel: params && params.DLabel,
  //     drawerIcon: ({ tintColor }: { tintColor: ?string }) => (
  //       <Icon
  //         type="Entypo"
  //         name="wallet"
  //         style={{ fontSize: 24, color: tintColor }}
  //       />
  //     ),
  //   };
  // };

  state = {
    // didFinishInitialAnimation: false,
    principalColor: textColor,
    interest1Color: textColor,
    interest2Color: textColor,
    prinplusColor: textColor,
    isDatePickerVisible: false,
    isDatePicker2Visible: false,
    userCountryCode: currentLocale.substring(3),
  };

  componentDidMount() {
    if (!this.props.countryIP) {
      fetch(config.ipUrl)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            userCountryCode: responseJson.country_code,
          });
          switch (this.state.userCountryCode) {
            case 'RU':
              this.onCountryChange(0);
              break;
            case 'UA':
              this.onCountryChange(2);
              break;
            default:
              this.onCountryChange(1);
          }
          this.onCountryIpTrigger(true);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.warn(
            `There has been a problem with your fetch operation: ${error.message}`,
          );
        });
    }
    // // 1: Component is mounted off-screen
    // InteractionManager.runAfterInteractions(() => {
    //   // 2: Component is done animating
    //   // 3: Start fetching the data
    //   // this.props.dispatchDataFetchStart();
    //   // 4: set didFinishInitialAnimation to false
    //   // This will render the navigation bar and a list of players
    //   this.setState({
    //     didFinishInitialAnimation: true,
    //   });
    // });

    setTimeout(this.handleLanguageChange, 10);
  }

  handleLanguageChange = () => {
    if (this.props.language !== pickerValue(i18n.currentLocale())) {
      i18n.locale = this.props.language === 0 ? 'ru' : 'en';
      //   this.props.navigation.setParams({ DLabel: strings('headerDeposit') });
      //   const setCreditLabel = NavigationActions.setParams({
      //     params: { DLabel: strings('headerCredit') },
      //     key: 'Credit',
      //   });
      //   this.props.navigation.dispatch(setCreditLabel);
      //   const setConverterLabel = NavigationActions.setParams({
      //     params: { DLabel: strings('converter.header') },
      //     key: 'ConverterStack',
      //   });
      //   this.props.navigation.dispatch(setConverterLabel);
      //   const setSettingsLabel = NavigationActions.setParams({
      //     params: { DLabel: strings('settings.settings') },
      //     key: 'Settings',
      //   });
      //   this.props.navigation.dispatch(setSettingsLabel);
      //   const setHelpLabel = NavigationActions.setParams({
      //     params: { DLabel: strings('help.header') },
      //     key: 'Help',
      //   });
      //   this.props.navigation.dispatch(setHelpLabel);
    }
  };

  onFocus = (input: string, text: string) => {
    this.setState({
      [`${input}Color`]: activeTextColor,
    });
    if (text === '0' || text === '0,00') {
      this.props[`${input}Changed`]('');
    } else {
      this.props[`${input}Changed`](number(text));
    }
  };

  onBlur = (input: string, text: string) => {
    this.setState({
      [`${input}Color`]: textColor,
    });
    if (text === '') {
      this.props[`${input}Changed`]('0');
    } else {
      const minimumFractionDigits =
        Math.ceil(Number(text)) !== Number(text) ? 2 : 0;
      this.props[`${input}Changed`](
        Number(number(text)).toLocaleString('ru-RU', {
          minimumFractionDigits,
          maximumFractionDigits: minimumFractionDigits,
        }),
      );
    }
  };

  setDatePickerVisible = (value: boolean) => {
    this.setState({
      isDatePickerVisible: value,
    });
  };

  setDatePicker2Visible = (value: boolean) => {
    this.setState({
      isDatePicker2Visible: value,
    });
  };

  onPrincipalChange = (text: string) => {
    this.props.principalChanged(number(text));
  };

  onDateOpenChange = (date: Date) => {
    this.setDatePickerVisible(false);
    this.props.dateOpenChanged(date.valueOf());
  };

  onDateClosedChange = (date: Date) => {
    this.setDatePicker2Visible(false);
    this.props.dateClosedChanged(date.valueOf());
  };

  onInterest1Change = (text: string) => {
    this.props.interest1Changed(number(text));
  };

  onInterest2Change = (text: string) => {
    this.props.interest2Changed(number(text));
  };

  onPlatezChange = (value: number) => {
    this.props.platezChanged(value);
  };

  onPlusperiodChange = (value: number) => {
    this.props.plusperiodChanged(value);
  };

  onPrinplusChange = (text: string) => {
    this.props.prinplusChanged(number(text));
  };

  onRadioPress = (value: number) => {
    this.props.radioPressed(value);
  };

  onTaxSelect = (value: number) => {
    this.props.taxSelected(value);
  };

  onTaxRateSelect = (value: number) => {
    this.props.taxRateSelected(value);
  };

  onCountryChange = (value: number) => {
    this.props.countryChanged(value);
  };

  onCountryIpTrigger = (bool: boolean) => {
    this.props.countryIpTriggered(bool);
  };

  render() {
    const {
      topImage,
      welcome,
      radioStyle,
      pieContainer,
      pie,
      gauge,
      gaugeText,
    } = styles;

    const {
      days1,
      srok,
      principal2,
      principal1,
      tax,
      adjunctionAll,
      table,
    } = this.props.calculated;

    const radio = [
      {
        label: '$usd ',
        index: 'USD',
        value: 0,
      },
      {
        label: '€eur ',
        index: 'EUR',
        value: 1,
      },
      {
        label: '₽руб',
        index: 'RUB',
        value: 2,
      },
    ];

    const optionsN = {
      style: 'currency',
      currencyDisplay: 'symbol',
      currency: radio[this.props.radio].index,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return (
      <Fragment>
        <CustomHeader
          title={strings('titleDeposit')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        {/* { this.state.didFinishInitialAnimation ? ( */}
        <ScrollView
          key={`${this.props.language}${this.props.country}`}
          style={{ flex: 1 }}
        >
          <Card>
            {/* <Header headerText="Депозитный калькулятор" /> */}
            <Header headerText={strings('headerDeposit')} />
            <CardSection>
              <Image source={images.logo} style={topImage} />
              <Text style={welcome}>
                {/* 'Проверьте правильность ввода:' : 'Введите информацию о депозите: */}
                {!srok ? strings('welcome.error') : strings('welcome.go')}
              </Text>

              <RadioForm
                key={this.props.radio}
                style={radioStyle}
                // ref="radioForm"
                radio_props={radio}
                initial={this.props.radio}
                formHorizontal
                labelHorizontal
                buttonColor="#757171"
                selectedButtonColor="#525050"
                // buttonInnerColor={'#e74c3c'}
                // buttonOuterColor={'#757171'}
                // buttonSize={15}
                // buttonOuterSize={60}
                labelColor="#757171"
                selectedLabelColor="#525050"
                animation
                onPress={value => {
                  this.onRadioPress(value);
                }}
              />
            </CardSection>

            <TableSection>
              <Input
                // placeholder="введите сумму"
                placeholder={strings('input.principal.placeholder')}
                // label="Сумма вклада"
                label={`${strings('input.principal.label')}, ${radio[
                  this.props.radio
                ].label.charAt(0)}`}
                onChangeText={this.onPrincipalChange}
                onFocus={() => this.onFocus('principal', this.props.principal)}
                onBlur={() => this.onBlur('principal', this.props.principal)}
                appInputStyle={{ color: this.state.principalColor }}
                value={this.props.principal}
              />

              <InputDate
                // label="Дата открытия вклада"
                label={strings('input.dateOpen.label')}
                value={initDate(new Date(this.props.dateOpen))}
                onRootPress={() => this.setDatePickerVisible(true)}
                onPress={() => this.setDatePickerVisible(true)}
              />
              <DateTimePicker
                date={new Date(this.props.dateOpen)}
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this.onDateOpenChange}
                onCancel={() => this.setDatePickerVisible(false)}
                display="spinner"
              />

              <InputDate
                // label="Дата закрытия вклада"
                label={strings('input.dateClosed.label')}
                value={initDate(new Date(this.props.dateClosed))}
                onRootPress={() => this.setDatePicker2Visible(true)}
                onPress={() => this.setDatePicker2Visible(true)}
              />
              <DateTimePicker
                date={new Date(this.props.dateClosed)}
                isVisible={this.state.isDatePicker2Visible}
                onConfirm={this.onDateClosedChange}
                onCancel={() => this.setDatePicker2Visible(false)}
                display="spinner"
              />

              <Input
                // placeholder="введите ставку"
                placeholder={strings('input.interest1.placeholder')}
                // label="Процентная ставка"
                label={strings('input.interest1.label')}
                onChangeText={this.onInterest1Change}
                onBlur={() => this.onBlur('interest1', this.props.interest1)}
                onFocus={() => this.onFocus('interest1', this.props.interest1)}
                appInputStyle={{ color: this.state.interest1Color }}
                value={this.props.interest1}
              />

              {days1 > 0 ? (
                <Input
                  // placeholder="введите ставку"
                  placeholder={strings('input.interest2.placeholder')}
                  // label="Процентная ставка при досрочном расторжении вклада (не полный месяц)"
                  label={strings('input.interest2.label')}
                  onChangeText={this.onInterest2Change}
                  onBlur={() => this.onBlur('interest2', this.props.interest2)}
                  onFocus={() =>
                    this.onFocus('interest2', this.props.interest2)
                  }
                  appInputStyle={{ color: this.state.interest2Color }}
                  value={this.props.interest2}
                />
              ) : null}

              <InputPicker
                // label="Капитализация процентов (ежемесячно)"
                label={strings('input.platez.label')}
                // options={['да', 'нет']}
                options={[
                  strings('input.platez.options.yes'),
                  strings('input.platez.options.no'),
                ]}
                selectedValue={this.props.platez}
                onValueChange={this.onPlatezChange}
              />

              <InputPicker
                // label="Пополнение депозита"
                label={strings('input.plusperiod.label')}
                // options={['нет', 'ежемесячно', 'ежеквартально', 'ежегодно']}
                options={[
                  strings('input.plusperiod.options.no'),
                  strings('input.plusperiod.options.monthly'),
                  strings('input.plusperiod.options.quarterly'),
                  strings('input.plusperiod.options.annually'),
                ]}
                selectedValue={this.props.plusperiod}
                onValueChange={this.onPlusperiodChange}
              />

              {Number(this.props.plusperiod) === 0 ? null : (
                <Input
                  // label="На сумму"
                  label={`${strings('input.prinplus.label')}, ${radio[
                    this.props.radio
                  ].label.charAt(0)}`}
                  // placeholder="введите сумму"
                  placeholder={strings('input.prinplus.placeholder')}
                  onChangeText={this.onPrinplusChange}
                  onBlur={() => this.onBlur('prinplus', this.props.prinplus)}
                  onFocus={() => this.onFocus('prinplus', this.props.prinplus)}
                  appInputStyle={{
                    color: this.state.prinplusColor,
                    height: 52,
                  }}
                  value={this.props.prinplus}
                />
              )}
              {this.props.country !== 1 ? (
                <InputPicker
                  // label="Налогооблажение вклада"
                  label={strings('input.taxation')}
                  // options={['да', 'нет']}
                  options={[
                    strings('input.platez.options.yes'),
                    strings('input.platez.options.no'),
                  ]}
                  selectedValue={this.props.taxCheck}
                  onValueChange={this.onTaxSelect}
                />
              ) : null}
              {this.props.taxCheck === 0 && this.props.country === 0 && (
                <InputPicker
                  // label="Ставка налога"
                  label={strings('input.taxRate')}
                  // options={['резидент РФ', 'нерезидент РФ']}
                  options={[
                    strings('settings.resident'),
                    strings('settings.non-resident'),
                  ]}
                  selectedValue={this.props.taxRate}
                  onValueChange={this.onTaxRateSelect}
                />
              )}
            </TableSection>
          </Card>

          {srok && Number(number(this.props.principal)) !== 0 && (
            <Card>
              {/* <Header headerText="Информация о выплатах" /> */}
              <Header headerText={strings('result.header')} />

              <ResultSrok
                // label={`Срок депозита ${srok}`}
                label={`${strings('result.srok.srok')} ${srok}`}
              />

              <Result
                // label="Сумма вклада
                label={`${strings('input.principal.label')}`}
                // resultData={`${radio[this.props.radio].label.charAt(0)}${principal2.toFixed(
                //   2
                // )}`}
                resultData={Number(number(this.props.principal)).toLocaleString(
                  currentLocale,
                  optionsN,
                )}
                resultPieStyle={{
                  borderLeftWidth: 5,
                  borderColor: '#ddd',
                }}
              />

              {adjunctionAll > 0 ? (
                <Result
                  // label="Сумма пополнений"
                  label={strings('result.adjunctionAll')}
                  resultData={adjunctionAll.toLocaleString(
                    currentLocale,
                    optionsN,
                  )}
                  resultPieStyle={{
                    borderLeftWidth: 5,
                    borderColor: '#a2aaa4',
                  }}
                />
              ) : null}

              <Result
                // label="Начисленные проценты"
                label={strings('result.principal2')}
                // resultData={`${radio[this.props.radio].label.charAt(0)}${principal2.toFixed(
                //   2
                // )}`}
                resultData={principal2.toLocaleString(currentLocale, optionsN)}
                resultPieStyle={{
                  borderLeftWidth: 5,
                  borderColor: '#569e69',
                }}
              />

              {this.props.taxCheck === 0 && this.props.country !== 1 && (
                <Result
                  // label="Налоги"
                  label={strings('result.taxes')}
                  resultData={tax.toLocaleString(currentLocale, optionsN)}
                  resultPieStyle={{
                    borderLeftWidth: 5,
                    borderColor: '#db2323',
                  }}
                />
              )}

              {Number(number(this.props.principal)) !== 0 && (
                <CardSection>
                  <View style={pieContainer}>
                    <View
                      style={{
                        flex: 1.9,
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontFamily: 'Ubuntu' }}>
                        {/* Сумма вклада с процентами */}
                        {strings('result.pie')}
                      </Text>
                    </View>
                    <View style={pie}>
                      <Pie
                        radius={65}
                        innerRadius={59}
                        sections={[
                          {
                            percentage:
                              (Number(number(this.props.principal)) * 100) /
                              (principal1 + tax),
                            color: '#ddd',
                          },
                          {
                            percentage:
                              (adjunctionAll * 100) / (principal1 + tax),
                            color: '#a2aaa4',
                          },
                          {
                            percentage: (principal2 * 100) / (principal1 + tax),
                            color: '#569e69',
                          },
                          {
                            percentage: (tax * 100) / (principal1 + tax),
                            color: '#db2323',
                          },
                        ]}
                        backgroundColor="#ddd"
                      />
                      <View style={gauge}>
                        <Text style={gaugeText}>
                          {principal1.toLocaleString(currentLocale, optionsN)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </CardSection>
              )}
            </Card>
          )}

          {srok && Number(number(this.props.principal)) !== 0 && !!table && (
            <Card>
              {/* <Header headerText="Выписка со счёта" /> */}
              <Header headerText={strings('table.header')} />
              <Table
                currency={radio[this.props.radio].label}
                value={table}
                language={this.props.language}
              />
            </Card>
          )}
        </ScrollView>
        {/* ) : (
          <View style={{
            flex: 1,
            justifyContent: 'center',
          }}
          >
            <ActivityIndicator size="large" color={textColor} />
          </View>
        )} */}
      </Fragment>
    );
  }
}

const styles = {
  welcome: {
    fontFamily: 'Ubuntu',
    fontSize: 17,
    margin: 10,
    textAlign: 'center',
  },
  topImage: {
    width: 193,
    height: 110,
    alignSelf: 'center',
  },
  radioStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pieContainer: {
    paddingLeft: 10,
    paddingRight: 5,
    flex: 2,
    flexDirection: 'row',
  },
  pie: {
    flex: 1.1,
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gauge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    fontFamily: 'Ubuntu',
    backgroundColor: 'transparent',
  },
};

Depo.propTypes = {
  principal: PropTypes.string,
  dateOpen: PropTypes.number, // instanceOf(Date),
  dateClosed: PropTypes.number, // instanceOf(Date),
  interest1: PropTypes.string,
  interest2: PropTypes.string,
  platez: PropTypes.number,
  plusperiod: PropTypes.number,
  prinplus: PropTypes.string,
  radio: PropTypes.number,
  taxCheck: PropTypes.number,
  taxRate: PropTypes.number,
  language: PropTypes.number,
  country: PropTypes.number,
  countryIP: PropTypes.bool,

  // доработать
  // days1: PropTypes.number,
  // srok: PropTypes.string,
  // principal2: PropTypes.number,
  // principal1: PropTypes.number,
  // adjunctionAll: PropTypes.number,
  // table: PropTypes.object,
};

const mapStateToProps = state => ({
  principal: state.depo.principal,
  dateOpen: state.depo.dateOpen,
  dateClosed: state.depo.dateClosed,
  interest1: state.depo.interest1,
  interest2: state.depo.interest2,
  platez: state.depo.platez,
  plusperiod: state.depo.plusperiod,
  prinplus: state.depo.prinplus,
  radio: state.depo.radio,
  taxCheck: state.depo.taxCheck,
  taxRate: state.depo.taxRate,
  language: state.settings.language,
  country: state.settings.country,
  countryIP: state.settings.countryIP,

  calculated: calculate(state),
});

const mapDispatchToActions = {
  principalChanged,
  dateOpenChanged,
  dateClosedChanged,
  interest1Changed,
  interest2Changed,
  platezChanged,
  plusperiodChanged,
  prinplusChanged,
  radioPressed,
  taxSelected,
  taxRateSelected,
  countryChanged,
  countryIpTriggered,
};
export default connect<any, any, any, any, any, any>(
  mapStateToProps,
  mapDispatchToActions,
)(Depo);

// @flow
import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, InteractionManager, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
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

import store from '../../store';

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

import {
  initDate, number, calculate,
} from '../../lib';

import CustomHeader from '../Common/CustomHeader';

// import {
//          principal2 as principal2Selector,
//          principal3 as principal3Selector
//        } from './src/lib/calculate';

// const userLocaleCountryCode = DeviceInfo.getDeviceCountry();

type Props = {
  principal: string,
  dateOpen: Date,
  dateClosed: Date,
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
  principalChanged: typeof principalChanged,
  dateOpenChanged: typeof dateOpenChanged,
  dateClosedChanged: typeof dateClosedChanged,
  interest1Changed: typeof interest1Changed,
  interest2Changed: typeof interest2Changed,
  platezChanged: typeof platezChanged,
  plusperiodChanged: typeof plusperiodChanged,
  prinplusChanged: typeof prinplusChanged,
  radioPressed: typeof radioPressed,
  taxSelected: typeof taxSelected,
  taxRateSelected: typeof taxRateSelected,
  countryChanged: typeof countryChanged,
  countryIpTriggered: typeof countryIpTriggered,

  calculated: typeof calculate,
  navigation: any
};

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
const url = 'http://api.ipstack.com/check?access_key=525447ceaa9c889bedee144cb8d463b2&format=1';


let currentValue;

class Depo extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: strings('header'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon
          type="Entypo"
          name="wallet"
          style={{ fontSize: 24, color: tintColor }}
        />
      ),
    };
  };

  // static navigationOptions = {
  //   headerTitle: strings('titleDeposit'),
  // };

  state = {
    didFinishInitialAnimation: false,
    principalColor: '#525050',
    interest1Color: '#525050',
    interest2Color: '#525050',
    prinplusColor: '#525050',
    isDatePickerVisible: false,
    isDatePicker2Visible: false,
    userCountryCode: currentLocale.substring(3),
  };

  async componentWillMount() {
    if (!this.props.countryIP) {
      await fetch(url)
        .then(response => response.json())
        .then((responseJson) => {
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
        });
    }
  }

  componentDidMount() {
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the data
      // this.props.dispatchDataFetchStart();
      // 4: set didFinishInitialAnimation to false
      // This will render the navigation bar and a list of players
      this.setState({
        didFinishInitialAnimation: true,
      });
    });
  }

  select = state => state.settings.country;

  onFocus = (input, text) => {
    this.setState({
      [`${input}Color`]: '#000000',
    });
    if (text === '0' || text === '0,00') {
      this.props[`${input}Changed`]('');
    } else {
      this.props[`${input}Changed`](number(text));
    }
  }

  onBlur = (input, text) => {
    this.setState({
      [`${input}Color`]: '#525050',
    });
    if (text === '') {
      this.props[`${input}Changed`]('0');
    } else {
      this.props[`${input}Changed`](
        Number(text).toLocaleString('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );
    }
  }

  setDatePickerVisible = (value) => {
    this.setState({
      isDatePickerVisible: value,
    });
  }

  setDatePicker2Visible = (value) => {
    this.setState({
      isDatePicker2Visible: value,
    });
  }

  onPrincipalChange = (text) => {
    this.props.principalChanged(number(text));
  }

  onDateOpenChange = (date) => {
    this.setDatePickerVisible(false);
    this.props.dateOpenChanged(date);
  }

  onDateClosedChange = (date) => {
    this.setDatePicker2Visible(false);
    this.props.dateClosedChanged(date);
  }

  onInterest1Change = (text) => {
    this.props.interest1Changed(number(text));
  }

  onInterest2Change = (text) => {
    this.props.interest2Changed(number(text));
  }

  onPlatezChange = (text) => {
    this.props.platezChanged(text);
  }

  onPlusperiodChange = (text) => {
    this.props.plusperiodChanged(text);
  }

  onPrinplusChange = (text) => {
    this.props.prinplusChanged(number(text));
  }

  onRadioPress = (value) => {
    this.props.radioPressed(value);
  }

  onTaxSelect = (value) => {
    this.props.taxSelected(value);
  }

  onTaxRateSelect = (value) => {
    this.props.taxRateSelected(value);
  }

  onCountryChange = (value) => {
    this.props.countryChanged(value);
  }

  onCountryIpTrigger = (value) => {
    this.props.countryIpTriggered(value);
  }

  render() {
    // console.log(store.getState());
    // console.log(this.props.calculated);

    const handleChange = () => {
      const previousValue = currentValue;
      currentValue = this.select(store.getState());
      // console.log(currentValue);
      if (previousValue !== currentValue) {
        console.log(
          'Some deep nested property changed from',
          previousValue,
          'to',
          currentValue,
        );
      }
    };
    // const unsubscribe = store.subscribe(handleChange);
    // unsubscribe();
    handleChange();


    const {
      topImage,
      welcome,
      radioStyle,
      pieContainer,
      pie,
      gauge,
      gaugeText,
      // instructions
    } = styles;
    const pic = {
      uri: 'http://banoka.ru/images/bank/08-01-17_money8.jpg',
    };
    // const { principal,
    //   //principal2,
    //   //principal3
    // } = this.props;
    // const principal2 = principal2Selector(this.props.principal);
    // const principal3 = principal3Selector(this.props.principal);

    const {
      days1, srok, principal2, principal1, tax, adjunctionAll, table,
    } = this.props.calculated;

    // const { days1, srok, payment, principal2, principal1, table } = calculate(
    //   Number(number(this.props.principal)),
    //   this.props.dateOpen,
    //   this.props.dateClosed,
    //   Number(number(this.props.interest1)) / 365 / 100,
    //   Number(number(this.props.interest2)) / 365 / 100,
    //   this.props.platez,
    //   this.props.plusperiod,
    //   Number(number(this.props.prinplus))
    // );

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

    // console.log(dateQ.toLocaleString(currentLocale, options));

    // console.log(currentLocale);
    // console.log(optionsN);
    // const num = 23234324324234.324234234;
    // console.log(num.toLocaleString(currentLocale, optionsN));

    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title={strings('titleDeposit')} drawerOpen={() => this.props.navigation.openDrawer()} />
        { this.state.didFinishInitialAnimation ? (
          <ScrollView style={{ flex: 1 }}>
            <Card>
              {/* <Header headerText="Депозитный калькулятор" /> */}
              <Header headerText={strings('header')} />
              <CardSection>
                <Image source={pic} style={topImage} />
                <Text style={welcome}>
                  {/* 'Проверьте правильность ввода:' : 'Введите информацию о депозите: */}
                  {!srok ? strings('welcome.error') : strings('welcome.go')}
                </Text>

                <RadioForm
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
                  onPress={(value) => {
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
                  value={initDate(this.props.dateOpen)}
                  onRootPress={() => this.setDatePickerVisible(true)}
                  onPress={() => this.setDatePickerVisible(true)}
                />
                <DateTimePicker
                  date={this.props.dateOpen}
                  isVisible={this.state.isDatePickerVisible}
                  onConfirm={this.onDateOpenChange}
                  onCancel={() => this.setDatePickerVisible(false)}
                  datePickerModeAndroid="spinner"
                />

                <InputDate
                  // label="Дата закрытия вклада"
                  label={strings('input.dateClosed.label')}
                  value={initDate(this.props.dateClosed)}
                  onRootPress={() => this.setDatePicker2Visible(true)}
                  onPress={() => this.setDatePicker2Visible(true)}
                />
                <DateTimePicker
                  date={this.props.dateClosed}
                  isVisible={this.state.isDatePicker2Visible}
                  onConfirm={this.onDateClosedChange}
                  onCancel={() => this.setDatePicker2Visible(false)}
                  datePickerModeAndroid="spinner"
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
                    onFocus={() => this.onFocus('interest2', this.props.interest2)}
                    appInputStyle={{ color: this.state.interest2Color }}
                    value={this.props.interest2}
                  />
                ) : null}

                <InputPicker
              // label="Капитализация процентов (ежемесячно)"
                  label={strings('input.platez.label')}
              // options={['да', 'нет']}
                  options={[strings('input.platez.options.yes'), strings('input.platez.options.no')]}
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
                    appInputStyle={{ color: this.state.prinplusColor, height: 52 }}
                    value={this.props.prinplus}
                  />
                )}
                {this.props.country !== 1 ? (
                  <InputPicker
                    label="Налогооблажение вклада"
                    // label={strings('input.plusperiod.label')}
                    // options={['да', 'нет']}
                    options={[strings('input.platez.options.yes'), strings('input.platez.options.no')]}
                    selectedValue={this.props.taxCheck}
                    onValueChange={this.onTaxSelect}
                  />
                ) : null}
                { this.props.taxCheck === 0
                  && this.props.country === 0 && (
                  <InputPicker
                    label="Ставка налога"
                    // label={strings('input.plusperiod.label')}
                    // options={['резидент РФ', 'нерезидент РФ']}
                    options={[strings('settings.resident'), strings('settings.non-resident')]}
                    selectedValue={this.props.taxRate}
                    onValueChange={this.onTaxRateSelect}
                  />
                )}
              </TableSection>
            </Card>

            {!srok || Number(number(this.props.principal)) === 0 ? null : (
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
                    resultData={adjunctionAll.toLocaleString(currentLocale, optionsN)}
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

                {this.props.taxCheck === 0 && this.props.country !== 1
                && <Result
                  // label="Налоги"
                  label={strings('result.taxes')}
                  resultData={tax.toLocaleString(currentLocale, optionsN)}
                  resultPieStyle={{
                    borderLeftWidth: 5,
                    borderColor: '#db2323',
                  }}
                />
                }

                {Number(number(this.props.principal)) !== 0 ? (
                  <CardSection>
                    <View style={pieContainer}>
                      <View
                        style={{
                          flex: 1.9,
                          justifyContent: 'center',
                        }}
                      >
                        <Text>
                          {/* Сумма вклада с процентами */}
                          {strings('result.pie')}
                        </Text>
                      </View>
                      <View style={pie}>
                        <Pie
                          radius={65}
                          innerRadius={59}
                          series={[
                            Number(number(this.props.principal)) * 100 / (principal1 + tax),
                            adjunctionAll * 100 / (principal1 + tax),
                            principal2 * 100 / (principal1 + tax),
                            tax * 100 / (principal1 + tax),
                          ]}
                          colors={['#ddd', '#a2aaa4', '#569e69', '#db2323']}
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
                ) : null}
              </Card>
            )}

            {!srok || Number(number(this.props.principal)) === 0 ? null : (
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
        ) : (
          <View style={{
            flex: 1,
            justifyContent: 'center',
          }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
        }
      </View>

    );
  }
}

const styles = {
  // container: {
  //
  //     justifyContent: 'space-between',
  //     alignItems: 'flex-start',
  //     marginLeft: 10,
  // },
  welcome: {
    fontSize: 17,
    margin: 10,
    // alignSelf: 'center',
    textAlign: 'center',
  },
  // instructions: {
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  topImage: {
    width: 193,
    height: 110,
    alignSelf: 'center',
  },
  radioStyle: {
    // color: 'gray',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pieContainer: {
    // alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    flex: 2,
    flexDirection: 'row',
    // paddingLeft: 70
  },
  pie: {
    flex: 1.1,
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  gauge: {
    position: 'absolute',
    // width: 100,
    // height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    // color: '#000',
    // fontSize: 18
  },
};

Depo.propTypes = {
  principal: PropTypes.string,
  dateOpen: PropTypes.instanceOf(Date),
  dateClosed: PropTypes.instanceOf(Date),
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
export default connect(mapStateToProps, mapDispatchToActions)(Depo);

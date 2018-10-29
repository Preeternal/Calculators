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
import DeviceInfo from 'react-native-device-info';
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
} from '../../components/common';

import { strings, currentLocale } from '../../../locales/i18n';

import {
  initDate, changeDate, number, calculate,
} from '../../lib';

import CustomHeader from '../Common/CustomHeader';

// import {
//          principal2 as principal2Selector,
//          principal3 as principal3Selector
//        } from './src/lib/calculate';

// const App = StackNavigator({
//   Home: { screen: HomeScreen },
//   Second: { screen: SecondScreen },
// });

const userLocaleCountryCode = DeviceInfo.getDeviceCountry();

class Depo extends Component {
  static navigationOptions = {
    drawerLabel: strings('header'),
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="md-calculator"
        style={{ fontSize: 24, color: tintColor }}
      />
    ),
  };

  state = {
    didFinishInitialAnimation: false,
    principalColor: '#525050',
    interest1Color: '#525050',
    interest2Color: '#525050',
    prinplusColor: '#525050',
  };

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

  onPrincipalChange = (text) => {
    this.props.principalChanged(number(text));
  }

  onDateOpenChange = (text) => {
    this.props.dateOpenChanged(text);
  }

  onDateClosedChange = (text) => {
    this.props.dateClosedChanged(text);
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

  render() {
    const {
      topImage,
      welcome,
      radioStyle,
      inputDataStyle,
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
      days1, srok, principal2, principal1, adjunctionAll, table,
    } = this.props;

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
                  {/* {!srok ? 'Проверьте правильность ввода:' : 'Введите информацию о депозите:'} */}
                  {!srok ? strings('welcome.error') : strings('welcome.go')}
                  {userLocaleCountryCode}
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

              <View style={inputDataStyle}>
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
                  value={this.props.dateOpen}
                  onRootPress={() => {
                    this.setState({
                      isDateTimePickerVisible: true,
                    });
                  }}
                  onPress={() => {
                    this.setState({
                      isDateTimePickerVisible: true,
                    });
                  }}
                />

                <DateTimePicker
                  date={changeDate(this.props.dateOpen)}
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={(date) => {
                    this.setState({
                      isDateTimePickerVisible: false,
                    });
                    this.onDateOpenChange(initDate(date));
                  }}
              //
                  onCancel={() => {
                    this.setState({
                      isDateTimePickerVisible: false,
                    });
                  }}
                  datePickerModeAndroid="spinner"
                />

                <InputDate
              // label="Дата закрытия вклада"
                  label={strings('input.dateClosed.label')}
                  value={this.props.dateClosed}
                  onRootPress={() => {
                    this.setState({
                      isDateTimePickerVisible2: true,
                    });
                  }}
                  onPress={() => {
                    this.setState({
                      isDateTimePickerVisible2: true,
                    });
                  }}
                />

                <DateTimePicker
                  date={changeDate(this.props.dateClosed)}
                  isVisible={this.state.isDateTimePickerVisible2}
                  onConfirm={(date) => {
                    this.setState({
                      isDateTimePickerVisible2: false,
                    });
                    this.onDateClosedChange(initDate(date));
                  }}
                  onCancel={() => {
                    this.setState({
                      isDateTimePickerVisible2: false,
                    });
                  }}
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
              </View>
            </Card>

            {!srok || Number(number(this.props.principal)) === 0 ? null : (
              <Card>
                {/* <Header headerText="Информация о выплатах" /> */}
                <Header headerText={strings('result.header')} />

                <ResultSrok
              // label={`Срок депозита ${srok}`}
                  label={`${strings('result.srok.srok')} ${srok}`}
                />

                {/* {isNaN(payment) || payment === Infinity ? null : (
              <Result
                //label="Ваша месячная выручка (в среднем)"
                label={strings('result.payment')}
                //resultData=
                //{`${radio[this.props.radio].label.charAt(0)}${payment.toFixed(2)}`}
                resultData={payment.toLocaleString(currentLocale, optionsN)}
              />
            )} */}

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
                    // color: '#ddd'
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
                      // color: '#a2aaa4'
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
                    // color: '#569e69'
                  }}
                />

                {/* <Result
              //label="Полная сумма на руки"
              label={strings('result.principal1')}
              // resultData={`${radio[this.props.radio].label.charAt(0)}${principal1.toFixed(
              //   2
              // )}`}
              resultData={principal1.toLocaleString(currentLocale, optionsN)}
            /> */}
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
                          {/* Доходность */}
                          {strings('result.pie')}
                        </Text>
                      </View>
                      <View style={pie}>
                        <Pie
                          radius={65}
                          innerRadius={59}
                          series={[
                            Number(number(this.props.principal)) * 100 / principal1,
                            adjunctionAll * 100 / principal1,
                            principal2 * 100 / principal1,
                          ]}
                      // colors={['#ddd', '#f00']}
                          colors={['#ddd', '#a2aaa4', '#569e69']}
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
                <Table currency={radio[this.props.radio].label} value={table} />
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
  inputDataStyle: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
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
  dateOpen: PropTypes.string,
  dateClosed: PropTypes.string,
  interest1: PropTypes.string,
  interest2: PropTypes.string,
  platez: PropTypes.number,
  plusperiod: PropTypes.number,
  prinplus: PropTypes.string,
  radio: PropTypes.number,

  days1: PropTypes.number,
  srok: PropTypes.string,
  principal2: PropTypes.number,
  principal1: PropTypes.number,
  adjunctionAll: PropTypes.number,
  table: PropTypes.object,
};

const mapStateToProps = state => ({
  principal: state.form.principal,
  // principal2: principal2Selector(state.form.principal),
  // principal3: principal3Selector(state.form.principal),
  dateOpen: state.form.dateOpen,
  dateClosed: state.form.dateClosed,
  interest1: state.form.interest1,
  interest2: state.form.interest2,
  platez: state.form.platez,
  plusperiod: state.form.plusperiod,
  prinplus: state.form.prinplus,
  radio: state.form.radio,

  days1: calculate(state)[0],
  srok: calculate(state)[1],
  principal2: calculate(state)[2],
  principal1: calculate(state)[3],
  adjunctionAll: calculate(state)[4],
  table: calculate(state)[5],

  // days1,
  // srok,
  // payment,
  // principal2,
  // principal1,
  // table
});
export default connect(mapStateToProps, {
  principalChanged,
  dateOpenChanged,
  dateClosedChanged,
  interest1Changed,
  interest2Changed,
  platezChanged,
  plusperiodChanged,
  prinplusChanged,
  radioPressed,
})(Depo);

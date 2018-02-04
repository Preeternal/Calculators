import React, { Component, Fragment } from 'react';

import { Text, View, Image } from 'react-native';

// import {
// StackNavigator,
// } from 'react-navigation';

import RadioForm from 'react-native-simple-radio-button';
// RadioButton,
// RadioButtonInput,
// RadioButtonLabel

import DateTimePicker from 'react-native-modal-datetime-picker';

import { connect } from 'react-redux';

// import Button from 'react-native-button';
import Pie from 'react-native-pie';

import {
  principalChanged,
  dateOpenChanged,
  dateClosedChanged,
  interest1Changed,
  interest2Changed,
  platezChanged,
  plusperiodChanged,
  prinplusChanged
} from './src/actions';

import {
  Input,
  InputDate,
  InputPicker,
  //  Button,
  CardSection,
  Card,
  Header,
  Result,
  ResultSrok,
  //Table,
  Table2
} from './src/components/common';

import { initDate, changeDate, number, calculate } from './src/lib';
// import {
//          principal2 as principal2Selector,
//          principal3 as principal3Selector
//        } from './src/lib/calculate';

// const App = StackNavigator({
//   Home: { screen: HomeScreen },
//   Second: { screen: SecondScreen },
// });

class App extends Component {
  constructor() {
    super();
    this.state = {
      types1: [
        {
          label: '$usd  ',
          value: 0
        },
        {
          label: '€eur  ',
          value: 1
        },
        {
          label: '₽руб',
          value: 2
        }
      ],
      // value1: 0,
      value1Index: 0,
      principalColor: '#525050',
      interest1Color: '#525050',
      interest2Color: '#525050',
      prinplusColor: '#525050'
    };
  }

  // state = { email: '', password: '', error: '', loading: false };
  // state = { isDateTimePickerVisible: false };

  onFocus(input, text) {
    this.setState({
      [`${input}Color`]: '#000000'
    });
    //console.log('focus');
    if (text === '0') {
      this.props[`${input}Changed`]('');
    }
  }

  onBlur(input, text) {
    this.setState({
      [`${input}Color`]: '#525050'
    });
    //console.log('blur');
    if (text === '') {
      this.props[`${input}Changed`]('0');
    }
  }

  onPrincipalChange(text) {
    this.props.principalChanged(number(text));
  }

  onDateOpenChange(text) {
    this.props.dateOpenChanged(text);
  }

  onDateClosedChange(text) {
    this.props.dateClosedChanged(text);
  }

  onInterest1Change(text) {
    this.props.interest1Changed(number(text));
  }

  onInterest2Change(text) {
    this.props.interest2Changed(number(text));
  }

  onPlatezChange(text) {
    this.props.platezChanged(text);
    // console.log(text);
  }

  onPlusperiodChange(text) {
    this.props.plusperiodChanged(text);
    // console.log(text);
  }

  onPrinplusChange(text) {
    this.props.prinplusChanged(number(text));
    // console.log(text);
  }

  render() {
    const {
      topimage,
      welcome,
      radioStyle,
      inputDataStyle,
      pieContainer,
      pie,
      gauge,
      gaugeText
      //instructions
    } = styles;
    const pic = {
      uri: 'http://banoka.ru/images/bank/08-01-17_money8.jpg'
    };
    // const { principal,
    //   //principal2,
    //   //principal3
    // } = this.props;
    // const principal2 = principal2Selector(this.props.principal);
    // const principal3 = principal3Selector(this.props.principal);

    const { days1, srok, payment, principal2, principal1, table } = calculate(
      Number(this.props.principal),
      this.props.dateOpen,
      this.props.dateClosed,
      Number(this.props.interest1) / 365 / 100,
      Number(this.props.interest2) / 365 / 100,
      this.props.platez,
      this.props.plusperiod,
      Number(this.props.prinplus)
    );

    // const {days1,
    //   srok,
    //   payment,
    //   principal2,
    //   principal1,
    //   table} = this.props;

    // const clears = (text) => {
    //   console.log(text);
    //   if (text === '0') {
    //     return text = '';
    //   } else {
    //     return text;
    //   }
    //   console.log(text);
    // };

    // let platezOptions=['да', '● нет '];
    // platezOptions[this.props.platez] = `√ ${platezOptions[this.props.platez]}`;

    return (
      <Fragment>
        <Card>
          <Header headerText="Депозитный калькулятор" />
          <CardSection>
            <Image source={pic} style={topimage} />
            <Text style={welcome}>
              {!srok ? 'Проверьте правильность ввода:' : 'Введите информацию о депозите:'}
            </Text>

            <RadioForm
              style={radioStyle}
              // ref="radioForm"
              radio_props={this.state.types1}
              initial={0}
              formHorizontal
              labelHorizontal
              buttonColor="#757171"
              selectedButtonColor="#525050"
              // buttonInnerColor={'#e74c3c'}
              // buttonOuterColor={'#757171'}
              //buttonSize={15}
              // buttonOuterSize={60}
              labelColor="#757171"
              selectedLabelColor="#525050"
              animation
              onPress={(value, index) => {
                this.setState({
                  // value1: value,
                  value1Index: index
                });
              }}
            />
          </CardSection>

          <View style={inputDataStyle}>
            <Input
              placeholder="введите сумму"
              label="Сумма вклада"
              // label={this.state.types1[this.state.value1Index].label}
              value={this.props.principal}
              onChangeText={this.onPrincipalChange.bind(this)}
              onBlur={() => this.onBlur('principal', this.props.principal)}
              onFocus={() => this.onFocus('principal', this.props.principal)}
              style={{ color: this.state.principalColor }}
              //value={this.state.email}
              //onChangeText={email => this.setState({ email })}
            />
            <InputDate
              label="Дата открытия вклада"
              value={this.props.dateOpen}
              onPress={() => {
                this.setState({
                  isDateTimePickerVisible: true
                });
              }}
            />

            <DateTimePicker
              date={changeDate(this.props.dateOpen)}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={date => {
                //console.log('A date has been picked: ', date);
                this.setState({
                  isDateTimePickerVisible: false
                });
                this.onDateOpenChange(initDate(date));
              }}
              //
              onCancel={() => {
                this.setState({
                  isDateTimePickerVisible: false
                });
              }}
              datePickerModeAndroid="spinner"
            />

            {/* <Button
      //             style={{ fontSize: 20, borderColor: '#2196f3', borderWidth: 2 }}
      //             onPress={showAndroidDatePicker} >
      //             Обновить
      //           </Button> */}

            <InputDate
              label="Дата закрытия вклада"
              value={this.props.dateClosed}
              onPress={() => {
                this.setState({
                  isDateTimePickerVisible2: true
                });
              }}
            />

            <DateTimePicker
              date={changeDate(this.props.dateClosed)}
              isVisible={this.state.isDateTimePickerVisible2}
              onConfirm={date => {
                //console.log('A date has been picked: ', date);
                this.setState({
                  isDateTimePickerVisible2: false
                });
                this.onDateClosedChange(initDate(date));
              }}
              //
              onCancel={() => {
                this.setState({
                  isDateTimePickerVisible2: false
                });
              }}
              datePickerModeAndroid="spinner"
            />
            <Input
              placeholder="введите ставку"
              label="Процентная ставка"
              //label={this.state.types1[this.state.value1Index].label}
              onChangeText={this.onInterest1Change.bind(this)}
              onBlur={() => this.onBlur('interest1', this.props.interest1)}
              onFocus={() => this.onFocus('interest1', this.props.interest1)}
              style={{ color: this.state.interest1Color }}
              value={this.props.interest1}
              //value={this.state.email}
              //onChangeText={email => this.setState({ email })}
            />

            {days1 > 0 ? (
              <Input
                placeholder="введите ставку"
                label="Процентная ставка при досрочном рассторжении вклада (не полный месяц)"
                //label={this.state.types1[this.state.value1Index].label}
                onChangeText={this.onInterest2Change.bind(this)}
                onBlur={() => this.onBlur('interest2', this.props.interest2)}
                onFocus={() => this.onFocus('interest2', this.props.interest2)}
                style={{ color: this.state.interest2Color }}
                value={this.props.interest2}
                //value={this.state.email}
                //onChangeText={email => this.setState({ email })}
              />
            ) : null}

            <InputPicker
              label="Капитализация процентов (ежемесячно)"
              options={['да', 'нет']}
              selectedValue={this.props.platez}
              onValueChange={this.onPlatezChange.bind(this)}
            />

            <InputPicker
              label="Пополнение депозита"
              options={['нет', 'ежемесячно', 'ежеквартально', 'ежегодно']}
              selectedValue={this.props.plusperiod}
              onValueChange={this.onPlusperiodChange.bind(this)}
              // onValueChange={(itemValue, itemLabel) => this.setState({
              //   plusperiod: itemValue,
              //   plusperiodIndex: itemLabel
              //  })}
            />

            {parseFloat(this.props.plusperiod) === 0 ? null : (
              <Input
                label="На сумму"
                placeholder="введите сумму"
                onChangeText={this.onPrinplusChange.bind(this)}
                onBlur={() => this.onBlur('prinplus', this.props.prinplus)}
                onFocus={() => this.onFocus('prinplus', this.props.prinplus)}
                style={{ color: this.state.prinplusColor, height: 52 }}
                value={this.props.prinplus}
              />
            )}
          </View>
        </Card>

        {!srok ? null : (
          <Card>
            <Header headerText="Информация о выплатах" />

            {/* <Text style={welcome}>
                Информация о выплатах:
              </Text> */}

            <ResultSrok
              label={`Срок депозита ${srok}`}
              //resultData={this.props.dateClosed}
            />

            {isNaN(payment) || payment === Infinity ? null : (
              <Result
                label="Ваша месячная выручка (в среднем)"
                resultData={`${this.state.types1[this.state.value1Index].label.charAt(
                  0
                )}${payment.toFixed(2)}`}
              />
            )}

            <Result
              label="Сумма выплаты всех начислений"
              resultData={`${this.state.types1[this.state.value1Index].label.charAt(
                0
              )}${principal2.toFixed(2)}`}
            />

            <Result
              label="Полная сумма на руки"
              resultData={`${this.state.types1[this.state.value1Index].label.charAt(
                0
              )}${principal1.toFixed(2)}`}
            />
            <CardSection>
              <View style={pieContainer}>
                <Text> Доходность </Text>
                <View style={pie}>
                  <Pie
                    radius={50}
                    innerRadius={45}
                    series={[Number((principal2 / Number(this.props.principal) * 100).toFixed(2))]}
                    colors={['#f00']}
                    backgroundColor="#ddd"
                  />
                  <View style={gauge}>
                    <Text style={gaugeText}>
                      {(principal2 / Number(this.props.principal) * 100).toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>
            </CardSection>
          </Card>
        )}

        {!srok ? null : (
          <Card>
            <Header headerText="Выписка со счёта" />
            <Table2 value={table} />
          </Card>
        )}
      </Fragment>
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
    //alignSelf: 'center',
    textAlign: 'center'
  },
  // instructions: {
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  topimage: {
    width: 193,
    height: 110,
    alignSelf: 'center'
  },
  radioStyle: {
    // color: 'gray',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputDataStyle: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  // radioButtonWrap: {
  //   marginRight: 5
  // },
  // iStyle: {
  //   fontSize: 15,
  //   margin: 10,
  //   alignSelf: 'stretch',
  //   textAlign: 'center'
  // },

  pieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 70
  },

  pie: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
    //flexDirection: 'row',
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24
  }
};

const mapStateToProps = state => {
  // const { days1, srok, payment, principal2, principal1, table } = calculate(
  //   Number(state.form.principal),
  //   state.form.dateOpen,
  //   state.form.dateClosed,
  //   Number(state.form.interest1) / 365 / 100,
  //   Number(state.form.interest2) / 365 / 100,
  //   state.form.platez,
  //   state.form.plusperiod,
  //   Number(state.form.prinplus)
  //);

  return {
    principal: state.form.principal,
    // principal2: principal2Selector(state.form.principal),
    // principal3: principal3Selector(state.form.principal),
    dateOpen: state.form.dateOpen,
    dateClosed: state.form.dateClosed,
    interest1: state.form.interest1,
    interest2: state.form.interest2,
    platez: state.form.platez,
    plusperiod: state.form.plusperiod,
    prinplus: state.form.prinplus

    // days1,
    // srok,
    // payment,
    // principal2,
    // principal1,
    // table
  };
};

export default connect(mapStateToProps, {
  principalChanged,
  dateOpenChanged,
  dateClosedChanged,
  interest1Changed,
  interest2Changed,
  platezChanged,
  plusperiodChanged,
  prinplusChanged
})(App);

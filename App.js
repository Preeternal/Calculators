import React, {
  Component,
} from 'react';

import {
  //  AppRegistry,
  //  StyleSheet,
  Text,
  View,
  Image,
  // Picker
  // TouchableOpacity,
  // DatePickerAndroid,
  // TextInput,
} from 'react-native';

// import {
// StackNavigator,
// } from 'react-navigation';

import RadioForm, {
// RadioButton,
// RadioButtonInput,
// RadioButtonLabel
} from 'react-native-simple-radio-button';

import DateTimePicker from 'react-native-modal-datetime-picker';

// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import { connect } from 'react-redux';

// import Button from 'react-native-button';

import { principalChanged,
  dateOpenChanged,
  dateClosedChanged,
  interest1Changed,
  interest2Changed,
  platezChanged,
  plusperiodChanged,
  prinplusChanged
} from './src/actions';

import { Input,
  InputDate,
  InputPicker,
  //  Button,
  CardSection,
  Card,
  Header,
  Result,
  ResultSrok,
  Table
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
    if (text === '0') {
      this.props[`${input}Changed`]('');
    }
  }

  onBlur(input, text) {
    this.setState({
      [`${input}Color`]: '#525050'
    });
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
      topimage, welcome, radioStyle, instructions
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
    const { srok, payment, principal2, principal1, table } = calculate(
      Number(this.props.principal),
      this.props.dateOpen,
      this.props.dateClosed,
      Number(this.props.interest1) / 365 / 100,
      Number(this.props.interest2) / 365 / 100,
      this.props.platez,
      this.props.plusperiod,
      Number(this.props.prinplus)
    );

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
      <View>
        <Card>
          <Header headerText="Депозитный калькулятор" />
          <CardSection>
            <Image source={pic} style={topimage} />
            <Text style={welcome}>
              {!srok ? 'Проверьте правильность ввода:' :
                'Введите информацию о депозите:'
              }
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
              buttonSize={15}
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
          <Input
            placeholder="введите сумму"
            label="Сумма вклада"
            // label={this.state.types1[this.state.value1Index].label}
            value={this.props.principal}
            onChangeText={this.onPrincipalChange.bind(this)}
            onBlur={ () => this.onBlur('principal', this.props.principal) }
            onFocus={ () => this.onFocus('principal', this.props.principal) }
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
            onConfirm={(date) => {
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
            onConfirm={(date) => {
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
            onBlur={ () => this.onBlur('interest1', this.props.interest1) }
            onFocus={ () => this.onFocus('interest1', this.props.interest1) }
            style={{ color: this.state.interest1Color }}
            value={this.props.interest1}
          //value={this.state.email}
          //onChangeText={email => this.setState({ email })}
          />

          <Input
            placeholder="введите ставку"
            label="Процентная ставка при досрочном рассторжении вклада (не полный месяц)"
            //label={this.state.types1[this.state.value1Index].label}
            onChangeText={this.onInterest2Change.bind(this)}
            onBlur={ () => this.onBlur('interest2', this.props.interest2) }
            onFocus={ () => this.onFocus('interest2', this.props.interest2) }
            style={{ color: this.state.interest2Color }}
            value={this.props.interest2}
          //value={this.state.email}
          //onChangeText={email => this.setState({ email })}
          />

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

          {parseFloat(this.props.plusperiod) === 0 ?
            null :
            (<Input
              label="На сумму"
              placeholder="введите сумму"
              onChangeText={this.onPrinplusChange.bind(this)}
              onBlur={ () => this.onBlur('prinplus', this.props.prinplus) }
              onFocus={ () => this.onFocus('prinplus', this.props.prinplus) }
              style={{ color: this.state.prinplusColor }}
              value={this.props.prinplus}
            />)
          }
        </Card>

        {!srok ? null :
          <Card>
            <Header headerText="Информация о выплатах" />

            {/* <Text style={welcome}>
                Информация о выплатах:
              </Text> */}

            <ResultSrok
              label={`Срок депозита ${srok}`}
              //resultData={this.props.dateClosed}
            />

            <Result
              label="Ваша месячная выручка (в среднем)"
              resultData={
                `${
                  this.state.types1[this.state.value1Index].label.charAt(0)}${
                  payment.toFixed(2)
                }`
              }
            />

            <Result
              label="Сумма выплаты всех начислений"
              resultData={
                `${
                  this.state.types1[this.state.value1Index].label.charAt(0)}${
                  principal2.toFixed(2)
                }`
              }
            />

            <Result
              label="Полная сумма на руки"
              resultData={
                `${
                  this.state.types1[this.state.value1Index].label.charAt(0)}${
                  principal1.toFixed(2)
                }`
              }
            />


            {/* <Text style={instructions}> */}
            {/* {'\n'}
          {this.props.dateOpen}{'\n'}
          {this.props.principal}{'\n'}
          {this.props.dateClosed}{'\n'}
          {this.props.interest1}{'\n'}
          {this.props.interest2}{'\n'}
          {this.props.platez}{'\n'}
          {this.props.plusperiod}{'\n'}
          {this.props.prinplus}{'\n'}
          {this.state.types1[this.state.value1Index].label}{'\n'} */}
            {/* {principal2}{'\n'}
          {principal3} */}
            {/* {`${principal2}
          ${totalinterest1}
          ${srok}`}
          {'\n'} */}
            {/* {table.n} */}
            {/*  {console.log(this.state)} */}
            {/* </Text> */}

          </Card>
        }




        {!srok ? null :
          <Card>
            <Header headerText="Выписка со счёта" />
            <Table
              col1={table.n}
              col2={table.date}
              col3={table.totalinterest1}
              col4={table.daysY}
              col5={table.totalinterest2}
              col6={table.principal1}
            />
          </Card>
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
    alignSelf: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
  topimage: {
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
  // radioButtonWrap: {
  //   marginRight: 5
  // },
  // iStyle: {
  //   fontSize: 15,
  //   margin: 10,
  //   alignSelf: 'stretch',
  //   textAlign: 'center'
  // },

};


const mapStateToProps = (state) => {
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

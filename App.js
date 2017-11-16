import React, {
    Component
} from 'react';

import {
    //AppRegistry,
    //StyleSheet,
    Text,
    //View,
    Image,
    //Picker
    //TouchableOpacity,
    //DatePickerAndroid,
    //TextInput,
} from 'react-native';

import {
  //StackNavigator,
} from 'react-navigation';

import RadioForm, {
    //RadioButton,
    //RadioButtonInput,
    //RadioButtonLabel
} from 'react-native-simple-radio-button';

import DateTimePicker from 'react-native-modal-datetime-picker';


import { connect } from 'react-redux';
//import moment from 'moment';

//import Button from 'react-native-button';

import { principalChanged,
         dateOpenChanged,
         dateClosedChanged,
         interest1Changed,
         interest2Changed,
         platezChanged,
         plusperiodChanged,
         prinplusChanged
       } from './src/actions';
//import CalendarTest from './src/components/2.js';
import { initDate, changeDate, number, calculate } from './src/lib';
// import {
//          principal2 as principal2Selector,
//          principal3 as principal3Selector
//        } from './src/lib/calculate';
import { Input,
         InputDate,
         InputPicker,
         //Button,
         CardSection,
         Card,
         Header,
         Result,
         ResultSrok
        } from './src/components/common';
//import DatePicker from './src/components/DatePicker.js';

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
            value1: 0,
            value1Index: 0,
        };
    }

    //state = { email: '', password: '', error: '', loading: false };
    //state = { isDateTimePickerVisible: false };


    onPrincipalChange(text) {
      const numberT = number(text);
      this.props.principalChanged(numberT);
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
      //console.log(text);
    }

    onPlusperiodChange(text) {
      this.props.plusperiodChanged(text);
      //console.log(text);
    }

    onPrinplusChange(text) {
      this.props.prinplusChanged(number(text));
      //console.log(text);
    }


        render() {
        const { topimage, welcome, radioStyle, instructions } = styles;
        const pic = {
            uri: 'http://banoka.ru/images/bank/08-01-17_money8.jpg'
        };
        // const { principal,
        //   //principal2,
        //   //principal3
        // } = this.props;
        // const principal2 = principal2Selector(this.props.principal);
        // const principal3 = principal3Selector(this.props.principal);
        const { principal2, principal3, srok } = calculate(
          this.props.principal,
          this.props.dateOpen,
          this.props.dateClosed
        );

        //let platezOptions=['да', '● нет '];
        //platezOptions[this.props.platez] = `√ ${platezOptions[this.props.platez]}`;

        return (
            <Card>

                 <Header headerText="Депозитный калькулятор" />
                 <CardSection>
                   <Image source={pic} style={topimage} />
                 </CardSection>

                 <CardSection>

                  <Text style={welcome}>
                      {!srok ? 'Проверьте правильность ввода:' :  
                        'Введите информацию о депозите:'
                      }
                  </Text>

                  <RadioForm
                      style={radioStyle}
                      ref="radioForm"
                      radio_props={this.state.types1}
                      initial={0}
                      formHorizontal
                      labelHorizontal
                      buttonColor={'#757171'}
                      selectedButtonColor={'#525050'}
                      //buttonInnerColor={'#e74c3c'}
                      //buttonOuterColor={'#757171'}
                      buttonSize={15}
                      //buttonOuterSize={60}
                      labelColor={'#757171'}
                      selectedLabelColor={'#525050'}
                      animation
                      onPress={(value, index) => {
                        this.setState({
                          value1: value,
                          value1Index: index
                        });
                      }}
                  />

                   {/* <Text style={iStyle}>
        //               выбрано: {this.state.types1[this.state.value1Index].label}
        //           </Text> */}

                  {/* <Text style={instructions}>
                     1) Сумма Вашего вклада (любая сумма):{'\n'}
                  </Text> */}

                  <Input
                    placeholder="Сумма вклада"
                    label="Сумма вклада"
                    //label={this.state.types1[this.state.value1Index].label}
                    value={this.props.principal}
                    onChangeText={this.onPrincipalChange.bind(this)}
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
                    datePickerModeAndroid='spinner'
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
                    datePickerModeAndroid='spinner'
                  />
                  <Input
                    placeholder="Ставка"
                    label='Процентная ставка'
                    //label={this.state.types1[this.state.value1Index].label}
                    onChangeText={this.onInterest1Change.bind(this)}
                    value={this.props.interest1}
                    //value={this.state.email}
                    //onChangeText={email => this.setState({ email })}
                  />

                  <Input
                    placeholder="Ставка"
                    label='Процентная ставка при досрочном рассторжении вклада (не полный месяц)'
                    //label={this.state.types1[this.state.value1Index].label}
                    onChangeText={this.onInterest2Change.bind(this)}
                    value={this.props.interest2}
                    //value={this.state.email}
                    //onChangeText={email => this.setState({ email })}
                  />

                  <InputPicker
                    label='Капитализация процентов (ежемесячно)'
                    options={['да', 'нет']}
                    selectedValue={this.props.platez}
                    onValueChange={this.onPlatezChange.bind(this)}
                  />

                  <InputPicker
                    label='Пополнение депозита'
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
                        value={this.props.prinplus}
                      />)
                  }

                </CardSection>
              {!srok ? null :
                <CardSection>

                  <Text style={welcome}>
                        Информация о выплатах:
                  </Text>

                  <ResultSrok
                    label={`Срок депозита ${srok}`}
                    //resultData={this.props.dateClosed}
                  />

                  <Result
                    label="Ваша месячная выручка (в среднем)"
                    resultData={
                      `${
                        this.state.types1[this.state.value1Index].label.charAt(0)}${
                        this.props.principal
                        }`
                    }
                  />

                  <Result
                    label="Сумма выплаты всех начислений"
                    resultData={
                      `${
                        this.state.types1[this.state.value1Index].label.charAt(0)}${
                        this.props.principal
                        }`
                    }
                  />

                  <Result
                    label="Полная сумма на руки"
                    resultData={
                      `${
                        this.state.types1[this.state.value1Index].label.charAt(0)}${
                        this.props.principal
                        }`
                    }
                  />


                   <Text style={instructions}>
                         {'\n'}
                         {this.props.dateOpen}{'\n'}
                         {this.props.principal}{'\n'}
                         {this.props.dateClosed}{'\n'}
                         {this.props.interest1}{'\n'}
                         {this.props.interest2}{'\n'}
                         {this.props.platez}{'\n'}
                         {this.props.plusperiod}{'\n'}
                         {this.props.prinplus}{'\n'}
                         {this.state.types1[this.state.value1Index].label}{'\n'}
                         {/* {principal2}{'\n'}
                         {principal3} */}
                         {`${principal2} ${principal3} ${srok}`}
                   </Text>

                 </CardSection>
              }
                 <Header headerText="The end" />

         </Card>

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
      //color: 'gray',
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


const mapStateToProps = state => {
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

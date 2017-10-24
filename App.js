import React, {
    Component
} from 'react';

import {
    //AppRegistry,
    //StyleSheet,
    Text,
    //View,
    Image,
    TouchableOpacity,
    DatePickerAndroid,
    //TextInput,
} from 'react-native';

import RadioForm, {
    //RadioButton,
    //RadioButtonInput,
    //RadioButtonLabel
} from 'react-native-simple-radio-button';

import DateTimePicker from 'react-native-modal-datetime-picker';


import { connect } from 'react-redux';

//import Button from 'react-native-button';

import { principalChanged, dateOpenChanged } from './src/actions';
//import CalendarTest from './src/components/2.js';
import { Input, Button, CardSection, Card, Header } from './src/components/common';


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
      this.props.principalChanged(text);
    }

    onDateOpenChange(text) {
      this.props.dateOpenChanged(text);
    }


    //showDateTimePicker() { this.setState({ isDateTimePickerVisible: true }); }

    //hideDateTimePicker() { this.setState({ isDateTimePickerVisible: false }); }

    // handleDatePicked(date) {
    //     console.log('A date has been picked: ', date);
    //     this.hideDateTimePicker();
    // }

        render() {
        const { topimage, welcome, radioStyle, instructions } = styles;
        const pic = {
            uri: 'http://banoka.ru/images/bank/08-01-17_money8.jpg'
        };
        let date2 = 0;


        return (
            <Card>
                <Header headerText="Депозитный калькулятор" />
                <CardSection>
                  <Image source={pic} style={topimage} />
                </CardSection>
                <CardSection>
                  <Text style={welcome}>
                       Введите информацию о депозите:
                  </Text>
                {/* </CardSection>
                <CardSection> */}
                  <RadioForm
                    style={radioStyle}
                    ref="radioForm"
                    radio_props={this.state.types1}
                    initial={0}
                    formHorizontal
                    labelHorizontal
                    buttonColor={'#757171'}
                    //buttonInnerColor={'#e74c3c'}
                    //buttonOuterColor={'#757171'}
                    //buttonSize={40}
                    //buttonOuterSize={60}
                    labelColor={'#757171'}
                    animation
                    onPress={(value, index) => {
                      this.setState({
                        value1: value,
                        value1Index: index
                      });
                    }}
                  />
                  {/* <Text style={iStyle}>
                      выбрано: {this.state.types1[this.state.value1Index].label}
                  </Text> */}
                {/* </CardSection> */}
                {/* <CardSection> */}
                  <Text style={instructions}>
                    1) Сумма Вашего вклада (любая сумма):
                  </Text>

                  <Input
                    placeholder="Сумма вклада"
                    label={this.state.types1[this.state.value1Index].label}
                    onChangeText={this.onPrincipalChange.bind(this)}
                    value={this.props.principal}
                    //value={this.state.email}
                    //onChangeText={email => this.setState({ email })}
                  />
                {/* </CardSection>
                <CardSection> */}
                  <Text style={instructions}>
                    2) Дата открытия вклада{'\n'}
                  </Text>
                  <Input
                    placeholder="Дата открытия"
                    label="Дата"
                    onChangeText={this.onDateOpenChange.bind(this)}
                    value={this.props.dateOpen}
                  />
                  {/* <Button
                    style={{ fontSize: 20, borderColor: '#2196f3', borderWidth: 2 }}
                    onPress={showAndroidDatePicker} >
                    Обновить
                  </Button> */}
                  <Text style={instructions}>
                    3) Дата закрытия вклада{'\n'}
                  </Text>
                  <Input
                    placeholder="Дата открытия"
                    label="Дата"
                    //onChangeText={() => {
                    onSelectionChange={() => {
                      this.setState({
                        isDateTimePickerVisible: true
                      });
                    }}
                    value={this.props.dateOpen}
                  />

                    {/* <TouchableOpacity
                      //onPress={this.showDateTimePicker}
                      onPress={() => {
                        this.setState({
                          isDateTimePickerVisible: true
                        });
                      }}
                    >
                      <Text>{this.props.dateOpen}</Text>
                    </TouchableOpacity> */}
                      <Text>{date2}</Text>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={(date) => {
                        console.log('A date has been picked: ', date);
                        date2 = date;
                        this.setState({
                          isDateTimePickerVisible: false
                        });
                      }}
                      //
                      onCancel={() => {
                        this.setState({
                          isDateTimePickerVisible: false
                        });
                      }}
                      datePickerModeAndroid='spinner'
                    />

                  <Text style={instructions}>
                    2) Дата открытия вклада {this.props.dateOpen} {this.props.principal}
                  </Text>
                  {/* <Text>
                    {DatePickerAndroid.open({
                      date: new Date(2020, 4, 25),
                      mode: 'spinner'
                      })
                    }
                  </Text> */}

                  {/* <Button onPress={this.onButtonPress.bind(this)}>
                      Календарь
                  </Button> */}
                </CardSection>
                        <TouchableOpacity
                          //onPress={this.showDateTimePicker}
                          onPress={() => {
                            this.setState({
                              isDateTimePickerVisible: true
                            });
                          }}
                        >
                          <Text>{this.props.dateOpen}</Text>
                        </TouchableOpacity>
                        <DateTimePicker
                          isVisible={this.state.isDateTimePickerVisible}
                          onConfirm={(date) => {
                            console.log('A date has been picked: ', date);
                            this.setState({
                              isDateTimePickerVisible: false
                            });
                          }}
                          //
                          onCancel={() => {
                            this.setState({
                              isDateTimePickerVisible: false
                            });
                          }}
                          datePickerModeAndroid='spinner'
                        />

                {/* <CalendarTest /> */}


            </Card>
        //  </Provider>
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
        fontSize: 16,
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
    dateOpen: state.form.dateOpen
  };
};

export default connect(mapStateToProps, { principalChanged, dateOpenChanged })(App);

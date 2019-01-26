// @flow
import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import Pie from 'react-native-pie';
import { Icon } from 'native-base';
import 'number-to-locale-string';

import {
  creditPrincipalChanged,
  creditInterestChanged,
  creditDateOpenChanged,
  creditSrokValueChanged,
  creditSrokOptionSelected,
  creditPlatezSelected,
  creditEdinComValueChanged,
  creditEdinComOptionSelected,
  creditStartCostComChanged,
  creditFinCostComChanged,
  creditAcCountComChanged,
  radioPressed,
} from '../../actions';

import {
  Input,
  InputTextPicker,
  InputPicker,
  InputDate,
  CardSection,
  Card,
  Header,
  Result,
  ResultSrok,
  CreditTable,
  TableSection,
} from '../../components/common';

import { strings, currentLocale } from '../../../locales/i18n';

import {
  initDate, number, creditCalculate,
} from '../../lib';

import CustomHeader from '../Common/CustomHeader';

type Props = {
  creditPrincipal: string,
  creditInterest: string,
  creditDateOpen: Date,
  creditSrok: string,
  creditSrokOption: number,
  creditPlatez: number,
  creditEdinCom: string,
  creditEdinComOption: number,
  creditStartCostCom: string,
  creditFinCostCom: string,
  creditAcCountCom: string,
  radio: number,
  language: number,
  creditPrincipalChanged: typeof creditPrincipalChanged,
  creditInterestChanged: typeof creditInterestChanged,
  creditDateOpenChanged: typeof creditDateOpenChanged,
  creditSrokValueChanged: typeof creditSrokValueChanged,
  creditSrokOptionSelected: typeof creditSrokOptionSelected,
  creditPlatezSelected: typeof creditPlatezSelected,
  creditEdinComValueChanged: typeof creditEdinComValueChanged,
  creditEdinComOptionSelected: typeof creditEdinComOptionSelected,
  creditStartCostComChanged: typeof creditStartCostComChanged,
  creditFinCostComChanged: typeof creditFinCostComChanged,
  creditAcCountComChanged: typeof creditAcCountComChanged,
  radioPressed: typeof radioPressed,

  calculated: typeof creditCalculate,
  navigation: any
};

type State = {
  creditPrincipalColor?: string,
  creditInterestColor?: string,
  creditSrokValueColor?: string,
  creditEdinComColor?: string,
  creditStartCostComColor?: string,
  creditFinCostComColor?: string,
  creditAcCountComColor?: string,
  isDatePickerVisible?: boolean,
  detailsHeaderMargin?: number,
  width?: number
};

const textColor = '#525050';
const activeTextColor = '#000000';

class Credit extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: strings('headerCredit'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="md-download"
          style={{ fontSize: 24, color: tintColor }}
        />
      ),
    };
  };


  state = {
    creditPrincipalColor: textColor,
    creditInterestColor: textColor,
    creditSrokValueColor: textColor,
    creditEdinComColor: textColor,
    creditStartCostComColor: textColor,
    creditFinCostComColor: textColor,
    creditAcCountComColor: textColor,
    isDatePickerVisible: false,
    detailsHeaderMargin: 0,
    width: 1.5 * Dimensions.get('window').width,
  };

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({
        width: 1.5 * Dimensions.get('window').width,
      });
    } else {
      this.setState({
        width: Dimensions.get('window').width - 10,
        detailsHeaderMargin: 0,
      });
    }
  };

  onFocus = (input, text) => {
    this.setState({
      [`${input}Color`]: activeTextColor,
    });
    if (text === '0' || text === '0,00') {
      this.props[`${input}Changed`]('');
    } else {
      this.props[`${input}Changed`](number(text));
    }
  }

  onBlur = (input, text) => {
    this.setState({
      [`${input}Color`]: textColor,
    });
    if (text === '') {
      this.props[`${input}Changed`]('0');
    } else {
      const minimumFractionDigits = Math.ceil(Number(text)) !== Number(text) ? 2 : 0;
      this.props[`${input}Changed`](
        Number(text).toLocaleString('ru-RU', {
          minimumFractionDigits,
          maximumFractionDigits: minimumFractionDigits,
        }),
      );
    }
  }

  onFocusTextPicker = (input, text) => {
    this.setState({
      [`${input}Color`]: activeTextColor,
    });
    if (text === '0') {
      this.props[`${input}Changed`]('');
    }
  }

  onBlurTextPicker = (input, text) => {
    this.setState({
      [`${input}Color`]: textColor,
    });
    if (text === '') {
      this.props[`${input}Changed`]('0');
    }
  }

  setDatePickerVisible = (value) => {
    this.setState({
      isDatePickerVisible: value,
    });
  }

  onCreditPrincipalChange = (text) => {
    this.props.creditPrincipalChanged(number(text));
  }

  onCreditInterestChange = (text) => {
    this.props.creditInterestChanged(number(text));
  }

  onCreditDateOpenChange = (date) => {
    this.setDatePickerVisible(false);
    this.props.creditDateOpenChanged(date);
  }

  onCreditSrokValueChange = (text) => {
    this.props.creditSrokValueChanged(number(text));
  }

  onCreditSrokOptionSelect = (option) => {
    this.props.creditSrokOptionSelected(option);
  }

  onCreditPlatezSelect = (option) => {
    this.props.creditPlatezSelected(option);
  }

  onCreditEdinComValueChange = (text) => {
    this.props.creditEdinComValueChanged(number(text));
  }

  onCreditEdinComOptionSelect = (option) => {
    this.props.creditEdinComOptionSelected(option);
  }

  onCreditStartCostComChange = (text) => {
    this.props.creditStartCostComChanged(number(text));
  }

  onCreditFinCostComChange = (text) => {
    this.props.creditFinCostComChanged(number(text));
  }

  onCreditAcCountComChange = (text) => {
    this.props.creditAcCountComChanged(number(text));
  }

  onRadioPress = (value) => {
    this.props.radioPressed(value);
  }

  handleScroll = (event: Object) => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      if (event.nativeEvent.layoutMeasurement.width + event.nativeEvent.contentOffset.x
        >= event.nativeEvent.contentSize.width) {
        this.setState({
          detailsHeaderMargin: 1.5 * event.nativeEvent.layoutMeasurement.width
          - event.nativeEvent.layoutMeasurement.width,
        });
      } else if (event.nativeEvent.contentOffset.x === 0) {
        this.setState({
          detailsHeaderMargin: 0,
        });
      }
    }
  }

  render() {
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
      creditDateClosed,
      monthlyAll, // Ваш ежемесячный платёж
      vsego, // итого к оплате
      pereplata, // Сумма переплаты
      comPayments, // комиссионные платежи
      interestPayments, // на оплату процентов
      table,
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

    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title={strings('titleCredit')} drawerOpen={() => this.props.navigation.openDrawer()} />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Депозитный калькулятор" /> */}
            <Header headerText={strings('headerCredit')} />
            <CardSection>
              <Image source={pic} style={topImage} />
              <Text style={welcome}>
                {/* 'Проверьте правильность ввода:' : 'Введите информацию о депозите: */}
                {!creditDateClosed ? strings('welcome.error') : strings('credit.go')}
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
                  // label="Сумма кредита"
                label={`${strings('credit.input.principal.label')}, ${radio[
                  this.props.radio
                ].label.charAt(0)}`}
                onChangeText={this.onCreditPrincipalChange}
                onFocus={() => this.onFocus('creditPrincipal', this.props.creditPrincipal)}
                onBlur={() => this.onBlur('creditPrincipal', this.props.creditPrincipal)}
                appInputStyle={{ color: this.state.creditPrincipalColor }}
                value={this.props.creditPrincipal}
              />

              <Input
                  // placeholder="годовая процентная ставка"
                placeholder={strings('input.interest1.placeholder')}
                  // label="Процентная ставка"
                label={strings('credit.input.interest.label')}
                onChangeText={this.onCreditInterestChange}
                onBlur={() => this.onBlur('creditInterest', this.props.creditInterest)}
                onFocus={() => this.onFocus('creditInterest', this.props.creditInterest)}
                appInputStyle={{ color: this.state.creditInterestColor }}
                value={this.props.creditInterest}
              />

              <InputDate
                  // label="Дата выдачи кредита"
                label={strings('credit.input.dateOpen.label')}
                value={initDate(this.props.creditDateOpen)}
                onRootPress={() => this.setDatePickerVisible(true)}
                onPress={() => this.setDatePickerVisible(true)}
              />
              <DateTimePicker
                date={this.props.creditDateOpen}
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this.onCreditDateOpenChange}
                onCancel={() => this.setDatePickerVisible(false)}
                datePickerModeAndroid="spinner"
              />

              <InputTextPicker
                  // placeholder="Срок кредита"
                placeholder={strings('credit.input.srok.placeholder')}
                  // label="Процентная ставка"
                label={strings('credit.input.srok.label')}
                onChangeText={this.onCreditSrokValueChange}
                onBlur={() => this.onBlurTextPicker('creditSrokValue', this.props.creditSrok)}
                onFocus={() => this.onFocusTextPicker('creditSrokValue', this.props.creditSrok)}
                appInputStyle={{ color: this.state.creditSrokValueColor }}
                value={this.props.creditSrok}
                  // options={['месяцы', 'годы']}
                options={[strings('credit.input.srok.options.months'), strings('credit.input.srok.options.years')]}
                selectedValue={this.props.creditSrokOption}
                onValueChange={this.onCreditSrokOptionSelect}
              />

              <InputPicker
                  // label="Вид платежей"
                label={strings('credit.input.platez.label')}
                  // options={['Аннуитет', 'Единовременно', 'Дифференцировано']}
                options={[strings('credit.input.platez.options.annuity'), strings('credit.input.platez.options.lump'), strings('credit.input.platez.options.differentiated')]}
                selectedValue={this.props.creditPlatez}
                onValueChange={this.onCreditPlatezSelect}
              />

              <InputTextPicker
                  // placeholder="Единоразовая комиссия"
                placeholder={strings('credit.input.edinСom.placeholder')}
                  // label="Процентная ставка"
                label={strings('credit.input.edinСom.label')}
                labelTextStyle={{ flex: 2.2 }}
                onChangeText={this.onCreditEdinComValueChange}
                onBlur={() => this.onBlur('creditEdinComValue', this.props.creditEdinCom)}
                onFocus={() => this.onFocus('creditEdinComValue', this.props.creditEdinCom)}
                appInputStyle={{ color: this.state.creditEdinComColor }}
                value={this.props.creditEdinCom}
                  // options={['%', '₽руб']}
                options={['%', radio[this.props.radio].label.charAt(0)]}
                selectedValue={this.props.creditEdinComOption}
                onValueChange={this.onCreditEdinComOptionSelect}
              />
              { this.props.creditPlatez !== 1 && (
              <View>
                <Input
                  // placeholder="введите %"
                  placeholder={strings('credit.input.startCostCom.placeholder')}
                  // label="Ежемесячная комиссия на нач. стоимость"
                  label={strings('credit.input.startCostCom.label')}
                  onChangeText={this.onCreditStartCostComChange}
                  onFocus={() => this.onFocus('creditStartCostCom', this.props.creditStartCostCom)}
                  onBlur={() => this.onBlur('creditStartCostCom', this.props.creditStartCostCom)}
                  appInputStyle={{ color: this.state.creditStartCostComColor }}
                  value={this.props.creditStartCostCom}
                />

                <Input
                  // placeholder="введите %"
                  placeholder={strings('credit.input.startCostCom.placeholder')}
                  // label="Ежемесячная комиссия на остаток долга"
                  label={strings('credit.input.finCostCom.label')}
                  onChangeText={this.onCreditFinCostComChange}
                  onFocus={() => this.onFocus('creditFinCostCom', this.props.creditFinCostCom)}
                  onBlur={() => this.onBlur('creditFinCostCom', this.props.creditFinCostCom)}
                  appInputStyle={{ color: this.state.creditFinCostComColor }}
                  value={this.props.creditFinCostCom}
                />

                <Input
                  // placeholder="введите %"
                  placeholder={strings('credit.input.startCostCom.placeholder')}
                  // label="Ежемесячная комиссия за ведение счёта"
                  label={`${strings('credit.input.acCountCom.label')} ${radio[
                    this.props.radio
                  ].label.charAt(0)}`}
                  onChangeText={this.onCreditAcCountComChange}
                  onFocus={() => this.onFocus('creditAcCountCom', this.props.creditAcCountCom)}
                  onBlur={() => this.onBlur('creditAcCountCom', this.props.creditAcCountCom)}
                  appInputStyle={{ color: this.state.creditAcCountComColor }}
                  value={this.props.creditAcCountCom}
                />
              </View>
              )}

            </TableSection>
          </Card>

          {Number(this.props.creditSrok) > 0 && Number(number(this.props.creditPrincipal)) !== 0 && (
            <Card>
              {/* Информация о платежах */}
              <Header headerText={strings('credit.result.header')} />

              <ResultSrok
                // дата погашения кредита
                label={`${strings('credit.result.dateClosed')} ${initDate(creditDateClosed)}`}
              />
              { this.props.creditPlatez !== 1
              && (<Result
                // Ваш ежемесячный платёж
                label={this.props.creditPlatez === 2 ? strings('credit.result.monthlyAll_2') : strings('credit.result.monthlyAll_0')}
                resultData={(Number(monthlyAll)).toLocaleString(
                  currentLocale,
                  optionsN,
                )}
                resultPieStyle={{
                  borderLeftWidth: 1,
                  borderColor: '#ddd',
                }}
              />)
                  }

              <Result
                // На оплату процентов
                label={strings('credit.result.interestPayments')}
                resultData={(Number(interestPayments)).toLocaleString(
                  currentLocale,
                  optionsN,
                )}
                resultPieStyle={{
                  borderLeftWidth: 1,
                  borderColor: '#ddd',
                }}
              />

              { comPayments > 0 && (
              <View>
                <Result
                // Комиссионные платежи
                  label={strings('credit.result.comPayments')}
                  resultData={(Number(comPayments)).toLocaleString(
                    currentLocale,
                    optionsN,
                  )}
                  resultPieStyle={{
                    borderLeftWidth: 1,
                    borderColor: '#ddd',
                  }}
                />
                <Result
                // Сумма переплаты
                  label={strings('credit.result.pereplata')}
                  resultData={(Number(pereplata)).toLocaleString(
                    currentLocale,
                    optionsN,
                  )}
                  resultPieStyle={{
                    borderLeftWidth: 1,
                    borderColor: '#ddd',
                  }}
                />
              </View>
              )}

              <Result
                // итого к оплате
                label={strings('credit.result.vsego')}
                resultData={(Number(vsego)).toLocaleString(
                  currentLocale,
                  optionsN,
                )}
                resultPieStyle={{
                  borderLeftWidth: 1,
                  borderColor: '#ddd',
                }}
              />

              {/* {adjunctionAll > 0 ? (
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
                } */}

              {/* {Number(number(this.props.principal)) !== 0 ? (
                  <CardSection>
                    <View style={pieContainer}>
                      <View
                        style={{
                          flex: 1.9,
                          justifyContent: 'center',
                        }}
                      >
                        <Text> */}
              {/* Сумма вклада с процентами */}
              {/* {strings('result.pie')}
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
                ) : null} */}
            </Card>
          )}

          {Number(this.props.creditSrok) > 0 && Number(number(this.props.creditPrincipal)) !== 0
          && this.props.creditPlatez !== 1 && (
            <ScrollView horizontal onScroll={this.handleScroll}>
              <Card>
                {/* <Header headerText="Выписка со счёта" /> */}
                <Header
                  headerText={
                    // eslint-disable-next-line no-nested-ternary
                    Dimensions.get('window').width < Dimensions.get('window').height
                      ? this.state.detailsHeaderMargin === 0
                        ? `${strings('credit.table.header')} >>`
                        : `<< ${strings('credit.table.header')}`
                      : strings('credit.table.header')
                  }
                  innerStyle={{ width: Dimensions.get('window').width - 10, marginLeft: this.state.detailsHeaderMargin }}
                />
                <CreditTable
                  currency={radio[this.props.radio].label}
                  value={table}
                  language={this.props.language}
                  width={this.state.width}
                />
              </Card>
            </ScrollView>
          )}
        </ScrollView>
      </View>

    );
  }
}

const styles = {
  welcome: {
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
    backgroundColor: 'transparent',
  },
};

Credit.propTypes = {
  creditPrincipal: PropTypes.string,
  creditInterest: PropTypes.string,
  creditDateOpen: PropTypes.instanceOf(Date),
  creditSrok: PropTypes.string,
  creditSrokOption: PropTypes.number,
  creditPlatez: PropTypes.number,
  creditEdinCom: PropTypes.string,
  creditEdinComOption: PropTypes.number,
  creditStartCostCom: PropTypes.string,
  creditFinCostCom: PropTypes.string,
  creditAcCountCom: PropTypes.string,
  radio: PropTypes.number,
  language: PropTypes.number,

  // доработать
  // days1: PropTypes.number,
  // srok: PropTypes.string,
  // principal2: PropTypes.number,
  // principal1: PropTypes.number,
  // adjunctionAll: PropTypes.number,
  // table: PropTypes.object,
};

const mapStateToProps = state => ({
  creditPrincipal: state.credit.creditPrincipal,
  creditInterest: state.credit.creditInterest,
  creditDateOpen: state.credit.creditDateOpen,
  creditSrok: state.credit.creditSrok,
  creditSrokOption: state.credit.creditSrokOption,
  creditPlatez: state.credit.creditPlatez,
  creditEdinCom: state.credit.creditEdinCom,
  creditEdinComOption: state.credit.creditEdinComOption,
  creditStartCostCom: state.credit.creditStartCostCom,
  creditFinCostCom: state.credit.creditFinCostCom,
  creditAcCountCom: state.credit.creditAcCountCom,
  radio: state.depo.radio,
  language: state.settings.language,

  calculated: creditCalculate(state),
});

const mapDispatchToActions = {
  creditPrincipalChanged,
  creditInterestChanged,
  creditDateOpenChanged,
  creditSrokValueChanged,
  creditSrokOptionSelected,
  creditPlatezSelected,
  creditEdinComValueChanged,
  creditEdinComOptionSelected,
  creditStartCostComChanged,
  creditFinCostComChanged,
  creditAcCountComChanged,
  radioPressed,
};
export default connect(mapStateToProps, mapDispatchToActions)(Credit);

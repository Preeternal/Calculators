// @flow
import React, { Component, Fragment } from 'react';
import {
  // Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import Pie from 'react-native-pie';
import {
  Icon, Content, List, ListItem, Left, Body, Right, Thumbnail, Text,
} from 'native-base';

import 'number-to-locale-string';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import client from '../../client';
import CurrencyComponent from './CurrencyComponent';

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
  CurrencyInput,
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

import { initDate, number, calculate } from '../../lib';

import CustomHeader from '../Common/CustomHeader';

import images from '../../images';

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
  navigation: any,
};

const textColor = '#525050';
const activeTextColor = '#000000';

const getCurrencies = gql`
  query {
    currencies {
      id
      name
      nameEng
      charCode
      value
      nominal
      updatedAt
    }
  }
`;

// const CurrencyComponent = graphql(getCurrencies)((props) => {
//   const { error, currencies } = props.data;
//   // console.log(props);
//   if (error) {
//     return <Text>{error.message}</Text>;
//   }
//   if (currencies) {
//     console.log(currentLocale);
//     return (
//       <FlatList
//         data={[
//           {
//             charCode: 'RUB',
//             id: '1',
//             name: 'Российский рубль',
//             nameEng: 'Russian ruble',
//             nominal: 1,
//             updatedAt: '2019-05-30T11:02:01.574Z',
//             value: 1,
//             __typename: 'Currency',
//           },
//           ...currencies,
//         ]}
//         renderItem={({ item }) => (
//           <CurrencyInput
//             key={item.charCode}
//             // placeholder={item.name}
//             // label="Сумма вклада"
//             label={item.charCode}
//             name={`${item.nominal} ${
//               currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng
//             }`}
//             // onChangeText={this.onPrincipalChange}
//             // onFocus={() => this.onFocus('principal', this.props.principal)}
//             // onBlur={() => this.onBlur('principal', this.props.principal)}
//             // appInputStyle={{ color: this.state.principalColor }}
//             value={`${item.value / item.nominal}`}
//           />
//         )}
//         keyExtractor={(item, index) => item + index}
//       />
//     );
//   }
//   return <Text>Loading...</Text>;
// });

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

class Converter extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: strings('converter.header'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon type="FontAwesome" name="retweet" style={{ fontSize: 22, color: tintColor }} />
      ),
    };
  };

  state = {
    principalColor: textColor,
    interest1Color: textColor,
    interest2Color: textColor,
    prinplusColor: textColor,
    isDatePickerVisible: false,
    isDatePicker2Visible: false,
    userCountryCode: currentLocale.substring(3),
  };

  async componentDidMount() {
    if (!this.props.countryIP) {
      try {
        await fetch(config.ipUrl)
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
      } catch (err) {
        console.warn(err.code, err.message);
      }
    }

    client
      .query({
        query: getCurrencies,
      })
      .then((response) => {
        response.data.currencies.forEach((currency) => {
          // console.log(currency.name);
        });
      });
  }

  render() {
    const {
      topImage, welcome, radioStyle, pieContainer, pie, gauge, gaugeText,
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

    const optionsN = {
      style: 'currency',
      currencyDisplay: 'symbol',
      // currency: radio[this.props.radio].index,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return (
      <Fragment>
        <CustomHeader
          title={strings('converter.title')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView key={`${this.props.language}${this.props.country}`} style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Конвертер валют" /> */}
            <Header headerText={strings('converter.header')} />
            {/* <CardSection>
            </CardSection> */}

            {/* <Content>
              <List>
                <CurrencyComponent />
              </List>
            </Content> */}

            <TableSection>
              <CurrencyComponent />
            </TableSection>
          </Card>
        </ScrollView>
      </Fragment>
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

Converter.propTypes = {
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
export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(Converter);

import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { strings } from '../../../locales/i18n';

import CustomHeader from '../Common/CustomHeader';
import { CardSection, Card, Header } from '../../components/common';

class Help extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: strings('help.header'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-help-circle" style={{ fontSize: 24, color: tintColor }} />
      ),
    };
  };

  render() {
    const { main, bold } = styles;
    return (
      <View key={this.props.language} style={{ flex: 1 }}>
        <CustomHeader
          title={strings('help.header')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            <Header headerText={strings('help.definitions')} />
            <CardSection>
              <Text style={[bold, { marginTop: 10 }]}>{strings('help.paymentType.header')}</Text>
              <Text style={main}>
                {strings('help.paymentType.text')}
                {'\n'}
                {strings('help.paymentType.text2')}
              </Text>
              <Text style={bold}>{strings('help.edinCom.header')}</Text>
              <Text style={main}>{strings('help.edinCom.text')}</Text>
              <Text style={bold}>{strings('help.startCostCom.header')}</Text>
              <Text style={main}>{strings('help.startCostCom.text')}</Text>
              <Text style={bold}>{strings('help.finCostCom.header')}</Text>
              <Text style={main}>{strings('help.finCostCom.text')}</Text>
              <Text style={bold}>{strings('help.acCountCom.header')}</Text>
              <Text style={main}>{strings('help.acCountCom.text')}</Text>
              <Text style={bold}>{strings('help.payment.header')}</Text>
              <Text style={main}>{strings('help.payment.text')}</Text>
              <Text style={bold}>{strings('help.overpayment.header')}</Text>
              <Text style={main}>{strings('help.overpayment.text')}</Text>
            </CardSection>
          </Card>
          <Card>
            <Header headerText={strings('help.eula')} />
            <CardSection>
              <Text style={main}>
                Использование Приложения означает безоговорочное согласие пользователя с настоящей
                Политикой и указанными в ней условиями обработки его персональной информации и
                подтверждает, что, давая такое согласие, он действует свободно, своей волей и в
                своем интересе; в случае несогласия с этими условиями пользователь должен
                воздержаться от использования Приложения. Приложение не подразумевает регистрацию
                пользователей и хранение информации о пользователе вне устройства пользователя.
                Однако, для улучшения пользовательского опыта, приложение может кэшировать настройки
                и установки приложения, изменённые пользователем, непосредственно на устройстве
                пользователя. Для определения локальных данных пользователя, с целью персонализации
                предоставляемых сервисов по стране нахождения пользователя, возможно незначительное
                использование интернет трафика. Настоящая Политика применима только к программному
                коду Banoka. Banoka не контролирует и не несет ответственность за программный код
                третьих лиц.
              </Text>
            </CardSection>
          </Card>
          <Card>
            <Header headerText={strings('help.guarantees')} />
            <CardSection>
              <Text style={main}>
                Приложение предоставляется на условиях `КАК ЕСТЬ`, без каких либо явных или
                подразумеваемых гарантий. Правообладатель не предоставляет никаких гарантий в
                отношении безошибочной и бесперебойной работы приложения, соответствия содержимого
                приложения конкретным целям пользователя.
              </Text>
            </CardSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  main: {
    margin: 10,
    textAlign: 'justify',
  },
  bold: {
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
  },
};

const mapStateToProps = state => ({
  language: state.settings.language,
});
export default connect(mapStateToProps)(Help);

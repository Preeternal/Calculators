import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Icon } from 'native-base';

import { strings } from '../../../locales/i18n';

import CustomHeader from '../Common/CustomHeader';
import { CardSection, Card, Header } from '../../components/common';

export default class extends PureComponent {
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
    const { welcome } = styles;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          title={strings('help.header')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Депозитный калькулятор" /> */}
            <Header headerText={strings('help.eula')} />
            <CardSection>
              <Text style={welcome}>
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
            {/* <Header headerText="Депозитный калькулятор" /> */}
            <Header headerText={strings('help.guarantees')} />
            <CardSection>
              <Text style={welcome}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Приложение предоставляется на условиях "КАК ЕСТЬ", без каких либо явных или
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
  welcome: {
    margin: 10,
    textAlign: 'justify',
  },
};

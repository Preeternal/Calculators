import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import i18n from 'i18n-js';
import 'number-to-locale-string';

import { languageChanged } from '../../actions';
import {
  InputPicker, Card, Header, TableSection,
} from '../../components/common';
import { strings } from '../../../locales/i18n';
import CustomHeader from '../Common/CustomHeader';

class Settings extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings', // strings('header'),
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
    ),
  };

  onLanguageChange = (value) => {
    this.props.languageChanged(value);
    i18n.locale = value === 0 ? 'ru' : 'en';
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          // title="Settings"
          title={strings('titleDeposit')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            <Header headerText="Локальные данные" />
            {/* <Header headerText={strings('header')} /> */}
            <TableSection>
              <InputPicker
                label="Язык"
                // label={strings('input.platez.label')}
                options={['русский', 'english']}
                // options={[strings('input.platez.options.yes'), strings('input.platez.options.no')]}
                selectedValue={this.props.language}
                onValueChange={this.onLanguageChange}
              />
              <InputPicker
                label="Страна"
                // label={strings('input.platez.label')}
                options={['да', 'нет']}
                // options={[strings('input.platez.options.yes'), strings('input.platez.options.no')]}
                // selectedValue={this.props.platez}
                // onValueChange={this.onLanguageChange}
              />
            </TableSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

Settings.propTypes = {
  language: PropTypes.number,
};

const mapStateToProps = state => ({
  language: state.settings.language,
});
export default connect(
  mapStateToProps,
  {
    languageChanged,
  },
)(Settings);

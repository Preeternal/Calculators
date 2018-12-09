import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon } from 'native-base';
import i18n from 'i18n-js';
import 'number-to-locale-string';

import { languageChanged, countryChanged } from '../../actions';
import {
  InputPicker, Card, Header, TableSection,
} from '../../components/common';
import { strings } from '../../../locales/i18n';
import CustomHeader from '../Common/CustomHeader';

class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: strings('settings.settings'), // drawer label initialization
      drawerLabel: params && params.DLabel,
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
      ),
    };
  };

  // no need to preset drawer label because we define title in navigationOptions
  // componentWillMount() {
  //   this.props.navigation.setParams({ DLabel: strings('settings.settings') });
  // }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.props.navigation.setParams({ DLabel: strings('settings.settings') });
      const setDepoLabel = NavigationActions.setParams({
        params: { DLabel: strings('header') },
        key: 'Depo',
      });
      this.props.navigation.dispatch(setDepoLabel);
      const setCreditLabel = NavigationActions.setParams({
        params: { DLabel: strings('headerCredit') },
        key: 'Credit',
      });
      this.props.navigation.dispatch(setCreditLabel);
    }
  }

  onLanguageChange = (value) => {
    this.props.languageChanged(value);
    i18n.locale = value === 0 ? 'ru' : 'en';
  };

  onCountryChange = (value) => {
    this.props.countryChanged(value);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          // title="Settings"
          title={strings('settings.settings')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Локальные данные" /> */}
            <Header headerText={strings('settings.localization')} />
            <TableSection>
              <InputPicker
                // label="Язык"
                label={strings('settings.language')}
                options={['русский', 'english']}
                selectedValue={this.props.language}
                onValueChange={this.onLanguageChange}
              />
              <InputPicker
                // label="Страна"
                label={strings('settings.country')}
                options={['Россия', 'Other', 'Украина']}
                selectedValue={this.props.country}
                onValueChange={this.onCountryChange}
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
  country: PropTypes.number,
};

const mapStateToProps = state => ({
  language: state.settings.language,
  country: state.settings.country,
});
export default connect(
  mapStateToProps,
  {
    languageChanged,
    countryChanged,
  },
)(Settings);

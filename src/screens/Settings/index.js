// @flow
import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CommonActions, useNavigationState } from '@react-navigation/native';
import i18n from 'i18n-js';
import 'number-to-locale-string';

import { languageChanged, countryChanged } from '../../actions';
import {
  InputPicker,
  Card,
  Header,
  TableSection,
} from '../../components/common';

import { LocalizationContext } from '../../Context';

type Props = {
  language: number,
  country: number,
  languageChanged: Function,
  countryChanged: Function,
  navigation: Object,
  route: Object,
};

class Settings extends Component<Props> {
  onLanguageChange = (value: number) => {
    const { navigation, route } = this.props;
    this.props.languageChanged(value);
    this.context.setLocale(value === 0 ? 'ru' : 'en');
    i18n.locale = value === 0 ? 'ru' : 'en';
    navigation.dispatch({
      ...CommonActions.setParams({ DLabel: '123' }),
      source: route.key,
    });
    // this.props.navigation.setParams({ DLabel: '123' });
    console.log(this.props);
    console.log(navigation.dangerouslyGetParent().dangerouslyGetState());
    const O = navigation.dangerouslyGetParent().dangerouslyGetState().routes[0];
    console.log(O);
    navigation.dispatch({
      ...CommonActions.setParams({ DLabel: '12345' }),
      source: navigation.dangerouslyGetParent().dangerouslyGetState().routes[0]
        .key,
    });
    console.log('parrent', navigation.dangerouslyGetParent());
  };

  onCountryChange = (value: number) => {
    this.props.countryChanged(value);
  };

  static contextType = LocalizationContext;

  render() {
    const { t } = this.context;

    return (
      <Fragment>
        <ScrollView style={{ flex: 1 }}>
          <Card>
            {/* <Header headerText="Локальные данные" /> */}
            <Header headerText={t('settings.localization')} />
            <TableSection>
              <InputPicker
                // label="Язык"
                label={t('settings.language')}
                options={['русский', 'english']}
                selectedValue={this.props.language}
                onValueChange={this.onLanguageChange}
              />
              <InputPicker
                // label="Страна"
                label={t('settings.country')}
                options={['Россия', 'Other', 'Украина']}
                selectedValue={this.props.country}
                onValueChange={this.onCountryChange}
              />
            </TableSection>
          </Card>
        </ScrollView>
      </Fragment>
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

export default connect<any, any, any, any, any, any>(mapStateToProps, {
  languageChanged,
  countryChanged,
})(Settings);

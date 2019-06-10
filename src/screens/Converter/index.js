// @flow
import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import 'number-to-locale-string';

import CurrencyComponent from './CurrencyComponent';

import { Card, Header, TableSection } from '../../components/common';

import { strings } from '../../../locales/i18n';

import CustomHeader from '../Common/CustomHeader';

type Props = {
  language: number,
  country: number,
  navigation: Function,
};

type State = {
  userCountryCode?: string,
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

  render() {
    return (
      <Fragment>
        <CustomHeader
          title={strings('converter.title')}
          drawerOpen={() => this.props.navigation.openDrawer()}
        />
        <ScrollView key={`${this.props.language}${this.props.country}`} style={{ flex: 1 }}>
          <Card>
            <Header headerText={strings('converter.header')} />
            <TableSection>
              <CurrencyComponent navigation={this.props.navigation} />
            </TableSection>
          </Card>
        </ScrollView>
      </Fragment>
    );
  }
}

Converter.propTypes = {
  language: PropTypes.number,
  country: PropTypes.number,
};

const mapStateToProps = state => ({
  language: state.settings.language,
  country: state.settings.country,
});

export default connect(mapStateToProps)(Converter);

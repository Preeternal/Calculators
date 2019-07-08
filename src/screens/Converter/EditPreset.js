// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import CurrencyPreset from '../../components/converter/CurrencyPreset';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  preset: Array<string>,
  presetChanged: Function,
  // navigation: Function,
};

type State = { enable: boolean };

const styles = {
  headerText: {
    color: '#ffffff',
    fontSize: 18,
  },
  rightButton: {
    marginRight: 15,
  },
  leftButton: {
    marginLeft: 15,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
};

class EditPreset extends Component<Props, State> {
  static navigationOptions = () => ({
    drawerLockMode: 'locked-closed',
    headerTitle: <Text style={styles.headerText}>{strings('converter.changeCurr')}</Text>,
    headerStyle: {
      backgroundColor: '#525050',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  state = { enable: true };

  onDelete = (item) => {
    Alert.alert(
      `${strings('converter.delete')} ${item}`,
      `${strings('converter.remove')} ${item} ${strings('converter.fromTheList')}`,
      [
        {
          text: strings('common.cancel'),
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: strings('common.ok'),
          onPress: () => {
            const preset = this.props.preset.filter(i => i !== item);
            this.onPresetChange(preset);
          },
        },
      ],
      // { cancelable: false },
    );
  };

  onPresetChange = (array) => {
    this.props.presetChanged(array);
  };

  setScrollEnabled = (enable) => {
    this.setState({
      enable,
    });
  };

  renderItem = ({ item }) => (
    <CurrencyPreset
      char={item}
      onDelete={() => this.onDelete(item)}
      onMove={() => {}}
      setScrollEnabled={enable => this.setScrollEnabled(enable)}
    />
  );

  render() {
    return (
      <Fragment>
        <FlatList
          data={this.props.preset}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          scrollEnabled={this.state.enable}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  preset: state.converter.preset,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(EditPreset);

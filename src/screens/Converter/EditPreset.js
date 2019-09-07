// @flow
import React, { Component, Fragment } from 'react';
import { Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';
// import type {
//   NavigationStateRoute,
//   NavigationReplaceAction,
//   NavigationScreenProp,
// } from 'react-navigation';

import CurrencyPreset from '../../components/converter/CurrencyPreset';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';
import HandleBack from '../../components/HandleBack';

type Props = {
  preset?: Array<string>,
  presetChanged: Function,
  // navigation: NavigationScreenProp<{|
  //   ...NavigationStateRoute,
  //   ...NavigationReplaceAction,
  // |}>,
  navigation: Object,
};

type State = { data?: Array<string> };

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
  root: {
    flex: 1,
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

  state = { data: this.props.preset };

  componentWillMount() {
    if (this.props.navigation.state.key[this.props.navigation.state.key.length - 1] === '1') {
      this.props.navigation.replace('EditPreset');
    }
  }

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
            const preset = {};
            preset.data = this.props.preset ? this.props.preset.filter(i => i !== item) : [];
            this.onPresetChange(preset);
          },
        },
      ],
      // { cancelable: false },
    );
  };

  onPresetChange = ({ data }) => {
    this.props.presetChanged(data);
  };

  onMoveEnd = ({ data }) => {
    this.setState({ data });
    // this.onPresetChange({ data });
    // console.log(this.props.preset);
  };

  onBack = () => {
    // const preset = {};
    // preset.data = this.state.data;
    // this.onPresetChange(preset);
    this.props.presetChanged(this.state.data);
  };

  renderItem = ({
    item, move, moveEnd, isActive,
  }) => (
    <CurrencyPreset
      char={item}
      onDelete={() => this.onDelete(item)}
      // onMove={move}
      onLongPress={move}
      onPressOut={moveEnd}
      isActive={isActive}
    />
  );

  render() {
    return (
      <HandleBack onBack={this.onBack}>
        <DraggableFlatList
          // data={this.props.preset}
          data={this.state.data}
          // extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          horizontal={false}
          scrollPercent={5}
          // onMoveEnd={this.onPresetChange}
          onMoveEnd={this.onMoveEnd}
        />
      </HandleBack>
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

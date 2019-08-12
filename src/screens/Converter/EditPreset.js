// @flow
import React, { Component, Fragment } from 'react';
import { Text, Alert, View } from 'react-native';
import { connect } from 'react-redux';
// import DraggableFlatList from 'react-native-draggable-flatlist';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';

import CurrencyPreset from '../../components/converter/CurrencyPreset2';
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
            console.log(preset);
            this.onPresetChange(preset);
          },
        },
      ],
      // { cancelable: false },
    );
  };

  onPresetChange = ({ data }) => {
    this.props.presetChanged(data || []);
  };

  setScrollEnabled = (enable) => {
    this.setState({
      enable,
    });
  };

  renderItem = ({
    item, move, moveEnd, isActive,
  }) => (
    <CurrencyPreset
      char={item}
      onDelete={() => this.onDelete(item)}
      // onMove={move}
      setScrollEnabled={enable => this.setScrollEnabled(enable)}
      onLongPress={move}
      onPressOut={moveEnd}
      isActive={isActive}
    />
  );

  render() {
    return (
      <View style={styles.root}>
        <DraggableFlatList
          data={this.props.preset}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          scrollEnabled={this.state.enable}
          horizontal={false}
          scrollPercent={5}
          // onMoveBegin={() => this.setScrollEnabled(false)}
          onMoveEnd={this.onPresetChange}
        />
      </View>
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

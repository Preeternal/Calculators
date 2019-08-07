// @flow
import React, { Component, Fragment } from 'react';
import { Text, Alert } from 'react-native';
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

  renderItem = ({
    item, move, moveEnd, isActive,
  }) => (
    <CurrencyPreset
      char={item}
      onDelete={() => this.onDelete(item)}
      onMove={move}
      setScrollEnabled={enable => this.setScrollEnabled(enable)}
      // onLongPress={move}
      onPressOut={moveEnd}
      selectedStyle={{ backgroundColor: isActive ? 'lightgray' : '#fff' }}
      verticalMove={isActive}
    />
  );

  render() {
    return (
      <Fragment>
        <DraggableFlatList
          data={this.props.preset}
          extraData={this.props}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          scrollEnabled={this.state.enable}
          horizontal={false}
          scrollPercent={5}
          // onMoveBegin={() => this.setScrollEnabled(false)}
          onMoveEnd={({ data }) => {
            console.log(data);
            this.onPresetChange(data);
            // this.setScrollEnabled(true);
          }}
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

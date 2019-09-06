// @flow
import React, { Component, Fragment } from 'react';
import { Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';

import CurrencyPreset from '../../components/converter/CurrencyPreset';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  preset?: Array<string>,
  presetChanged: Function,
  navigation: Object,
};

type State = { data: Object };

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
      <Fragment>
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

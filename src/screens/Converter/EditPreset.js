// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';

import CurrencyPreset from '../../components/converter/CurrencyPreset';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  preset?: Array<string>,
  presetChanged: Function,
};

class EditPreset extends Component<Props> {
  deleteListItem = (item: string) => {
    const prevPreset = this.props.preset || [];
    const preset = prevPreset.filter(i => i !== item);
    this.props.presetChanged(preset);
  };

  onDelete = (item: string) => {
    Alert.alert(
      `${strings('converter.delete')} ${item}`,
      `${strings('converter.remove')} ${item} ${strings(
        'converter.fromTheList',
      )}`,
      [
        {
          text: strings('common.cancel'),
          style: 'cancel',
        },
        {
          text: strings('common.ok'),
          onPress: () => {
            this.deleteListItem(item);
          },
        },
      ],
    );
  };

  onPresetChange = (preset: Object) => {
    this.props.presetChanged(preset);
  };

  onMoveEnd = ({ data }: { data: Object }) => {
    this.props.presetChanged(data);
  };

  renderItem = ({
    item,
    move,
    moveEnd,
    isActive,
  }: {
    item: string,
    move: Function,
    moveEnd: Function,
    isActive: boolean,
  }) => (
    <CurrencyPreset
      char={item}
      onDelete={() => this.onDelete(item)}
      deleteListItem={() => this.deleteListItem(item)}
      onMove={move}
      // onLongPress={move}
      onPressOut={moveEnd}
      isActive={isActive}
    />
  );

  render() {
    return (
      <DraggableFlatList
        data={this.props.preset || []}
        renderItem={this.renderItem}
        keyExtractor={item => item}
        horizontal={false}
        scrollPercent={5}
        onMoveEnd={this.onMoveEnd}
      />
    );
  }
}

const mapStateToProps = state => ({
  preset: state.converter.preset,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect<any, any, any, any, any, any>(
  mapStateToProps,
  mapDispatchToActions,
)(EditPreset);

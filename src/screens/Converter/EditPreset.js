// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import DraggableFlatList from 'react-native-draggable-flatlist';

import CurrencyPreset from '../../components/converter/CurrencyPreset';
import { LocalizationContext } from '../../Context';
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
    const { t } = this.context;
    Alert.alert(
      `${t('converter.delete')} ${item}`,
      `${t('converter.remove')} ${item} ${t('converter.fromTheList')}`,
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.ok'),
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
    drag,
    moveEnd,
    isActive,
  }: {
    item: string,
    drag: Function,
    moveEnd: Function,
    isActive: boolean,
  }) => (
    <CurrencyPreset
      char={item}
      onDelete={() => this.onDelete(item)}
      deleteListItem={() => this.deleteListItem(item)}
      onMove={drag}
      // onLongPress={drag}
      onPressOut={moveEnd}
      isActive={isActive}
    />
  );

  static contextType = LocalizationContext;

  render() {
    return (
      <DraggableFlatList
        data={this.props.preset || []}
        renderItem={this.renderItem}
        keyExtractor={item => item}
        horizontal={false}
        autoscrollThreshold={100}
        onDragEnd={this.onMoveEnd}
        activationDistance={20}
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

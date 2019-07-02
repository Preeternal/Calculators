// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

type CurrencyType = {
  char: string,
  onDelete: Function,
  onMove: Function,
};

const CurrencyPreset = ({ char, onDelete, onMove }: CurrencyType) => {
  const {
    containerStyle, deleteStyle, charStyle, charTextStyle, moveStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={deleteStyle} onPress={onDelete}>
        <Icon type="MaterialIcons" name="delete" style={{ fontSize: 22, color: 'gray' }} />
      </TouchableOpacity>
      <View style={charStyle}>
        <Text style={charTextStyle}>{char}</Text>
      </View>
      <TouchableOpacity style={moveStyle} onPress={onMove}>
        <Icon type="FontAwesome" name="sort" style={{ fontSize: 22, color: 'gray' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    flexDirection: 'row',
  },
  deleteStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  charStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  charTextStyle: {
    fontSize: 13,
  },
  moveStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 15,
  },
};

export { CurrencyPreset };

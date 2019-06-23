// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CurrencyType = {
  label: string,
  name: string,
  onPress: Function,
};

const CurrencyAdditional = ({ label, name, onPress }: CurrencyType) => {
  const {
    containerStyle, labelStyle, labelTextStyle, inputStyle, nameStyle,
  } = styles;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyle}>
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={inputStyle}>
          <Text style={nameStyle}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  labelStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  labelTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nameStyle: { paddingRight: 10, paddingBottom: 10, fontSize: 13 },
};

export { CurrencyAdditional };

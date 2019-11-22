import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const InputDate = ({ label, value, onPress, onRootPress }) => {
  const {
    containerStyle,
    labelStyle,
    labelTextStyle,
    inputStyle,
    inputTextStyle,
  } = styles;
  return (
    <TouchableOpacity onPress={onRootPress}>
      <View style={containerStyle}>
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={inputStyle}>
          <TouchableOpacity onPress={onPress}>
            <Text style={inputTextStyle}>{value}</Text>
          </TouchableOpacity>
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
    flex: 1.9,
    borderRightWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  labelTextStyle: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  inputStyle: {
    flex: 1.1,
    justifyContent: 'center',
  },
  inputTextStyle: {
    color: '#525050',
    paddingLeft: 10,
    paddingRight: 5,
  },
};

export { InputDate };

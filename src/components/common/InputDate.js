import React from 'react';
import { View, Text } from 'react-native';

const InputDate = ({ label, value, onPress }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Text
        style={inputStyle}
        onPress={onPress}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#525050',
    paddingRight: 5,
    paddingLeft: 7.15,
    flex: 1,
    //paddingTop: 4,
    fontSize: 15,
    lineHeight: 15,
    //textDecorationLine: 'underline',
    height: 52,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    textAlignVertical: 'center'
  },
  labelStyle: {
    fontSize: 15,
    color: '#ffffff',
    backgroundColor: '#656262',
    paddingLeft: 10,
    flex: 2,
    lineHeight: 15,
    height: 52,
    borderColor: 'gray',
    borderRightWidth: 0.5,
    borderLeftWidth: 1,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    textAlignVertical: 'center'
  },
  containerStyle: {
    height: 52,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { InputDate };

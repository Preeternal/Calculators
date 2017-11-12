import React from 'react';
import { View, Text } from 'react-native';

const InputDate = ({ label, value, onPress }) => {
  const { containerStyle, labelStyle, labelTextStyle, inputStyle, inputTextStyle } = styles;
  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={inputStyle}>
        <Text
          style={inputTextStyle}
          onPress={onPress}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 52,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center'
  },
  labelStyle: {
    backgroundColor: '#656262',
    flex: 2,
    height: 52,
    borderColor: 'gray',
    borderRightWidth: 0.5,
    borderLeftWidth: 1,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  labelTextStyle: {
    fontSize: 15,
    color: '#ffffff',
    paddingLeft: 10,
    paddingRight: 5,
    //textAlignVertical: 'center',
    //lineHeight: 15,
  },
  inputStyle: {
    flex: 1,
    //textDecorationLine: 'underline',
    height: 52,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  inputTextStyle: {
    fontSize: 15,
    color: '#525050',
    paddingLeft: 10,
    paddingRight: 5,
  }  
};

export { InputDate };

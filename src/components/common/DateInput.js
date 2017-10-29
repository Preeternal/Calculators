import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DateInput = ({ label, value, onPress }) => {
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
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#525050',
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 15,
    lineHeight: 23,
    textDecorationLine: 'underline',
    flex: 1
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 10,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { DateInput };

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry,
  onSelectionChange, onSubmitEditing, onFocus, onBlur
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        //autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onSelectionChange={onSelectionChange}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType='numeric'
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#525050',
    paddingRight: 5,
    paddingLeft: 10,
    //paddingTop: 2,
    fontSize: 15,
    lineHeight: 23,
    flex: 1,
    height: 37,
    borderColor: 'gray',
    borderWidth: 1
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

export { Input };

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
    flex: 1,
    //paddingTop: 2,
    fontSize: 15,
    lineHeight: 15,
    height: 52,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    textAlign: 'left'
  },
  labelStyle: {
    fontSize: 15,
    color: '#ffffff',
    backgroundColor: '#656262',
    paddingRight: 5,
    paddingLeft: 10,
    flex: 2,
    lineHeight: 13,
    height: 52,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 1,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlignVertical: 'center'
  },
  containerStyle: {
    height: 52,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    //alignSelf: 'center',
    //textAlign: 'center'
  }
};

export { Input };

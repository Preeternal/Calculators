// @flow
import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

type InputType = {
  label: string,
  value: string,
  onChangeText: Function,
  placeholder?: string,
  secureTextEntry?: boolean,
  onSelectionChange?: Function,
  onSubmitEditing?: Function,
  onFocus: Function,
  onBlur: Function,
  appInputStyle: Object,
};

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onSelectionChange,
  onSubmitEditing,
  onFocus,
  onBlur,
  appInputStyle,
}: InputType) => {
  const {
    containerStyle,
    labelStyle,
    labelTextStyle,
    inputStyle,
    inputTextStyle,
  } = styles;

  const textInput = React.createRef();

  function handleClick() {
    if (textInput.current) textInput.current.focus();
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={containerStyle}>
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={inputStyle}>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            // autoCorrect={false}
            style={[inputTextStyle, appInputStyle]}
            value={value}
            onChangeText={onChangeText}
            onSelectionChange={onSelectionChange}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            ref={textInput}
          />
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
    fontFamily: 'Ubuntu',
    paddingLeft: 10,
    paddingRight: 5,
  },
  inputStyle: {
    flex: 1.1,
    justifyContent: 'center',
  },
  inputTextStyle: {
    paddingLeft: 10,
    paddingRight: 5,
  },
};

export { Input };

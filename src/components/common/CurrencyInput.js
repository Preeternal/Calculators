// @flow
import React from 'react';
import {
  TextInput, View, Text, TouchableOpacity,
} from 'react-native';

type CurrencyType = {
  label: string,
  value: string,
  name: string,
  onChangeText: Function,
  placeholder: string,
  secureTextEntry: boolean,
  onSelectionChange: Function,
  onSubmitEditing: Function,
  onFocus: Function,
  onBlur: Function,
};

const CurrencyInput = ({
  label,
  value,
  name,
  onChangeText,
  placeholder,
  secureTextEntry,
  onSelectionChange,
  onSubmitEditing,
  onFocus,
  onBlur,
}: CurrencyType) => {
  const {
    containerStyle,
    labelStyle,
    labelTextStyle,
    inputStyle,
    inputTextStyle,
    nameStyle,
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
            style={inputTextStyle}
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
    // borderRightWidth: 1,
    // borderColor: '#ddd',
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
  inputTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameStyle: { paddingRight: 10, paddingBottom: 10, fontSize: 10 },
};

export { CurrencyInput };

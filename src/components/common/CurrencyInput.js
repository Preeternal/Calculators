import React from 'react';
import {
  TextInput, View, Text, TouchableOpacity,
} from 'react-native';

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
  appInputStyle,
}) => {
  const {
    containerStyle, labelStyle, labelTextStyle, inputStyle, inputTextStyle,
  } = styles;

  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={containerStyle}>
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={inputStyle}>
          <View style={{ alignItems: 'flex-end' }}>
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
              ref={(input) => {
                textInput = input;
              }}
            />
            <Text style={{ alignSelf: 'flex-end' }}>{name}</Text>
          </View>
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
    borderRightWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  labelTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputStyle: {
    flex: 3,
    justifyContent: 'center',
  },
  inputTextStyle: {
    paddingLeft: 10,
    // paddingRight: 10,
    alignSelf: 'flex-end',
  },
};

export { CurrencyInput };

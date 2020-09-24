import React from 'react';
import { View, TextInput } from 'react-native';

import { InputPicker } from './InputPicker';

const InputTextPicker = ({
  label,
  selectedValue,
  onValueChange,
  options,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onSelectionChange,
  onSubmitEditing,
  onFocus,
  onBlur,
  appInputStyle,
}) => {
  const { containerStyle, labelStyle, inputStyle, inputTextStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <InputPicker
          label={label}
          options={options}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        />
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
        />
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 52,
    flexDirection: 'row',
  },
  labelStyle: {
    flex: 1.9,
    borderRightWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  inputTextStyle: {
    paddingLeft: 10,
    paddingRight: 5,
    flex: 1,
    fontFamily: 'Ubuntu',
    fontWeight: 'normal',
  },
};

export { InputTextPicker };

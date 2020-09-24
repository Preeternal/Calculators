// @flow
import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  label: string,
  value: string,
  name: string,
  onChangeText: Function,
  placeholder?: string,
  secureTextEntry?: boolean,
  onSelectionChange?: Function,
  onSubmitEditing?: Function,
  onFocus: Function,
  onBlur: Function,
  appInputStyle: Object,
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
  appInputStyle,
}: Props) => {
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

  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity onPress={handleClick}>
      <View
        style={[
          containerStyle,
          {
            marginLeft: Math.max(insets.left, 5),
            marginRight: Math.max(insets.right, 5),
          },
        ]}
      >
        <View style={labelStyle}>
          <Text style={labelTextStyle}>{label}</Text>
        </View>
        <View style={inputStyle}>
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            // selectTextOnFocus
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
    marginLeft: 5,
    marginRight: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  labelStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  labelTextStyle: {
    fontFamily: 'Ubuntu',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputStyle: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Ubuntu',
    fontWeight: 'normal',
  },
  nameStyle: {
    fontFamily: 'Ubuntu',
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 13,
  },
};

export { CurrencyInput };

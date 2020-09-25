// @flow
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

type Props = {
  name: string,
  char: string,
  checked: boolean,
  handleClick: () => void,
};

const CurrencyAdditional = ({ name, char, checked, handleClick }: Props) => {
  const {
    containerStyle,
    checkBoxStyle,
    rowStyle,
    nameStyle,
    nameTextStyle,
    charStyle,
    charTextStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <View style={checkBoxStyle}>
        <CheckBox
          value={checked}
          onValueChange={handleClick}
          tintColors={{ true: 'gray' }}
          onTintColor="gray"
          onFillColor="gray"
          onCheckColor="white"
        />
      </View>
      <TouchableOpacity onPress={handleClick} style={rowStyle}>
        <View style={nameStyle}>
          <Text style={nameTextStyle}>{name}</Text>
        </View>
        <View style={charStyle}>
          <Text style={charTextStyle}>{char}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    flexDirection: 'row',
  },
  checkBoxStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  rowStyle: {
    flex: 4,
    flexDirection: 'row',
  },
  nameStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nameTextStyle: {
    fontFamily: 'Ubuntu',
    // paddingLeft: 10,
    fontSize: 13,
  },
  charStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  charTextStyle: {
    fontFamily: 'Ubuntu',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export { CurrencyAdditional };

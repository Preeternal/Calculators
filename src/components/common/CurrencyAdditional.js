// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CurrencyType = {
  name: string,
  char: string,
  onPress: Function,
};

const CurrencyAdditional = ({ name, char, onPress }: CurrencyType) => {
  const {
    containerStyle, nameStyle, nameTextStyle, charStyle, charTextStyle,
  } = styles;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyle}>
        <View style={nameStyle}>
          <Text style={nameTextStyle}>{name}</Text>
        </View>
        <View style={charStyle}>
          <Text style={charTextStyle}>{char}</Text>
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
  nameStyle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nameTextStyle: {
    paddingLeft: 10,
    fontSize: 13,
  },
  charStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  charTextStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export { CurrencyAdditional };

import React from 'react';
import { View, Text } from 'react-native';

const ResultSrok = ({ label }) => {
  const { containerStyle, labelStyle, labelTextStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    minHeight: 52,
    flex: 1,
    flexDirection: 'row',
  },
  labelStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  labelTextStyle: {
    fontFamily: 'Ubuntu',
    paddingLeft: 10,
    paddingRight: 5,
    textAlign: 'center',
    lineHeight: 15,
  },
};

export { ResultSrok };

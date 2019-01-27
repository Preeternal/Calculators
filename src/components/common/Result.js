import React from 'react';
import { View, Text } from 'react-native';

const Result = ({
  label, resultData, labelPieStyle, resultPieStyle,
}) => {
  const {
    containerStyle, labelStyle, labelTextStyle, resultStyle, resultDataStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <View style={[labelStyle, labelPieStyle]}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={[resultStyle, resultPieStyle]}>
        <Text style={resultDataStyle}>{resultData}</Text>
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
    flex: 1.9,
    justifyContent: 'center',
  },
  labelTextStyle: {
    paddingLeft: 10,
    paddingRight: 5,
    lineHeight: 15,
  },
  resultStyle: {
    flex: 1.1,
    height: 52,
    justifyContent: 'center',
  },
  resultDataStyle: {
    paddingLeft: 10,
    paddingRight: 5,
  },
};

export { Result };

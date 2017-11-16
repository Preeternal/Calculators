import React from 'react';
import { View, Text } from 'react-native';

const ResultSrok = ({ label }) => {
  const { containerStyle, labelStyle, labelTextStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      {/* <View style={resultStyle}>
        <Text style={resultDataStyle}>{resultData}</Text>
      </View> */}
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 52,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center'
  },
  labelStyle: {
    //backgroundColor: '#757171',
    flex: 1,
    height: 52,
    // borderColor: 'gray',
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    // borderTopWidth: 0.7,
    // borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  labelTextStyle: {
    fontSize: 15,
    //color: '#eeeeee',
    paddingLeft: 10,
    paddingRight: 5,
    //textAlign: 'center',
    lineHeight: 15,
  },
  // resultStyle: {
  //   flex: 1,
  //   //textDecorationLine: 'underline',
  //   height: 52,
  //   borderColor: 'gray',
  //   //borderWidth: 1,
  //   borderRightWidth: 1,
  //   borderLeftWidth: 0.5,
  //   borderTopWidth: 0.7,
  //   borderBottomWidth: 0.7,
  //   justifyContent: 'center'
  // },
  // resultDataStyle: {
  //   fontSize: 15,
  //   //color: '#525050',
  //   paddingLeft: 10,
  //   paddingRight: 5,
  // }
};

export { ResultSrok };

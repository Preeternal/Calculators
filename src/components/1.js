import React from 'react';

import {
  Text,
  View,
  //StyleSheet
} from 'react-native';


const One = (props) => {
  const { viewStyle, textStyle } = styles;
  return (
    <View style={viewStyle}>

      <Text style={textStyle}>{props.hello}</Text>

    </View>
  );
};

// const styles = StyleSheet.create({
//     SomeStyle: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F8F8F8',
//         height: 60,
//         paddingTop: 15,
//         shadowColor: '#131312',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5
//     },
// });

const styles = {
  viewStyle: {
    //backgroundColor: '#b6babb',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 40,
    // paddingTop: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 20 },
    // shadowOpacity: 0.9,
    // elevation: 2,
    // position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};

export default One;

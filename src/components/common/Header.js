import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#525050',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    position: 'relative',
  },
  textStyle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
};

export { Header };

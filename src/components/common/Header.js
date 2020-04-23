/* eslint-disable camelcase */
// @flow
import React from 'react';
import { Text, View } from 'react-native';
import type { ____ViewStyle_Internal } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  headerStyle: ____ViewStyle_Internal,
  innerStyle: ____ViewStyle_Internal,
  headerText: string,
};

const Header = (props: Props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={[viewStyle, props.headerStyle]}>
      <View style={props.innerStyle}>
        <Text style={textStyle}>{props.headerText}</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#525050',
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
    fontFamily: 'Ubuntu',
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
};

export { Header };

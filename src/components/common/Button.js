/* eslint-disable camelcase */
// @flow
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { ____ViewStyle_Internal } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

const height = 40;
const padding = 10;
const margin = 10;
const width = 250;
const backgroundColor = 'lightgrey';

type Props = {
  title: string,
  titleColor?: string,
  icon?: () => React$Node,
  iconRight?: () => React$Node,
  rounded?: boolean,
  outlined?: boolean,
  customStyle?: ____ViewStyle_Internal,
  onPress: () => void,
};

const Button = ({
  title,
  titleColor,
  icon,
  iconRight,
  rounded,
  outlined,
  customStyle,
  onPress,
}: Props) => {
  let inlineStyle = [];

  inlineStyle = inlineStyle.concat(styles.defaultStyle);

  if (rounded) {
    inlineStyle = inlineStyle.concat(styles.roundBorder);
  }

  if (outlined) {
    inlineStyle = inlineStyle.concat(styles.outlined);
  }

  if (customStyle) {
    inlineStyle = inlineStyle.concat(customStyle);
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[inlineStyle, { flexDirection: icon ? 'row' : 'column' }]}>
        {icon && icon()}
        <Text style={[styles.textStyle, { color: titleColor }]}>{title}</Text>
        {iconRight && iconRight()}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  defaultStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height,
    padding,
    margin,
    width,
    backgroundColor,
    borderColor: backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    fontFamily: 'Ubuntu',
    alignSelf: 'center',
    color: '#575859',
    fontSize: 16,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  roundBorder: {
    borderRadius: 30,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
};

export { Button };

/* eslint-disable camelcase */
// @flow
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { ____ViewStyle_Internal } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// const height = 40;
// const padding = 10;
// const margin = 10;
// const width = 250;
// const backgroundColor = 'lightgrey';

type Props = {
  title: string,
  titleColor?: string,
  icon?: () => React$Node,
  iconRigth?: () => React$Node,
  rounded?: boolean,
  outlined?: boolean,
  customStyle?: ____ViewStyle_Internal,
  onPress: () => void
};

const PickerButton = ({
  title,
  titleColor,
  icon,
  iconRigth,
  rounded,
  outlined,
  customStyle,
  onPress
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
      <View style={inlineStyle}>
        <Text style={[styles.textStyle, { color: titleColor }]}>{title}</Text>
        <Icon name="md-arrow-dropdown" style={styles.arrowIosStyle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  defaultStyle: {
    alignItems: 'space-between',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  textStyle: {
    paddingLeft: 10,
    paddingRight: 5,
    fontFamily: 'Ubuntu',
    alignSelf: 'center',
    color: '#525050',
    textAlignVertical: 'center',
  },
  roundBorder: {
    borderRadius: 30,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  arrowIosStyle: {
    color: '#5c251c',
    alignSelf: 'flex-end',
    fontSize: 15,
    marginLeft: 8,
  },
};

export { PickerButton };

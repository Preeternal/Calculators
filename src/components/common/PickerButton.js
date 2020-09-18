/* eslint-disable camelcase */
// @flow
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  title: string,
  titleColor?: string,
  onPress: () => void,
};

const PickerButton = ({ title, titleColor, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerStyle}>
        <Text
          numberOfLines={1}
          style={[styles.textStyle, { color: titleColor }]}
        >
          {title}
        </Text>
        <Icon name="md-arrow-dropdown" style={styles.arrowIosStyle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 2,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    color: '#525050',
    fontSize: 13,
    fontFamily: 'Ubuntu',
    fontWeight: 'normal',
    textAlignVertical: 'center',
  },
  arrowIosStyle: {
    color: '#5c251c',
    fontSize: 15,
    marginLeft: 8,
  },
});

export { PickerButton };

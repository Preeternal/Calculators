// @flow
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  letter: string,
  top: number,
};

const AlphabeticScrollBarPointer = (props: Props) => {
  return (
    <View style={[styles.container, { top: props.top - 25 }]}>
      <Text style={styles.letter}>{props.letter}</Text>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    zIndex: 999,
    backgroundColor: 'rgba(231, 76, 60, 1)',
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
  },
};

export default AlphabeticScrollBarPointer;

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const AlphabeticScrollBar = props => {
  return (
    <View style={[styles.container, props.scrollBarContainerStyle]}>
      {props.alphabet.map(letter => (
        <TouchableWithoutFeedback
          key={letter}
          acceptsKeyboardFocus
          onFocus={() => props.scrollToIndex(letter)}
          onPressIn={() => props.scrollToIndex(letter)}
        >
          <View key={letter}>
            <Text
              style={{
                color: props.viewableLetters.includes(letter)
                  ? 'rgba(231, 76, 60, 1)'
                  : 'gray',
              }}
            >
              {letter}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = {
  container: {
    width: 30,
    position: 'absolute',
    right: 0,
    top: 2,
    bottom: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default AlphabeticScrollBar;

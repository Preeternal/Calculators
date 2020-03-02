import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const AlphabeticScrollBar = props => {
  return (
    <View
      // onLayout={this.handleOnLayout}
      style={[styles.container, props.scrollBarContainerStyle]}
    >
      {props.alphabet.map(letter => (
        <TouchableWithoutFeedback
          key={letter}
          onPress={() => props.scrollToIndex(letter)}
        >
          <View key={letter}>
            <Text
              style={
                {}
                // props.viewableLetters.includes(letter)
                //   ? styles.letter
                //   : { color: 'gray' }
              }
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
  letter: {
    color: 'red',
    // alignSelf: 'center',
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // fontWeight: 'bold',
  },
};

export default AlphabeticScrollBar;

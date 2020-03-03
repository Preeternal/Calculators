import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const AlphabeticScrollBar = props => {
  const onTouchEvent = (name, ev) => {
    // console.log(
    //   `[${name}] ` +
    //     `root_x: ${ev.nativeEvent.pageX}, root_y: ${ev.nativeEvent.pageY} ` +
    //     `target_x: ${ev.nativeEvent.locationX}, target_y: ${ev.nativeEvent.locationY} ` +
    //     `target: ${ev.nativeEvent.target}`,
    // );
    // console.log(ev.nativeEvent);
    console.log(`root_y: ${ev.nativeEvent.pageY} `);
  };

  const onTouchEvent2 = (name, ev) => {
    // console.log(
    //   `[${name}] ` +
    //     `root_x: ${ev.nativeEvent.pageX}, root_y: ${ev.nativeEvent.pageY} ` +
    //     `target_x: ${ev.nativeEvent.locationX}, target_y: ${ev.nativeEvent.locationY} ` +
    //     `target: ${ev.nativeEvent.target}`,
    // );
    // console.log(ev.nativeEvent);
    console.log(`Y: ${ev.nativeEvent.pageY} `);
  };
  return (
    <View
      onStartShouldSetResponder={ev => true}
      // // onMoveShouldSetResponder={(ev) => false}
      onResponderGrant={e => onTouchEvent2('onResponderGrant', e)}
      // // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
      onResponderMove={e => onTouchEvent2('onResponderMove', e)}
      // onResponderRelease={this.onTouchEvent.bind(this, "onResponderRelease")}
      // onResponderTerminationRequest={(ev) => true}
      // onResponderTerminate={this.onTouchEvent.bind(this, "onResponderTerminate")}
      style={[styles.container, props.scrollBarContainerStyle]}
      // onLayout={event => {
      //   const { layout } = event.nativeEvent;
      //   console.log('height:', Math.round(layout.height));
      //   // console.log('width:', layout.width);
      //   // console.log('x:', layout.x);
      //   console.log('Y:', layout.y);
      // }}
    >
      {props.alphabet.map(letter => (
        // <TouchableWithoutFeedback
        //   key={letter}
        //   acceptsKeyboardFocus
        //   onFocus={() => props.scrollToIndex(letter)}
        //   onPressIn={() => props.scrollToIndex(letter)}
        // >
        <View
          key={letter}
          // onLayout={event => {
          //   const { layout } = event.nativeEvent;
          //   // console.log(event.nativeEvent);
          //   // console.log('height:', layout.height);
          //   // console.log('width:', layout.width);
          //   // console.log('x:', layout.x);
          //   console.log(letter, ':', layout.y);
          // }}
          onStartShouldSetResponder={ev => true}
          onResponderGrant={e => onTouchEvent('onResponderGrant', e)}
          // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
          onResponderMove={e => onTouchEvent(letter, e)}
        >
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
        // </TouchableWithoutFeedback>
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

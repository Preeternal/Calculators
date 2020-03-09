/* eslint-disable camelcase */
// @flow
import React from 'react';
import { View, Text, PanResponder } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import type { ____ViewStyle_Internal } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  alphabet: Array<string>,
  scrollToIndex: Function,
  viewableLetters: Array<string>,
  scrollBarContainerStyle?: ____ViewStyle_Internal,
  setActiveLetter: Function,
};

let headerHeight = 0;
let containerHeight = 0;

const AlphabeticScrollBar = (props: Props) => {
  const view = React.createRef();
  const insets = useSafeArea();
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) =>
          handleOnFingerTouch(evt, gestureState),
        onPanResponderMove: (evt, gestureState) =>
          handleOnFingerMove(evt, gestureState),
        onPanResponderRelease: () => handleOnFingerRelease(),
      }),
    [],
  );
  const {
    onStartShouldSetResponder,
    onResponderGrant,
    onResponderMove,
    onResponderRelease,
  } = panResponder.panHandlers;

  const handleOnFingerTouch = (evt, gestureState) => {
    getTouchedLetter(gestureState.y0);
  };

  const handleOnFingerMove = (evt, gestureState) => {
    getTouchedLetter(gestureState.moveY);
  };

  const handleOnFingerRelease = () => {
    props.setActiveLetter(undefined);
  };

  const getTouchedLetter = Y => {
    const rowHeight = containerHeight / props.alphabet.length;
    props.alphabet.map((letter, index) => {
      if (
        rowHeight * (index + 1) - (Y - headerHeight) > 0 &&
        rowHeight * (index + 1) - (Y - headerHeight) < rowHeight
      ) {
        props.scrollToIndex(letter, containerHeight / 2);
      }
      return null;
    });
  };

  const handleOnLayout = () => {
    if (view.current) {
      view.current.measure((x, y, width, height, pageX, pageY) => {
        containerHeight = height;
        headerHeight = pageY;
      });
    }
  };

  return (
    <View
      ref={view}
      onStartShouldSetResponder={onStartShouldSetResponder}
      onResponderGrant={onResponderGrant}
      onResponderMove={onResponderMove}
      onResponderRelease={onResponderRelease}
      style={[
        styles.container,
        { bottom: insets.bottom ? 19 : 2 },
        props.scrollBarContainerStyle,
      ]}
      onLayout={handleOnLayout}
    >
      {props.alphabet.map(letter => (
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
    // bottom: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default AlphabeticScrollBar;

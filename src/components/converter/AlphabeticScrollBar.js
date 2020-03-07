import React from 'react';
import { View, Text, PanResponder } from 'react-native';

let headerHeight = 0;
let containerHeight = 0;

const AlphabeticScrollBar = props => {
  const view = React.createRef();
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) =>
          handleOnFingerTouch(evt, gestureState),
        onPanResponderMove: (evt, gestureState) =>
          handleOnFingerMove(evt, gestureState),
      }),
    [],
  );
  const {
    onStartShouldSetResponder,
    onResponderGrant,
    onResponderMove,
  } = panResponder.panHandlers;

  const handleOnFingerTouch = (evt, gestureState) => {
    getTouchedLetter(gestureState.y0);
  };

  const handleOnFingerMove = (evt, gestureState) => {
    getTouchedLetter(gestureState.moveY);
  };

  const getTouchedLetter = Y => {
    console.log(
      'headerHeight',
      headerHeight,
      'containerHeight',
      containerHeight,
    );
    const rowHeight = containerHeight / props.alphabet.length;

    props.alphabet.map((letter, index) => {
      if (
        rowHeight * (index + 1) - (Y - headerHeight) > 0 &&
        rowHeight * (index + 1) - (Y - headerHeight) < rowHeight
      ) {
        props.scrollToIndex(letter);
        console.log(
          letter,
          'pressed',
          rowHeight * (index + 1) - (Y - headerHeight),
        );
      }
      return null;
    });

    console.log('Y', Y - headerHeight);
  };

  const handleOnLayout = () => {
    view.current.measure((x, y, width, height, pageX, pageY) => {
      console.log(
        'x',
        x,
        'y',
        y,
        'width',
        width,
        'height',
        height,
        'pageX',
        pageX,
        'pageY',
        pageY,
      );
      containerHeight = height;
      headerHeight = pageY;

      console.log('headerHeight', headerHeight, 'containerHeight', height);
    });
  };

  return (
    <View
      ref={view}
      onStartShouldSetResponder={onStartShouldSetResponder}
      onResponderGrant={onResponderGrant}
      onResponderMove={onResponderMove}
      style={[styles.container, props.scrollBarContainerStyle]}
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
    bottom: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default AlphabeticScrollBar;

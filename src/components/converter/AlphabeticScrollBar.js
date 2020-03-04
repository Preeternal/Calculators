import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

// ...

const AlphabeticScrollBar = props => {
  const view = React.createRef();

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) =>
          onTouchEvent3(evt, gestureState),
        onPanResponderMove: (evt, gestureState) =>
          onTouchEvent3(evt, gestureState),
      }),
    [],
  );
  const headerHeight = useHeaderHeight();
  let rowHeight;
  const containerHeight = Dimensions.get('screen').height;
  console.log('containerHeight', containerHeight);

  console.log('headerHeight', headerHeight);
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
    console.log(`pageY: ${ev.nativeEvent.pageY} `);
    console.log(`locationY: ${ev.nativeEvent.locationY}`);
  };

  let pageY1;

  const onTouchEvent3 = (evt, gestureState) => {
    // console.log('evt', evt.nativeEvent);
    console.log('gestureState.y0', gestureState.y0 - (pageY1 || 0));
  };

  const handleOnLayout = () => {
    // view.current.measure((width, x1, y1, height, px, py) => {
    //   console.log(
    //     'width',
    //     width,
    //     'x1',
    //     x1,
    //     'y1',
    //     y1,
    //     'height',
    //     height,
    //     'px',
    //     px,
    //     'py',
    //     py,
    //   );
    // });
    view.current.measure((x, y, width, height, pageX, pageY) => {
      pageY1 = pageY;
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
    });
  };

  return (
    <View
      ref={view}
      {...panResponder.panHandlers}
      // onMoveShouldSetResponder={() => true}
      // onStartShouldSetResponder={() => true}
      // onStartShouldSetResponderCapture={() => false}
      // // onMoveShouldSetResponder={(ev) => false}
      // onResponderGrant={e => onTouchEvent2('onResponderGrant', e)}
      // onResponderGrant={onTouchEvent3}
      // // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
      // onResponderMove={e => onTouchEvent2('onResponderMove', e)}
      // onResponderMove={onTouchEvent3}
      // onResponderRelease={this.onTouchEvent.bind(this, "onResponderRelease")}
      // onResponderTerminationRequest={(ev) => true}
      // onResponderTerminate={this.onTouchEvent.bind(this, "onResponderTerminate")}
      style={[styles.container, props.scrollBarContainerStyle]}
      // onLayout={event => {
      //   const { layout } = event.nativeEvent;
      //   console.log('height:', Math.round(layout.height));
      //   rowHeight =
      //     Math.round(layout.height + headerHeight - 7) / props.alphabet.length;
      //   console.log('width:', Math.round(layout.width));
      //   // console.log('x:', layout.x);
      //   console.log('Y:', layout.y);
      // }}
      onLayout={handleOnLayout}
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
          onLayout={event => {
            const { layout } = event.nativeEvent;
            // console.log(event.nativeEvent);
            // console.log('height:', layout.height);
            // console.log('width:', layout.width);
            // console.log('x:', layout.x);
            console.log(letter, ':', layout.y);
          }}
          // onMoveShouldSetResponder={ev => true}
          // onStartShouldSetResponder={ev => true}
          // onResponderGrant={e => onTouchEvent('onResponderGrant', e)}
          // // onResponderGrant={() => props.scrollToIndex(letter)}
          // // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
          // onResponderMove={e => onTouchEvent(letter, e)}
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

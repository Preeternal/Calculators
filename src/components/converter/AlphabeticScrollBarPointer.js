import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

const AlphabeticScrollBarPointer = props => {
  return (
    <View
      style={[
        {
          ...styles.container,
          top: props.top - 15,
          backgroundColor: props.color,
        },
        props.style,
      ]}
    >
      <Text style={styles.letter}>{props.letter}</Text>
    </View>
  );
};

AlphabeticScrollBarPointer.propTypes = {
  top: PropTypes.number,
  color: PropTypes.string,
  letter: PropTypes.string,
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
    right: 50,
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

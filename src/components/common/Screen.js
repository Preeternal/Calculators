// @flow
import React from 'react';
import { Image } from 'react-native';
import images from '../../images';

const Screen = () => <Image source={images.screen} style={styles.containerStyle} />;

const styles = {
  containerStyle: {
    flex: 1,
    // flexDirection: 'column',
    alignSelf: 'center',
    // justifyContent: 'center',
  },
};

export { Screen };

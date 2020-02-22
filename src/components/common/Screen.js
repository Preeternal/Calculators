// @flow
import React from 'react';
import { Image, View } from 'react-native';
import images from '../../assets/images';

const Screen = () => (
  <View style={styles.container}>
    <Image source={images.screen} style={styles.image} />
  </View>
);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    alignSelf: 'center',
  },
};

export { Screen };

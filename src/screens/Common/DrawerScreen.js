// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'react-native';

import images from '../../assets/images';

const DrawerScreen = (props: any) => {
  return (
    <>
      <Image
        resizeMode="cover"
        style={styles.drawerImage}
        source={images.logo}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

export default DrawerScreen;

const styles = {
  menuItem: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  drawerHeader: {
    height: 180,
    backgroundColor: 'white',
  },
  drawerImage: {
    alignSelf: 'center',
    // resizeMode: 'cover',
    height: 215,
    width: 280,
  },
};

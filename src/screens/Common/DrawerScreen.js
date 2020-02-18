// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image, View, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import VersionNumber from 'react-native-version-number';

import { strings } from '../../../locales/i18n';
import images from '../../assets/images';

const DrawerScreen = (props: any) => {
  return (
    <>
      <Image
        resizeMode="cover"
        style={styles.drawerImage}
        source={images.logo}
      />
      <DrawerContentScrollView
        contentContainerStyle={{ justifyContent: 'space-between' }}
        // style={{ justifyContent: 'space-between' }}
        {...props}
      >
        <DrawerItemList {...props} />

        <View style={{ alignSelf: 'center' }}>
          <Text>
            {`${strings('appVersion')} ${VersionNumber.appVersion || ''}`}
          </Text>
        </View>
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

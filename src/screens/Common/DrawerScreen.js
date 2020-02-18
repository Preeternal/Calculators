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
  const { drawerImage, contentContainerStyle, menuItem } = styles;
  return (
    <>
      <Image resizeMode="cover" style={drawerImage} source={images.logo} />
      <DrawerContentScrollView
        contentContainerStyle={contentContainerStyle}
        {...props}
      >
        <View style={{ justifyContent: 'flex-start' }}>
          <DrawerItemList {...props} />
        </View>
        <View style={menuItem}>
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
  drawerImage: {
    alignSelf: 'center',
    height: 215,
    width: 280,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  menuItem: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: 10,
  },
};

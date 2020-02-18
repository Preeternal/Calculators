// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import VersionNumber from 'react-native-version-number';

import { strings } from '../../../locales/i18n';
import images from '../../assets/images';

type Props = any;
type State = {
  isLandscape: boolean,
};

class DrawerScreen extends Component<Props, State> {
  state = {
    isLandscape: false,
  };

  componentDidMount() {
    this.handle();
    Dimensions.addEventListener('change', this.handle);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handle);
  }

  handle = () => {
    this.setState({ isLandscape: this.isLandscape() });
  };

  isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
  };

  render() {
    const { drawerImage, contentContainerStyle, menuItem } = styles;
    const { isLandscape } = this.state;

    return (
      <>
        <Image
          resizeMode="cover"
          style={[drawerImage, { height: isLandscape ? 50 : 215 }]}
          source={images.logo}
        />
        <DrawerContentScrollView
          contentContainerStyle={contentContainerStyle}
          {...this.props}
        >
          <View style={{ justifyContent: 'flex-start' }}>
            <DrawerItemList {...this.props} />
          </View>
          {!isLandscape && (
            <View style={menuItem}>
              <Text>
                {`${strings('appVersion')} ${VersionNumber.appVersion || ''}`}
              </Text>
            </View>
          )}
        </DrawerContentScrollView>
      </>
    );
  }
}

export default DrawerScreen;

const styles = {
  drawerImage: {
    alignSelf: 'center',
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

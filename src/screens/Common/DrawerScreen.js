import React from 'react';
import { DrawerItems } from 'react-navigation';
import PropTypes from 'prop-types';
import { Image, SafeAreaView } from 'react-native';
import {
  Container, Content, Header, Body,
} from 'native-base';

import images from '../../images';

const DrawerScreen = props => (
  <Container>
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Header androidStatusBarColor="#757171" style={styles.drawerHeader}>
        <Body>
          <Image resizeMode="cover" style={styles.drawerImage} source={images.logo} />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
    </SafeAreaView>
  </Container>
);

DrawerScreen.propTypes = {
  navigation: PropTypes.object,
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
    height: 180, // 229
    width: 300,
    alignSelf: 'center',
  },
};

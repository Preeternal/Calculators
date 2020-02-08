/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
// import { DrawerNavigatorItems } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import {
  Image,
  SafeAreaView,
  // StatusBar,
  View,
  // Text,
} from 'react-native';
import { Container, Content, Header, Body, Icon } from 'native-base';

import images from '../../assets/images';
import { strings } from '../../../locales/i18n';

// const DrawerScreen = props => (
//   <Container>
//     <SafeAreaView
//       style={{ flex: 1 }}
//       forceInset={{ top: 'always', horizontal: 'never' }}
//     >
//       {/* <StatusBar barStyle="dark-content" backgroundColor="#525050" /> */}
//       <Header
//         // iosBarStyle="dark-content"
//         androidStatusBarColor="#525050"
//         style={styles.drawerHeader}
//       >
//         <Body>
//           <Image
//             resizeMode="cover"
//             style={styles.drawerImage}
//             source={images.logo}
//           />
//         </Body>
//       </Header>
//       <Content>
//         <DrawerNavigatorItems {...props} />
//       </Content>
//     </SafeAreaView>
//   </Container>
// );

const DrawerScreen = props => {
  console.log('props', props);
  return (
    <DrawerContentScrollView {...props}>
      <Image
        resizeMode="cover"
        style={styles.drawerImage}
        source={images.logo}
      />
      {/* <DrawerItem
        label={strings('header')}
        // focused
        // activeTintColor="#000000"
        // inactiveTintColor="#525050"
        Icon={({ focused, color, size }) => (
          <Icon type="Entypo" name="wallet" style={{ fontSize: 24, color }} />
        )}
        // onPress={() => Linking.openUrl('https://mywebsite.com/help')}
      /> */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

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
    // alignSelf: 'center',
  },
};

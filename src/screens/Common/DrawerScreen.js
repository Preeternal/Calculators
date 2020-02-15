// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'react-native';

import images from '../../assets/images';

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

const DrawerScreen = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        resizeMode="cover"
        style={styles.drawerImage}
        source={images.logo}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
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
    marginTop: -30,
    alignSelf: 'center',
    // resizeMode: 'cover',
    height: 180, // 229
    width: 300,
    marginBottom: 10,
  },
};

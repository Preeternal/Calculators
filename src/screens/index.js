// import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  // createMaterialTopTabNavigator,
  DrawerActions,
} from 'react-navigation';
// import Icon from 'native-base';

import Depo from './Depo';
import Credit from './Credit';
import DrawerScreen from './Common/DrawerScreen';

// const Tabs = createMaterialTopTabNavigator(
//   {
//     Home: Depo,
//     Details: Depo,
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: '#000',
//       inactiveTintColor: 'gray',
//       style: {
//         backgroundColor: '#fff',
//       },
//       indicatorStyle: {
//         backgroundColor: '#000',
//       },
//     },
//   },
// );

// const DrawerNavigator = createDrawerNavigator(
const Navigator = createDrawerNavigator(
  {
    // Home: {
    //   screen: Tabs,
    // },
    Depo,
    Credit,
  },
  {
    initialRouteName: 'Depo',
    contentComponent: DrawerScreen,
    drawerWidth: 300,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
  },
);

// const MenuImage = ({ navigation }) => {
//   if (!navigation.state.isDrawerOpen) {
//     return <Image source={require('../images/menu-button.png')} />;
//   }
//   return <Image source={require('../images/left-arrow.png')} />;
// };

// const Navigator = createStackNavigator(
//   {
//     // important: key and screen name (i.e. DrawerNavigator) should be same
//     // while using the drawer navigator inside stack navigator.

//     DrawerNavigator: {
//       screen: DrawerNavigator,
//     },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       // title: 'ReactNavigation', // Title to appear in status bar
//       headerLeft: (
//         <TouchableOpacity
//           onPress={() => {
//             navigation.dispatch(DrawerActions.toggleDrawer());
//           }}
//         >
//           <MenuImage style={styles.bar} navigation={navigation} />
//         </TouchableOpacity>
//       ),
//       headerStyle: {
//         backgroundColor: '#333',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     }),
//   },
// );

export default Navigator;

const styles = {
  bar: {
    // padding: 10,
    // marginLeft: 10,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
  },
};

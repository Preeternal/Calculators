import { createDrawerNavigator } from 'react-navigation';

import Depo from './Depo';
import Credit from './Credit';
import Settings from './Settings';
import DrawerScreen from './Common/DrawerScreen';

const Navigator = createDrawerNavigator(
  {
    Depo,
    Credit,
    Settings,
  },
  {
    initialRouteName: 'Credit',
    contentComponent: DrawerScreen,
    drawerWidth: 300,
    contentOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#525050',
    },
  },
);

// const DepoStack = createStackNavigator(
//   {
//     Depo,
//     // Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       drawerLabel: strings('header'),
//       drawerIcon: ({ tintColor }) => (
//         <Icon type="Entypo" name="wallet" style={{ fontSize: 24, color: tintColor }} />
//       ),
//     },
//   },
// );

// const CreditStack = createStackNavigator(
//   {
//     Credit,
//     // Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       drawerLabel: strings('headerCredit'),
//       drawerIcon: ({ tintColor }) => (
//         <Icon name="md-download" style={{ fontSize: 24, color: tintColor }} />
//       ),
//     },
//   },
// );

// const SettingsStack = createStackNavigator(
//   {
//     Settings,
//     // Email: { screen: EmailScreen },
//   },
//   {
//     navigationOptions: {
//       // headerTitle: strings('settings.settings'),
//       title: strings('settings.settings'),
//       drawerLabel: strings('settings.settings'), // Settings
//       drawerIcon: ({ tintColor }) => (
//         <Icon name="md-settings" style={{ fontSize: 24, color: tintColor }} />
//       ),
//     },
//   },
// );

// const Navigator = createDrawerNavigator(
//   {
//     DepoStack,
//     CreditStack,
//     SettingsStack,
//   },
//   {
//     // initialRouteName: 'Depo',
//     contentComponent: DrawerScreen,
//     drawerWidth: 300,
//     contentOptions: {
//       activeTintColor: '#000000',
//       inactiveTintColor: '#525050',
//     },
//   },
// );

export default Navigator;

import { createDrawerNavigator } from 'react-navigation';

import Depo from './Depo';
import Credit from './Credit';
import DrawerScreen from './Common/DrawerScreen';

const Navigator = createDrawerNavigator(
  {
    Depo,
    Credit,
  },
  {
    initialRouteName: 'Depo',
    contentComponent: DrawerScreen,
    drawerWidth: 300,
    contentOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#525050',
    },
  },
);

export default Navigator;

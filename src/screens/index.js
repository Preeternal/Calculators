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

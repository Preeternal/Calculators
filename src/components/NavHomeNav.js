//import libraries
import React from 'react';

import {
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    }
    render() {
    //  const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>Hello, Chat App!</Text>
          {/* <Button
            onPress={() => navigate('Second')}
            title="Chat with Lucy"
          /> */}
        </View>
      );
    }
}



const NavHome = StackNavigator({
  Home: { screen: HomeScreen },
});

export default NavHome;

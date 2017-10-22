import React from 'react';

import {
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

const NavSecond = StackNavigator({
  Second: { screen: SecondScreen },
});

export default NavSecond;

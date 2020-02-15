import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';

const DrawerButton = props => (
  <TouchableWithoutFeedback onPress={() => props.navigation.openDrawer()}>
    <Icon name="ios-menu" style={{ fontSize: 30, color: 'white' }} />
  </TouchableWithoutFeedback>
);

export default DrawerButton;

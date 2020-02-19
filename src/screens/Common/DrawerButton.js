import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';

const DrawerButton = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Icon
        type={props.type || 'Ionicons'}
        name={props.name || 'ios-menu'}
        style={{ fontSize: !props.name ? 30 : 25, color: 'white' }}
      />
    </TouchableWithoutFeedback>
  );
};

export default DrawerButton;

// @flow
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon, { type IoniconsGlyphs } from 'react-native-vector-icons/Ionicons';
import MaterialIcons, {
  type MaterialIconsGlyphs,
} from 'react-native-vector-icons/MaterialIcons';

type Props = {
  name?: {| ...IoniconsGlyphs, ...MaterialIconsGlyphs |},
  type?: string,
  onPress: () => void,
};

const DrawerButton = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      {!!props.type && props.type === 'MaterialIcons' ? (
        <MaterialIcons
          name={props.name}
          style={{ fontSize: !props.name ? 30 : 25, color: 'white' }}
        />
      ) : (
        <Icon
          name={props.name || 'ios-menu'}
          style={{ fontSize: !props.name ? 30 : 25, color: 'white' }}
        />
      )}
    </TouchableWithoutFeedback>
  );
};

export default DrawerButton;

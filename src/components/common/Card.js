import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Card = props => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.containerStyle,
        {
          marginLeft: Math.max(insets.left, 5),
          marginRight: Math.max(insets.right, 5),
        },
      ]}
    >
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
};

export { Card };

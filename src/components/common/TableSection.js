import React from 'react';
import { View } from 'react-native';

const TableSection = props => <View style={styles.containerStyle}>{props.children}</View>;

const styles = {
  containerStyle: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
};

export { TableSection };

import React from 'react';
import { Dimensions } from 'react-native';

import {
  Header, Body, Title, Left, Icon, Right, Button,
} from 'native-base';

const CustomHeader = props => (
  <Header
    androidStatusBarColor="#757171"
    style={{
      backgroundColor: '#525050',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 2,
      // paddingLeft: 12,
    }}
  >
    <Left>
      <Button transparent onPress={() => props.drawerOpen()}>
        <Icon name="ios-menu" style={{ color: 'white' }} />
      </Button>
    </Left>
    <Body>
      <Title
        style={{
          color: 'white',
          width:
            Dimensions.get('window').width < Dimensions.get('window').height
              ? 0.3 * Dimensions.get('window').width
              : 0.2 * Dimensions.get('window').width,
          textAlign: 'left',
        }}
      >
        {props.title}
      </Title>
    </Body>
    <Right />
  </Header>
);

export default CustomHeader;

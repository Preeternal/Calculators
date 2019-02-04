import React from 'react';

import {
  Header, Body, Title, Left, Icon, Right,
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
      paddingLeft: 12,
    }}
  >
    <Left>
      <Icon name="ios-menu" style={{ color: 'white' }} onPress={() => props.drawerOpen()} />
    </Left>
    <Body>
      <Title style={{ color: 'white' }}>{props.title}</Title>
    </Body>
    <Right />
  </Header>
);

export default CustomHeader;

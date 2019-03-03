import React from 'react';
import { withNavigation } from 'react-navigation';

import {
  Header, Body, Title, Left, Icon, Right, Button,
} from 'native-base';

const CustomHeader = props => (
  <Header
    key={props.navigation.state.params ? props.navigation.state.params.DLabel : 'header'}
    androidStatusBarColor="#757171"
    style={{
      backgroundColor: '#525050',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 2,
    }}
  >
    <Left>
      <Button transparent onPress={() => props.drawerOpen()}>
        <Icon name="ios-menu" style={{ fontSize: 30, color: 'white' }} />
      </Button>
    </Left>
    <Body>
      <Title
        style={{
          color: 'white',
          textAlign: 'left',
        }}
      >
        {props.title}
      </Title>
    </Body>
    <Right />
  </Header>
);

export default withNavigation(CustomHeader);

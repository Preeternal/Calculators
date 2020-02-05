import React from 'react';
import { Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Header, Body, Title, Left, Icon, Right, Button } from 'native-base';

const CustomHeader = props => (
  <Header
    key={
      props.navigation.state.params
        ? props.navigation.state.params.DLabel
        : 'header'
    }
    androidStatusBarColor="#525050"
    iosBarStyle="light-content"
    style={{
      backgroundColor: '#525050',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 2,
    }}
  >
    {/* <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#757171" /> */}
    <Left>
      <Button transparent onPress={() => props.drawerOpen()}>
        <Icon name="ios-menu" style={{ fontSize: 30, color: 'white' }} />
      </Button>
    </Left>
    <Body>
      <Title
        style={{
          fontFamily: 'Ubuntu',
          color: 'white',
          textAlign: 'left',
          width: 0.5 * Dimensions.get('window').width,
        }}
      >
        {props.title}
      </Title>
    </Body>
    <Right>{props.right}</Right>
  </Header>
);

export default withNavigation(CustomHeader);

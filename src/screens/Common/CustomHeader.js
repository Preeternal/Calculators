import React from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { Header } from '@react-navigation/native';

import {
  // Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Button,
} from 'native-base';

const CustomHeader = props => (
  <>
    {/* <Header> */}
    {/* <StatusBar barStyle="dark-content" backgroundColor="#525050" /> */}
    <View
      style={{
        backgroundColor: '#525050',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
        height: 100,
      }}
    >
      {/* <Header
      key="header"
      // androidStatusBarColor="#525050"
      // iosBarStyle="dark-content"
      style={{
        backgroundColor: '#525050',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
      }}
    > */}
      <Left>
        <Button
          transparent
          onPress={() => {
            props.drawerOpen();
            // StatusBar.setBackgroundColor('#262222', true);
            // StatusBar.setTranslucent(true);
          }}
        >
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
      {/* </Header> */}
    </View>
    {/* </Header> */}
  </>
);

export default withNavigation(CustomHeader);

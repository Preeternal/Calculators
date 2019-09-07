import * as React from 'react';
import { withNavigation } from 'react-navigation';
import type { NavigationStateRoute, NavigationScreenProp } from 'react-navigation';
// import { BackHandler } from 'react-native';

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>,
  children?: React.Node,
};

class HandleBack extends React.Component<Props> {
  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBack);
    this.willBlur = this.props.navigation.addListener('willBlur', this.onBack);
  }

  componentWillUnmount() {
    // this.backHandler.remove();
    this.willBlur.remove();
  }

  onBack = () => {
    this.props.onBack();
  };

  render() {
    return this.props.children;
  }
}

export default withNavigation(HandleBack);

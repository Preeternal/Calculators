// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import { CurrencyPreset } from '../../components/converter/CurrencyPreset';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  preset: Array<string>,
  presetChanged: Function,
  navigation: Function,
};

type State = {};

const styles = {
  headerText: {
    color: '#ffffff',
    fontSize: 18,
  },
  rightButton: {
    marginRight: 15,
  },
  leftButton: {
    marginLeft: 15,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
};

class EditPreset extends Component<Props, State> {
  static navigationOptions = () => ({
    drawerLockMode: 'locked-closed',
    headerTitle: <Text style={styles.headerText}>{strings('converter.changeCurr')}</Text>,
    headerStyle: {
      backgroundColor: '#525050',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  state = {};

  componentDidMount() {
    // const { preset, currencies } = this.props;
    // const filter = currencies.filter(currency => !preset.includes(currency.charCode));
    // this.setState({
    //   additionalCurrencies: [...filter],
    //   checked: filter.map(() => null),
    // });
    // this.props.navigation.setParams({ handleSave: this.saveDetails });
  }

  // handleClick = (charCode, index) => {
  //   this.setState((prevState) => {
  //     const checked = [...prevState.checked];
  //     checked[index] = prevState.checked[index] === charCode ? null : charCode;
  //     return { checked };
  //   });
  // };

  // saveDetails = () => {
  //   const presetSelected = this.state.checked.filter(item => item !== null);
  //   const preset = this.props.preset.concat(presetSelected);
  //   this.onPresetChange(preset);
  //   const { currencies, presetCurrencies } = this.props;
  //   const filter = currencies.filter(currency => preset.includes(currency.charCode));
  //   filter.sort((a, b) => preset.indexOf(a.charCode) - preset.indexOf(b.charCode));
  //   if (!presetCurrencies[0] || presetCurrencies[0].input === filter[0].input) {
  //     this.onPresetCurrencyChange(filter);
  //   } else if (presetCurrencies[0].input !== filter[0].input) {
  //     this.onPresetCurrencyChangeWithDivider(0, presetCurrencies[0].input, filter);
  //   }
  //   this.props.navigation.goBack();
  // };

  onDelete = (item) => {
    Alert.alert(
      `${strings('converter.delete')} ${item}`,
      `${strings('converter.remove')} ${item} ${strings('converter.fromTheList')}`,
      [
        {
          text: strings('common.cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: strings('common.ok'), onPress: () => console.log(item) },
      ],
      // { cancelable: false },
    );
  };

  onPresetChange = (array) => {
    this.props.presetChanged(array);
  };

  render() {
    // console.log(this.state.checked);
    // console.log(this.props.preset);
    return (
      <Fragment>
        <FlatList
          data={this.props.preset}
          extraData={this.props}
          renderItem={({ item, index }) => (
            <CurrencyPreset char={item} onDelete={() => this.onDelete(item)} onMove={() => {}} />
          )}
          keyExtractor={item => item}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  preset: state.converter.preset,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(EditPreset);

// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { CurrencyAdditional } from '../../components/converter/CurrencyAdditional';
import { strings } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  language: number,
  preset: Array<string>,
  currencies: Array<Object>,
  presetChanged: Function,
  navigation: Object,
};

type State = {
  additionalCurrencies: Array<Object>,
  checked: Array<string | null>,
};

const styles = {
  headerText: {
    fontFamily: 'Ubuntu',
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

class AddCurrency extends Component<Props, State> {
  // static navigationOptions = ({ navigation }: { navigation: Object }) => ({
  //   drawerLockMode: 'locked-closed',
  //   headerTitle: () => (
  //     <Text style={styles.headerText}>{strings('converter.addCurrency')}</Text>
  //   ),
  //   headerStyle: {
  //     // backgroundColor: '#f4511e',
  //     backgroundColor: '#525050',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  //   headerLeft: () => (
  //     <TouchableOpacity
  //       style={styles.leftButton}
  //       onPress={() => {
  //         navigation.goBack();
  //       }}
  //     >
  //       <Icon name="md-close" style={styles.actionButtonIcon} />
  //     </TouchableOpacity>
  //   ),
  //   // headerBackImage: <Icon name="md-close" style={styles.actionButtonIcon} />,
  //   headerRight: () => (
  //     <TouchableOpacity
  //       style={styles.rightButton}
  //       onPress={navigation.getParam('handleSave')}
  //     >
  //       <Icon
  //         type="MaterialIcons"
  //         name="done"
  //         style={styles.actionButtonIcon}
  //       />
  //       {/* md-checkmark */}
  //     </TouchableOpacity>
  //   ),
  // });

  state = { additionalCurrencies: [], checked: [] };

  componentDidMount() {
    const { preset, currencies } = this.props;
    const filter = currencies.filter(
      currency => !preset.includes(currency.charCode),
    );
    this.setState({
      additionalCurrencies: [...filter],
      checked: filter.map(() => null),
    });
    this.props.navigation.setParams({ handleSave: this.saveDetails });
  }

  handleClick = (charCode: string, index: number) => {
    this.setState(prevState => {
      const checked = [...prevState.checked];
      checked[index] = prevState.checked[index] === charCode ? null : charCode;
      return { checked };
    });
  };

  saveDetails = () => {
    const presetSelected = this.state.checked.filter(item => item !== null);
    const preset = this.props.preset.concat(presetSelected);
    this.onPresetChange(preset);
    this.props.navigation.goBack();
  };

  onPresetChange = (array: Array<string | null>) => {
    this.props.presetChanged(array);
  };

  render() {
    return (
      <Fragment>
        <FlatList
          data={[...this.state.additionalCurrencies]}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <CurrencyAdditional
              name={this.props.language === 0 ? item.name : item.nameEng}
              char={item.charCode}
              checked={!!this.state.checked[index]}
              handleClick={() => this.handleClick(item.charCode, index)}
            />
          )}
          keyExtractor={item => item.charCode}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  language: state.settings.language,
  preset: state.converter.preset,
  currencies: state.converter.currencies,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect<any, any, any, any, any, any>(
  mapStateToProps,
  mapDispatchToActions,
)(AddCurrency);

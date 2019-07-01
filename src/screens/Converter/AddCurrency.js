// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { CurrencyAdditional } from '../../components/converter/CurrencyAdditional';
import { strings, currentLocale } from '../../../locales/i18n';
import { presetChanged } from '../../actions';

type Props = {
  preset: Array<string>,
  currencies: Array<Object>,
  presetChanged: Function,
  // presetCurrencies: Array<Object>,
  // navigation: Function,
};

type State = {
  additionalCurrencies: Array<Object>,
  checked: Array<boolean>,
  preset: Array<string>,
};

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

class AddCurrency extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    drawerLockMode: 'locked-closed',
    headerTitle: <Text style={styles.headerText}>{strings('converter.addCurrency')}</Text>,
    headerStyle: {
      // backgroundColor: '#f4511e',
      backgroundColor: '#525050',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: (
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="md-close" style={styles.actionButtonIcon} />
      </TouchableOpacity>
    ),
    // headerBackImage: <Icon name="md-close" style={styles.actionButtonIcon} />,
    headerRight: (
      <TouchableOpacity
        style={styles.rightButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon type="MaterialIcons" name="done" style={styles.actionButtonIcon} />
        {/* md-checkmark */}
      </TouchableOpacity>
    ),
  });

  state = { additionalCurrencies: [], checked: [], preset: [] };

  componentDidMount() {
    const { preset, currencies } = this.props;
    const filter = currencies.filter(currency => !preset.includes(currency.charCode));
    this.setState({
      additionalCurrencies: [...filter],
      checked: filter.map(() => false),
    });
  }

  handleClick = (index) => {
    this.setState((prevState) => {
      const checked = [...prevState.checked];
      checked[index] = !prevState.checked[index];
      // const preset = checked.map((item) => {if (item === true) {}})
      const found = this.state.additionalCurrencies.map((e, i) => {
        if (i === index) {
          return e;
        }
        return null;
      });
      console.log(found);
      return { checked };
    });
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
          data={[...this.state.additionalCurrencies]}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <CurrencyAdditional
              name={currentLocale.substring(0, 2) === 'ru' ? item.name : item.nameEng}
              char={item.charCode}
              checked={this.state.checked[index]}
              handleClick={() => this.handleClick(index)}
              // appInputStyle={{ color: this.state.inputStyle[index] }}
            />
          )}
          keyExtractor={item => item.charCode}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  preset: state.converter.preset,
  currencies: state.converter.currencies,
});

const mapDispatchToActions = {
  presetChanged,
};

export default connect(
  mapStateToProps,
  mapDispatchToActions,
)(AddCurrency);

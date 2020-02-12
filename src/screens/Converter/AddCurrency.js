// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { CurrencyAdditional } from '../../components/converter/CurrencyAdditional';
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
  rightButton: {
    marginRight: 20,
  },
  actionButtonIcon: {
    fontSize: 24,
    color: 'white',
  },
};

class AddCurrency extends Component<Props, State> {
  state = { additionalCurrencies: [], checked: [] };

  componentDidMount() {
    const { preset, currencies, navigation } = this.props;
    const filter = currencies.filter(
      currency => !preset.includes(currency.charCode),
    );
    this.setState({
      additionalCurrencies: [...filter],
      checked: filter.map(() => null),
    });
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.rightButton} onPress={this.saveDetails}>
          <Icon
            type="FontAwesome"
            name="save"
            style={styles.actionButtonIcon}
          />
        </TouchableOpacity>
      ),
    });
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

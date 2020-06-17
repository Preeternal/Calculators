// @flow
import React, { Component, Fragment } from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { CurrencyAdditional } from '../../components/converter/CurrencyAdditional';
import AlphabeticScrollBar from '../../components/converter/AlphabeticScrollBar';
import AlphabeticScrollBarPointer from '../../components/converter/AlphabeticScrollBarPointer';
import { presetChanged } from '../../actions';
import { LocalizationContext } from '../../Context';

import type { Currency } from '../../reducers/ConverterReducer';

type Props = {
  language: number,
  isLandscape: boolean,
  preset: Array<string | null>,
  currencies: Array<Currency>,
  presetChanged: (array: Array<string | null>) => void,
  navigation: Object,
};

type State = {
  fullListCurrencies: Array<Currency>,
  renderedListCurrencies: Array<Currency>,
  checked: Array<string | null>,
  viewableLetters: Array<Object>,
  activeLetter?: ?string,
  pointerTop: number,
};

const styles = StyleSheet.create({
  rightButton: {
    marginRight: 20,
  },
  actionButtonIcon: {
    fontSize: 25,
    color: 'white',
  },
  searchContainer: {
    marginLeft: 10,
    marginRight: 30,
    marginTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
});

class AddCurrency extends Component<Props, State> {
  static contextType = LocalizationContext;

  flatlist: {| current: null | FlatList<Object> |} = React.createRef();

  constructor(props: Props) {
    super(props);
    const { preset, currencies } = this.props;
    const filter = currencies.filter(
      currency => !preset.includes(currency.charCode),
    );
    filter.sort((a, b) => a.charCode.localeCompare(b.charCode));
    this.state = {
      fullListCurrencies: filter,
      renderedListCurrencies: filter,
      checked: [],
      viewableLetters: [],
      activeLetter: undefined,
      pointerTop: 0,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.rightButton} onPress={this.saveDetails}>
          <MaterialIcons name="done" style={styles.actionButtonIcon} />
        </TouchableOpacity>
      ),
    });
  }

  handleClick = (charCode: string) => {
    this.setState(prevState => {
      let checked = [...prevState.checked];
      if (checked.includes(charCode)) {
        checked = checked.filter(item => item !== charCode);
      } else {
        checked.push(charCode);
      }
      return { checked };
    });
  };

  saveDetails = () => {
    const presetSelected = this.state.checked.filter(item => !!item);
    const preset = this.props.preset.concat(presetSelected);
    this.onPresetChange(preset);
    this.props.navigation.goBack();
  };

  onPresetChange = (array: Array<string | null>) => {
    this.props.presetChanged(array);
  };

  SearchBar = () => {
    const { t } = this.context;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          height: 52,
        }}
      >
        <View style={styles.searchContainer}>
          <Icon name="ios-search" style={{ fontSize: 25, color: '#525050' }} />
          <TextInput
            placeholder={t('converter.search')}
            onChangeText={this.searchFilterFunction}
            style={{ flex: 1 }}
          />
          <FontAwesome5
            name="coins"
            style={{ fontSize: 20, color: '#525050' }}
          />
        </View>
      </View>
    );
  };

  searchFilterFunction = (text: string) => {
    const { fullListCurrencies } = this.state;
    if (!text || text === '') {
      this.setState({ renderedListCurrencies: fullListCurrencies });
    } else {
      let filteredList = [...fullListCurrencies];
      filteredList = filteredList.filter(item => {
        const itemData = `${item.name.toUpperCase()}   
      ${item.nameEng.toUpperCase()} ${item.charCode.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ renderedListCurrencies: filteredList });
    }
  };

  scrollToIndex = (letter: string, Y: number) => {
    this.setActiveLetter(letter);
    this.setState({ pointerTop: Y });
    if (letter === '#') {
      if (this.flatlist.current)
        this.flatlist.current.scrollToOffset({ animated: true, offset: 0 });
    } else {
      const { renderedListCurrencies } = this.state;
      const index = renderedListCurrencies.findIndex(item => {
        const upperCase = item.charCode.toUpperCase();
        if (upperCase.slice(0, 1) === letter) return true;
        return false;
      });
      if (this.flatlist.current)
        this.flatlist.current.scrollToIndex({ animated: true, index });
    }
  };

  onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<Object>,
    // changed: Array<Object>,
  }) => {
    const viewableLetters = new Set(
      viewableItems.map(e => e.item.charCode.slice(0, 1)),
    );
    this.setState({ viewableLetters: [...viewableLetters] });
  };

  setActiveLetter = (letter: ?string) => {
    this.setState({ activeLetter: letter });
  };

  render() {
    const {
      renderedListCurrencies,
      fullListCurrencies,
      checked,
      viewableLetters,
      activeLetter,
      pointerTop,
    } = this.state;
    const { isLandscape } = this.props;
    const numberOfRows = isLandscape ? 6 : 12;
    const alphabet = [
      '#',
      ...new Set(renderedListCurrencies.map(e => e.charCode.slice(0, 1))),
    ];
    return (
      <Fragment>
        <FlatList
          ref={this.flatlist}
          data={[...renderedListCurrencies]}
          extraData={this.state}
          initialNumToRender={renderedListCurrencies.length + 1}
          renderItem={({ item }) => (
            <CurrencyAdditional
              name={this.props.language === 0 ? item.name : item.nameEng}
              char={item.charCode}
              checked={checked.includes(item.charCode)}
              handleClick={() => this.handleClick(item.charCode)}
            />
          )}
          keyExtractor={item => item.charCode}
          ListHeaderComponent={this.SearchBar}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
          }}
        />
        {fullListCurrencies.length === renderedListCurrencies.length &&
          renderedListCurrencies.length > numberOfRows && (
            <AlphabeticScrollBar
              alphabet={alphabet}
              viewableLetters={viewableLetters}
              scrollToIndex={this.scrollToIndex}
              scrollBarContainerStyle={{ backgroundColor: 'white' }}
              setActiveLetter={this.setActiveLetter}
            />
          )}

        {activeLetter && (
          <AlphabeticScrollBarPointer letter={activeLetter} top={pointerTop} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  language: state.settings.language,
  isLandscape: state.settings.isLandscape,
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

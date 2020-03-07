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
// import AlphaScrollFlatList from 'alpha-scroll-flat-list';
import { Icon } from 'native-base';

import { CurrencyAdditional } from '../../components/converter/CurrencyAdditional';
import AlphabeticScrollBar from '../../components/converter/AlphabeticScrollBar';
import AlphabeticScrollBarPointer from '../../components/converter/AlphabeticScrollBarPointer';
import { presetChanged } from '../../actions';
import { LocalizationContext } from '../../Context';

type Props = {
  language: number,
  isLandscape: boolean,
  preset: Array<string>,
  currencies: Array<Object>,
  presetChanged: Function,
  navigation: Object,
};

type State = {
  fullListCurrencies: Array<Object>,
  renderedListCurrencies: Array<Object>,
  checked: Array<string | null>,
  viewableLetters: Array<Object>,
  activeLetter?: ?string,
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
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.rightButton} onPress={this.saveDetails}>
          <Icon
            type="MaterialIcons"
            name="done"
            style={styles.actionButtonIcon}
          />
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
          <Icon name="ios-search" />
          <TextInput
            placeholder={t('converter.search')}
            onChangeText={this.searchFilterFunction}
            style={{ flex: 1 }}
          />
          <Icon
            type="FontAwesome5"
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

  scrollToIndex = (letter: string) => {
    this.setActiveLetter(letter);
    this.setState({ activeLetter: letter });
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
  }: // changed,
  {
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

  static contextType = LocalizationContext;

  render() {
    const {
      renderedListCurrencies,
      fullListCurrencies,
      checked,
      viewableLetters,
      activeLetter,
    } = this.state;
    console.log('activeLetter', activeLetter);
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

        {/* {activeLetter && (
          <AlphabeticScrollBarPointer
            letter={this.state.activeLetter}
            // color={this.props.activeColor}
            // top={this.state.activeLetterViewTop}
            // style={this.props.scrollBarPointerContainerStyle}
          />
        )} */}

        {/* <AlphaScrollFlatList
        //   keyExtractor={item => item.charCode}
        //   data={[...this.state.renderedListCurrencies]}
        //   extraData={this.state}
        //   renderItem={({ item, index }) => (
        //     <CurrencyAdditional
        //       name={this.props.language === 0 ? item.name : item.nameEng}
        //       char={item.charCode}
        //       checked={!!this.state.checked[index]}
        //       handleClick={() => this.handleClick(item.charCode, index)}
        //     />
        //   )}
        //   renderHeader={() => {
        //     return <SearchBar />;
        //   }}
        //   scrollKey="charCode"
        //   activeColor="rgba(231,76,60,1)"
        //   scrollBarContainerStyle={{ backgroundColor: 'white' }}
        //   itemHeight={52}
        // /> */}
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

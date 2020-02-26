// @flow
import React, { Component, Fragment } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AlphaScrollFlatList from 'alpha-scroll-flat-list';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
} from 'native-base';

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
  fullListCurrencies: Array<Object>,
  renderedListCurrencies: Array<Object>,
  checked: Array<string | null>,
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
    // width: 300,
    // padding: 10,
    margin: 5,
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

  SearchBar = () => {
    return (
      // <Container>
      // <Header searchBar rounded>

      <View style={styles.searchContainer}>
        <Icon name="ios-search" />
        <Input placeholder="Search" onChangeText={this.searchFilterFunction} />
        <Icon name="ios-people" />
      </View>
      // <Button transparent>
      //   <Text>Search</Text>
      // </Button>
      // </Header>
      // </Container>
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

  render() {
    const { renderedListCurrencies } = this.state;
    return (
      <Fragment>
        {!!renderedListCurrencies.length && (
          <FlatList
            data={[...this.state.renderedListCurrencies]}
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
            ListHeaderComponent={this.SearchBar}
          />
        )
        // {/* <AlphaScrollFlatList
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
        }
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

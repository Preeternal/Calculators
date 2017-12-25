import React from 'react';
import { View, Text } from 'react-native';

function ViewItem(props) {
  return (
    <View style={props.style}>
      <Text style={styles.textStyle}>{props.value}</Text>
    </View>
  );
}

const Table = (props) => {
  const {containerStyle, headerStyle, NStyle, DStyle, TStyle, renderStyle,
    textStyle, startStyle, endStyle} = styles;
  const tableHead = ['№', 'дата', 'начислено процентов'];
  const tablen = props.tablen;
  const n = tablen.map((number) =>
    <ViewItem
      key={number.toString()}
      value={number}
      style={startStyle}
    />
  );
  const tabled = props.tabled;
  const date = tabled.map((d) =>
    <ViewItem
      key={d.toString()}
      value={d}
      style={startStyle}
    />
  );
  const tablet = props.tablet;
  const totalinterest1 = tablet.map((t) =>
    <ViewItem
      key={t.toString()}
      value={t}
      style={endStyle}
    />
  );
  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <View style={NStyle}>
          <Text style={textStyle}>{tableHead[0]}</Text>
        </View>
        <View style={DStyle}>
          <Text style={textStyle}>{tableHead[1]}</Text>
        </View>
        <View style={TStyle}>
          <Text style={textStyle}>{tableHead[2]}</Text>
        </View>
      </View>
      <View style={renderStyle}>
        <View style={NStyle}>
          {n}
        </View>
        <View style={DStyle}>
          {date}
        </View>
        <View style={TStyle}>
          {totalinterest1}
        </View>
      </View>
    </View>
  );
};


const styles = {
  containerStyle: {
    //borderBottomWidth: 1,
    //padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    //borderColor: '#ddd',
    position: 'relative'
  },
  headerStyle: {
    borderBottomWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#ddd',
    //padding: 5,
    //alignItems: 'center',
    //justifyContent: 'center',
    //alignSelf: 'center',
    flexDirection: 'row'
  },
  renderStyle: {
    // borderBottomWidth: 1,
    // borderColor: '#ddd',
    //padding: 5,
    //alignSelf: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    textAlign: 'center'
  },
  NStyle: {
    flex: 1,
  },
  DStyle: {
    flex: 2,
  },
  TStyle: {
    flex: 1,
  },
  startStyle: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  endStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

};

export { Table };

import React from 'react';
import { View, Text } from 'react-native';

const ViewItem = props => (
  <View style={props.style}>
    <Text style={styles.textStyle}>{props.value}</Text>
  </View>
);

const column = (col, style) => col.map((value, index) => (
  <ViewItem key={parseInt(index.toString(), 10) + value} value={value} style={style} />
));

const Table = (props) => {
  const {
    containerStyle,
    headerStyle,
    renderStyle,
    textStyle,
    ViewItemStyle,
    col1Style,
    col2Style,
    col3Style,
    col4Style,
    col5Style,
    col6Style,
  } = styles;
  const tableHead = ['№', 'дата', 'начислено %', 'дни', 'начислено  % итого', 'общая сумма'];
  const col1 = column(props.col1, ViewItemStyle);
  const col2 = column(props.col2, ViewItemStyle);
  const col3 = column(props.col3, ViewItemStyle);
  const col4 = column(props.col4, ViewItemStyle);
  const col5 = column(props.col5, ViewItemStyle);
  const col6 = column(props.col6, ViewItemStyle);

  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <View style={col1Style}>
          <Text style={textStyle}>{tableHead[0]}</Text>
        </View>
        <View style={col2Style}>
          <Text style={textStyle}>{tableHead[1]}</Text>
        </View>
        <View style={col3Style}>
          <Text style={textStyle}>{tableHead[2]}</Text>
        </View>
        <View style={col4Style}>
          <Text style={textStyle}>{tableHead[3]}</Text>
        </View>
        <View style={col5Style}>
          <Text style={textStyle}>{tableHead[4]}</Text>
        </View>
        <View style={col6Style}>
          <Text style={textStyle}>{tableHead[5]}</Text>
        </View>
      </View>
      <View style={renderStyle}>
        <View style={col1Style}>{col1}</View>
        <View style={col2Style}>{col2}</View>
        <View style={col3Style}>{col3}</View>
        <View style={col4Style}>{col4}</View>
        <View style={col5Style}>{col5}</View>
        <View style={col6Style}>{col6}</View>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative',
  },
  headerStyle: {
    // height: 37,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  renderStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
  ViewItemStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  col1Style: {
    flex: 0.3,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col2Style: {
    flex: 0.8,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col3Style: {
    flex: 0.65,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col4Style: {
    flex: 0.35,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col5Style: {
    flex: 0.8,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col6Style: {
    flex: 1,
  },
};

export { Table };

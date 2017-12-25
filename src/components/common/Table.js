import React from 'react';
import { View, Text } from 'react-native';

const ViewItem = (props) => {
  return (
    <View style={props.style}>
      <Text style={styles.textStyle}>{props.value}</Text>
    </View>
  );
};

const column = (col, style) => {
  return col.map((value) =>
    <ViewItem
      key={value.toString()}
      value={value}
      style={style}
    />
  );

};

const Table = (props) => {
  const {containerStyle, headerStyle, renderStyle, textStyle, startStyle, endStyle,
    col1Style, col2Style, col3Style, col4Style, col5Style, col6Style} = styles;
  const tableHead = ['№', 'дата', 'начислено %', 'кол-во дней', 'начислено % итого',
    'общая сумма сбережений'];
  const col1 = column(props.col1, startStyle);
  const col2 = column(props.col2, startStyle);
  const col3 = column(props.col3, startStyle);
  const col4 = column(props.col4, startStyle);
  const col5 = column(props.col5, startStyle);
  const col6 = column(props.col6, endStyle);


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
        <View style={col1Style}>
          {col1}
        </View>
        <View style={col2Style}>
          {col2}
        </View>
        <View style={col3Style}>
          {col3}
        </View>
        <View style={col4Style}>
          {col4}
        </View>
        <View style={col5Style}>
          {col5}
        </View>
        <View style={col6Style}>
          {col6}
        </View>
      </View>
    </View>
  );
};


const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative'
  },
  headerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    flexDirection: 'row'
  },
  renderStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center'
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
  col1Style: {
    flex: 0.3,
  },
  col2Style: {
    flex: 1,
  },
  col3Style: {
    flex: 0.8,
  },
  col4Style: {
    flex: 0.5,
  },
  col5Style: {
    flex: 0.9,
  },
  col6Style: {
    flex: 1,
  },

};

export { Table };

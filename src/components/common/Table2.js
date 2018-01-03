import React from 'react';
import { View, Text } from 'react-native';

// const ViewItem = (props) => {
//   return (
//     <View style={props.style}>
//       <Text style={styles.textStyle}>{props.value}</Text>
//     </View>
//   );
// };

// const column = (col, style) => {
//   return col.map((value, index) =>
//     <ViewItem
//       key={index + value.toString()}
//       value={value}
//       style={style}
//     />
//   );

// };

const cell = (row_value) => {
  for (let i = 1; i <= row_value.length; i++) {
    console.log(row_value[i]);
    return (         
      <View style={styles[`col${i}Style`]}>
        <Text style={styles.textStyle}>{row_value[i-1]}</Text>
      </View>
    );
  }
}; 
const row = (row, style) => {
  return row.map((value, index) =>          
    <View key={index} style={styles.renderStyle}>    
      {cell(value)}
    </View>
      
    

    /* <View style={styles.col1Style}>
      <Text style={styles.textStyle}>{value[0]}</Text>
    </View>
    <View style={styles.col2Style}>
      <Text style={styles.textStyle}>{value[1]}</Text>
    </View>
    <View style={styles.col3Style}>
      <Text style={styles.textStyle}>{value[2]}</Text>
    </View>
    <View style={styles.col4Style}>
      <Text style={styles.textStyle}>{value[3]}</Text>
    </View>
    <View style={styles.col5Style}>
      <Text style={styles.textStyle}>{value[4]}</Text>
    </View>
    <View style={styles.col6Style}>
      <Text style={styles.textStyle}>{value[5]}</Text>
    </View> 
    
    */
  );
};

const transpose = (a) => {

  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if (h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for (i = 0; i < h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for (j = 0; j < w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
};

const Table2 = (props) => {
  const {containerStyle, headerStyle, renderStyle, textStyle, ViewItemStyle,
    col1Style, col2Style, col3Style, col4Style, col5Style, col6Style} = styles;
  const tableHead = ['№', 'дата', 'начислено %', 'дни', 'начислено  % итого',
    'общая сумма'];
  // const col1 = column(props.col1, ViewItemStyle);
  // const col2 = column(props.col2, ViewItemStyle);
  // const col3 = column(props.col3, ViewItemStyle);
  // const col4 = column(props.col4, ViewItemStyle);
  // const col5 = column(props.col5, ViewItemStyle);
  // const col6 = column(props.col6, ViewItemStyle);
 
  console.log(props.value.n);
  const reverse = transpose([props.value.n, props.value.date, props.value.totalinterest1, 
    props.value.daysY, props.value.totalinterest2, props.value.principal1]);
  //console.log(reverse[0]);
  const rows = row(reverse);
  //console.log(rows);


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
      {/* <View style={renderStyle}> */}
      {rows}
      {/* <View style={col1Style}>
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
        </View> */}
      {/* </View> */}
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
    //height: 37,
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
    borderBottomWidth: 1, //
    borderColor: '#ddd'   //
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
    //flex: 0.5,  
    flex: 0.9,    
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

export { Table2 };

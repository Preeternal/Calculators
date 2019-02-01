import React from 'react';
import { View, Text } from 'react-native';
import { strings, currentLocale } from '../../../locales/i18n';
import 'number-to-locale-string';

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const row = rows => rows.map((value, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <View key={index + value[4]} style={styles.renderStyle}>
    <View style={styles.col1Style}>
      <Text style={styles.textStyle}>{value[0]}</Text>
    </View>
    <View style={styles.col2Style}>
      <Text style={styles.textStyle}>{value[1]}</Text>
    </View>
    <View style={styles.col3Style}>
      <Text style={styles.textStyle}>{value[2].toLocaleString(currentLocale, options)}</Text>
    </View>
    <View style={styles.col4Style}>
      <Text style={styles.textStyle}>{value[3]}</Text>
    </View>
    <View style={styles.col5Style}>
      <Text style={styles.textStyle}>{value[4].toLocaleString(currentLocale, options)}</Text>
    </View>
    <View style={styles.col6Style}>
      <Text style={styles.textStyle}>{value[5].toLocaleString(currentLocale, options)}</Text>
    </View>
  </View>
));

const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
const Table = (props) => {
  const {
    containerStyle,
    headerStyle,
    textStyle,
    col1Style,
    col2Style,
    col3Style,
    col4Style,
    col5Style,
    col6Style,
  } = styles;
  // const tableHead = ['№', 'дата', 'начислено %', 'дни', 'начислено  % итого', 'общая сумма'];
  const tableHead = strings('table.tableHead');
  const reverse = transpose([
    props.value.n,
    props.value.date,
    props.value.totalinterest1,
    props.value.daysY,
    props.value.totalinterest2,
    props.value.principal1,
  ]);

  const rows = row(reverse);

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
          <Text style={textStyle}>
            {`${tableHead[2]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
        <View style={col4Style}>
          <Text style={textStyle}>{tableHead[3]}</Text>
        </View>
        <View style={col5Style}>
          <Text style={textStyle}>
            {`${tableHead[4]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
        <View style={col6Style}>
          <Text style={textStyle}>
            {`${tableHead[5]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
      </View>
      {rows}
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
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
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

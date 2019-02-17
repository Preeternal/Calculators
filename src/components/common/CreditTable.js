import React from 'react';
import { View, Text } from 'react-native';
import { strings, currentLocale } from '../../../locales/i18n';
import 'number-to-locale-string';

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const CreditTable = (props) => {
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
    col7Style,
    col8Style,
    col9Style,
  } = styles;
    // const tableHead = ['№', 'дата платежа', 'дни', 'погашение тела кредита',
    // 'платёж по процентам','комиссионные платежи', 'общая сумма платежа',
    // 'основной остаток долга', 'переплата'];
  const tableHead = strings('credit.table.tableHead');
  const row = rows => rows.map((value, index) => (
    <View
      // eslint-disable-next-line react/no-array-index-key
      key={index + value[3] + value[6]}
      style={[styles.renderStyle, { width: props.width }]}
    >
      <View style={styles.col1Style}>
        <Text style={styles.textStyle}>{value[0]}</Text>
      </View>
      <View style={styles.col2Style}>
        <Text style={styles.textStyle}>{value[1]}</Text>
      </View>
      <View style={styles.col3Style}>
        <Text style={styles.textStyle}>{value[2]}</Text>
      </View>
      <View style={styles.col4Style}>
        <Text style={styles.textStyle}>{value[3].toLocaleString(currentLocale, options)}</Text>
      </View>
      <View style={styles.col5Style}>
        <Text style={styles.textStyle}>{value[4].toLocaleString(currentLocale, options)}</Text>
      </View>
      {props.value.comPayments > 0 && (
      <View style={styles.col6Style}>
        <Text style={styles.textStyle}>{value[5].toLocaleString(currentLocale, options)}</Text>
      </View>
      )}
      <View style={styles.col7Style}>
        <Text style={styles.textStyle}>{value[6].toLocaleString(currentLocale, options)}</Text>
      </View>
      <View style={styles.col8Style}>
        <Text style={styles.textStyle}>{value[7].toLocaleString(currentLocale, options)}</Text>
      </View>
      <View style={styles.col9Style}>
        <Text style={styles.textStyle}>{value[8].toLocaleString(currentLocale, options)}</Text>
      </View>
    </View>
  ));
  const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
  const reverse = transpose([
    props.value.n,
    props.value.date,
    props.value.daysY,
    props.value.telo,
    props.value.procentFast,
    props.value.payMonths,
    props.value.monthlyA,
    props.value.principalA,
    props.value.pereplata,
  ]);
  const rows = row(reverse);

  return (
    <View style={containerStyle}>
      <View style={[headerStyle, { width: props.width }]}>
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
          <Text style={textStyle}>
            {`${tableHead[3]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
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
        {props.value.comPayments > 0 && (
        <View style={col6Style}>
          <Text style={textStyle}>
            {`${tableHead[5]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
        )}
        <View style={col7Style}>
          <Text style={textStyle}>
            {`${tableHead[6]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
        <View style={col8Style}>
          {/* \n */}
          <Text style={textStyle}>
            {`${tableHead[7]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
        <View style={col9Style}>
          <Text style={textStyle}>
            {`${tableHead[8]}, ${
              props.currency.substring(1) === 'руб' && props.language === 0
                ? props.currency.substring(1)
                : props.currency.charAt(0)
            }`}
          </Text>
        </View>
      </View>
      {rows}
      <View style={[headerStyle, { width: props.width }]}>
        <View style={{ flex: 0.3, borderRightWidth: 1, borderColor: '#f1f1f1' }} />
        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f1f1f1' }}>
          <Text style={textStyle}>{strings('credit.table.total')}</Text>
        </View>
        <View style={col3Style} />
        <View style={col4Style}>
          <Text style={textStyle}>
            {props.value.principal.toLocaleString(currentLocale, options)}
          </Text>
        </View>
        <View style={col5Style}>
          <Text style={textStyle}>
            {props.value.interestPayments.toLocaleString(currentLocale, options)}
          </Text>
        </View>
        {props.value.comPayments > 0 && (
        <View style={col6Style}>
          <Text style={textStyle}>
            {props.value.comPayments.toLocaleString(currentLocale, options)}
          </Text>
        </View>
        )}
        <View style={col7Style}>
          <Text style={textStyle}>
            {props.value.vsego.toLocaleString(currentLocale, options)}
          </Text>
        </View>
        <View style={col8Style}>
          <Text style={textStyle}>
           -
          </Text>
        </View>
        <View style={col9Style}>
          <Text style={textStyle}>
            {props.value.pereplataA.toLocaleString(currentLocale, options)}
          </Text>
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
    position: 'relative',
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
    flex: 1,
    flexDirection: 'row',
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
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col3Style: {
    flex: 0.35,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col4Style: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col5Style: {
    flex: 0.8,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col6Style: {
    flex: 1.3,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col7Style: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col8Style: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  col9Style: {
    flex: 1,
  },
};

export { CreditTable };

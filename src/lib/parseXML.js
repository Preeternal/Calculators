// @flow
import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { store } from '../store';
import { currenciesChanged } from '../actions/ConverterActions';

const dailyUrl = 'https://www.cbr.ru/scripts/XML_daily.asp';
const dailyEnUrl = 'https://www.cbr.ru/scripts/XML_daily_eng.asp';

// const parseXML = () => axios({
//   method: 'get',
//   url: dailyUrl,
//   responseType: 'arraybuffer',
// })
//   .then((response) => {
//     const result = iconv.decode(Buffer.from(response.data), 'windows-1251');
//     return parseString(result, (err, data) => {
//       const parsed = data.ValCurs.Valute.map((element) => {
//         const charCode = element.CharCode[0];
//         const name = element.Name[0];
//         const nominal = element.Nominal[0];
//         const updatedAt = new Date().toJSON();
//         const value = Number(
//           element.Value[0].match(',') ? element.Value[0].replace(',', '.') : element.Value[0],
//         );
//         return {
//           charCode,
//           name,
//           nominal,
//           updatedAt,
//           value,
//         };
//       });
//       console.log(parsed);
//       // return parsed;
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const parseXML = async () => {
  function selectCurrencies(state) {
    return state.converter.currencies;
  }
  const currencies = selectCurrencies(store.getState());
  console.log(currencies);
  const nextCurrencies = [...currencies];
  console.log('Current currencies state', currencies);

  // let currentValue;
  // function handleChange() {
  //   const previousValue = currentValue;
  //   currentValue = select(store.getState());

  //   if (previousValue !== currentValue) {
  //     console.log('Some deep nested property changed from', previousValue, 'to', currentValue);
  //   }
  //   console.log(currentValue);
  // }

  // const unsubscribe = store.subscribe(handleChange);
  // unsubscribe();

  const result = await axios({
    method: 'get',
    url: dailyUrl,
    responseType: 'arraybuffer',
  })
    .then(response => iconv.decode(Buffer.from(response.data), 'windows-1251'))
    .catch((err) => {
      console.log(err);
    });
  parseString(result, (err, data) => {
    const parsed = data.ValCurs.Valute.map((element) => {
      const charCode = element.CharCode[0];
      const name = element.Name[0];
      const nominal = element.Nominal[0];
      const updatedAt = new Date().toJSON();
      const value = Number(
        element.Value[0].match(',') ? element.Value[0].replace(',', '.') : element.Value[0],
      );
      return {
        charCode,
        name,
        nominal,
        updatedAt,
        value,
      };
    });
    store.dispatch(
      currenciesChanged([
        {
          charCode: 'RUB',
          id: '1',
          input: 1,
          name: 'Российский рубль',
          nameEng: 'Russian ruble',
          nominal: 1,
          updatedAt: new Date().toJSON(),
          value: 1,
          __typename: 'Currency',
        },
        ...parsed,
      ]),
    );
    // console.log('Next currencies state', nextCurrencies);
  });
  // console.log(result);
  // return result;
};

export default parseXML;

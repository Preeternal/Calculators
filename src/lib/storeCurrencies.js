// @flow
import axios from 'axios';
import { parseString } from 'react-native-xml2js';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';
import { gql } from 'apollo-boost';
import { DateTime } from 'luxon';

import { store } from '../store';
import { currenciesChanged } from '../actions/ConverterActions';
import client from '../client';
import { number } from '.';

const dailyUrl = 'https://www.cbr.ru/scripts/XML_daily.asp';
const dailyEnUrl = 'https://www.cbr.ru/scripts/XML_daily_eng.asp';

const storeCurrencies = () => {
  const selectCurrencies = state => state.converter.currencies;
  const currencies = selectCurrencies(store.getState());
  const newLocal = currencies instanceof Object ? typeof currencies[2] : undefined;
  let comprasion;
  if (newLocal === 'object' && currencies[2].nameEng !== undefined) {
    console.log(currencies[2].nameEng);
    comprasion = [...currencies];
    comprasion.splice(0, 1);
    console.log(comprasion);
  } else {
    axios({
      method: 'get',
      url: dailyEnUrl,
      responseType: 'arraybuffer',
    })
      .then((res) => {
        const result = iconv.decode(Buffer.from(res.data), 'windows-1251');
        const updatedAt = new Date().toJSON();
        return parseString(result, (err, data) => {
          const parsed = data.ValCurs.Valute.map((element) => {
            const charCode = element.CharCode[0];
            const nameEng = element.Name[0];
            const nominal = element.Nominal[0];
            const value = Number(
              element.Value[0].match(',') ? element.Value[0].replace(',', '.') : element.Value[0],
            );
            return {
              nameEng,
              charCode,
              nominal,
              updatedAt,
              value,
            };
          });
          comprasion = parsed;
          console.log(comprasion);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getLocalInput = (input) => {
    const minimumFractionDigits = Math.ceil(Number(input)) !== Number(input) ? 2 : 0;
    return Number(number(`${input}`)).toLocaleString('ru-RU', {
      minimumFractionDigits,
      maximumFractionDigits: minimumFractionDigits,
    });
  };

  const getFrontendRequest = () => axios({
    method: 'get',
    url: dailyUrl,
    responseType: 'arraybuffer',
  })
    .then((res) => {
      const result = iconv.decode(Buffer.from(res.data), 'windows-1251');
      const updatedAt = new Date().toJSON();
      return parseString(result, (err, data) => {
        const parsed = data.ValCurs.Valute.map((element) => {
          const charCode = element.CharCode[0];
          const name = element.Name[0];
          const nominal = element.Nominal[0];
          const value = Number(
            element.Value[0].match(',') ? element.Value[0].replace(',', '.') : element.Value[0],
          );
          return {
            name,
            charCode,
            nominal,
            updatedAt,
            value,
          };
        });
        store.dispatch(
          currenciesChanged([
            {
              id: '1',
              name: 'Российский рубль',
              nameEng: 'Russian ruble',
              charCode: 'RUB',
              nominal: 1,
              updatedAt,
              value: 1,
              __typename: 'Currency',
              input: 1,
            },
            ...parsed,
          ]),
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });

  client
    .query({
      query: getCurrencies,
    })
    .then((response) => {
      const currenciesWithInputField = response.data.currencies.map((currency) => {
        const curr = { ...currency };
        curr.input = getLocalInput(curr.nominal / curr.value);
        return curr;
      });
      const dt = DateTime.fromISO(currenciesWithInputField[0].updatedAt);
      // if (dt.minus({ hours: 1 }).toMillis() > dt.toMillis()) {
      getFrontendRequest();
      // }
      store.dispatch(
        currenciesChanged([
          {
            id: '1',
            name: 'Российский рубль',
            nameEng: 'Russian ruble',
            charCode: 'RUB',
            nominal: 1,
            updatedAt: currenciesWithInputField[0].updatedAt,
            value: 1,
            __typename: 'Currency',
            input: 1,
          },
          ...currenciesWithInputField,
        ]),
      );
    })
    .catch((err) => {
      console.log(err);
      const dt = DateTime.fromISO(currencies[1].updatedAt);
      console.log(dt);
      // if (dt.minus({ hours: 1 }).toMillis() > dt.toMillis()) {
      getFrontendRequest();
      // }
    });
};

export default storeCurrencies;

const getCurrencies = gql`
  query {
    currencies {
      id
      name
      nameEng
      charCode
      value
      nominal
      updatedAt
    }
  }
`;

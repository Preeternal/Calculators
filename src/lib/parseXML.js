import { parseString } from 'react-native-xml2js';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

if (typeof this.Buffer === 'undefined') {
  this.Buffer = Buffer.Buffer;
}

const dailyUrl = 'https://www.cbr.ru/scripts/XML_daily.asp';
const dailyEnUrl = 'https://www.cbr.ru/scripts/XML_daily_eng.asp';

const parseXML = () => {
  console.log('сейчас обновимся!');

  // fetch(dailyUrl).then(res => console.log(res.text()));
  fetch(dailyUrl)
    .then(response => response.text())
    .then((response) => {
      parseString(response, (err, result) => {
        const decoded = iconv.decode(Buffer.from(response), 'windows-1251');
        console.log(decoded);
        const parsed = result.ValCurs.Valute.map((currency) => {
          const charCode = currency.CharCode[0];
          const name = currency.Name[0];
          const nominal = currency.Nominal[0];
          const updatedAt = new Date().toJSON();
          const value = currency.Value[0];
          return {
            charCode,
            name,
            nominal,
            updatedAt,
            value,
          };
        });
        console.log(parsed);
      });
    })
    .catch((err) => {
      console.log('fetch', err);
    });
};

export default parseXML;

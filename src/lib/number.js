// @flow
export const number = (text: string): string => {
  let value;
  if (text.match(',') !== null) {
    value = text.replace(',', '.');
  } else {
    value = text;
  }
  let result;
  if (value.match(/[*.*][0-9]*[*.*]/) !== null) {
    if (value.match(/\.$/)) {
      result = value.replace(/\.$/, '');
    } else {
      result = value.replace(/[.]/, '');
    }
  } else {
    result = value;
  }

  return result.replace(/[^\d.]/g, '');
};

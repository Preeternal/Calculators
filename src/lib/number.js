// @flow
export const number = (text: string): string => {
  let value;
  if (text.match(',') !== null) {
    value = text.replace(',', '.');
  } else {
    value = text;
  }
  if (value.substring(0, 1) === '.') {
    if (text.length > 1) {
      value = `0.${value.substring(1, value.length)}`;
    } else {
      return '0.';
    }
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

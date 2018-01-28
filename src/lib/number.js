//@flow
export const number = (text:string) :string => {
  if (text.match(',') !== null) {
    text = text.replace(',', '.');
  }
  if (text.match(/[*.*][0-9]*[*.*]/) !== null) {
    if (text.match(/\.$/)) {
      text = text.replace(/\.$/, '');
    } else {
      text = text.replace(/[.]/, '');
    }
  }
  return text.replace(/[^\d.]/g, '');
};

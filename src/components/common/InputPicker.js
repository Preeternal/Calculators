import React from 'react';
import { View, Text, Picker } from 'react-native';

const InputPicker = ({ label, label1, label2,
  selectedValue, onValueChange, value1, value2 }) => {
  const { inputStyle, pickerStyle, labelStyle, containerStyle } = styles;

  return (
  <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View style={inputStyle}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={pickerStyle}
        >
          <Picker.Item
            label={label1}
            value={value1}
          />
          <Picker.Item
            label={label2}
            value={value2}
          />
        </Picker>
    </View>
  </View>
  );
};

const styles = {
  inputStyle: {
    //color: '#525050',
    paddingRight: 5,
    paddingLeft: 10,
    //marginLeft: 0,
    //paddingTop: 2,
    //fontSize: 15,
    //lineHeight: 23,
    flex: 1,
    height: 37,
    borderColor: 'gray',
    borderWidth: 1
  },
  pickerStyle: {
    color: '#525050',
    //paddingRight: 5,
    //paddingLeft: 20,
    //paddingTop: 2,
    //fontSize: 15,
    //lineHeight: 23,
    flex: 1,
    //height: 37,
    //borderColor: 'gray',
    //borderWidth: 1
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 10,
    flex: 2,
    //marginRight: 10,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { InputPicker };

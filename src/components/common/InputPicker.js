import React from 'react';
import { View, Text, Picker } from 'react-native';

const InputPicker = ({ label1, label, selectedValue, onValueChange, value }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label1}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={inputStyle}
      >
        <Picker.Item
          label={label}
          value={value}
        />
      </Picker>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#525050',
    paddingRight: 5,
    paddingLeft: 10,
    //paddingTop: 2,
    //fontSize: 15,
    //lineHeight: 23,
    flex: 1,
    height: 37,
    borderColor: 'gray',
    borderWidth: 1
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 10,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { InputPicker };

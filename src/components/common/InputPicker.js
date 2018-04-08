import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from 'native-base';
import { strings } from '../../../locales/i18n';

const InputPicker = ({ label, selectedValue, onValueChange, options }) => {
  const { containerStyle, labelStyle, labelTextStyle, inputStyle, pickerStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={inputStyle}>
        {/* <Text style={{ paddingLeft: 10 }} /> */}
        <View style={{ paddingLeft: 10 }} />
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          //itemStyle={{ color: '#525050' }}
          itemTextStyle={{ color: '#525050' }}
          iosHeader={strings('picker.iosHeader')}
          headerBackButtonText={strings('picker.headerBackButtonText')}
          //headerStyle={{ color: '#525050' }}
          textStyle={{ color: '#525050' }}
          //mode='dropdown'
          options={options}
          style={pickerStyle}
          //headerStyle={{ backgroundColor: '#b95dd3' }}
        >
          {options.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 52,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    //height: 52,
    flexDirection: 'row'
  },
  labelStyle: {
    flex: 1.9,
    borderRightWidth: 1,
    borderColor: '#ddd',
    // borderColor: 'gray',
    // borderRightWidth: 0.5,
    // borderLeftWidth: 1,
    // borderTopWidth: 0.7,
    // borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  labelTextStyle: {
    //fontSize: 15,
    paddingLeft: 10,
    paddingRight: 5
  },
  inputStyle: {
    flex: 1.1,
    //textDecorationLine: 'underline',
    //height: 52,
    // borderColor: 'gray',
    //borderWidth: 1,
    // borderRightWidth: 1,
    // borderLeftWidth: 0.5,
    // borderTopWidth: 0.7,
    // borderBottomWidth: 0.7,
    // justifyContent: 'center',
    flexDirection: 'row'
    //alignItems: 'center'
  },
  pickerStyle: {
    //color: '#525050',
    flex: 1
  }
};

export { InputPicker };

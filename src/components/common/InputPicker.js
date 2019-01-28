import React from 'react';
import {
 View, Text, Platform, Dimensions 
} from 'react-native';
import { Picker, Icon } from 'native-base';
import { strings } from '../../../locales/i18n';

const InputPicker = ({
  label, selectedValue, onValueChange, options, pickerWidth,
}) => {
  const {
    containerStyle,
    labelStyle,
    labelTextStyle,
    inputStyle,
    pickerStyle,
    arrowIosStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={inputStyle}>
        {Platform.OS === 'android' && <View style={{ paddingLeft: 10 }} />}
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          // itemStyle={{ width: 50 }}
          itemTextStyle={{ color: '#525050' }}
          iosHeader={strings('picker.iosHeader')}
          headerBackButtonText={strings('picker.headerBackButtonText')}
          // headerStyle={{ color: '#525050' }}
          textStyle={{
            color: '#525050',
            fontSize: Platform.OS === 'ios' ? 13 : 15,
          }}
          // mode='dropdown'
          options={options}
          style={Platform.OS === 'android' ? pickerStyle : { flex: 1, width: pickerWidth || Dimensions.get('window').width / 2.8 }}
          // headerStyle={{ backgroundColor: '#b95dd3' }}
          iosIcon={<Icon name="md-arrow-dropdown" style={arrowIosStyle} />}
        >
          {options.map((item, index) => (
            <Picker.Item label={item} value={index} key={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    minHeight: 52,
    flexDirection: 'row',
  },
  labelStyle: {
    flex: 1.9,
    borderRightWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
  labelTextStyle: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  inputStyle: {
    flex: 1.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pickerStyle: {
    flex: 1,
  },
  arrowIosStyle: {
    color: '#5c251c',
    alignSelf: 'flex-start',
    fontSize: 15,
    marginLeft: -8,
  },
};

export { InputPicker };

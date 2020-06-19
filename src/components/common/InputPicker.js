import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { LocalizationContext } from '../../Context';

const InputPicker = ({
  label,
  selectedValue,
  onValueChange,
  options,
  pickerWidth,
}) => {
  const {
    containerStyle,
    labelStyle,
    labelTextStyle,
    inputStyle,
    pickerStyle,
    arrowIosStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);

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
          itemStyle={{ color: '#525050' }}
          itemTextStyle={{ color: '#525050' }}
          iosHeader={t('picker.iosHeader')}
          headerBackButtonText={t('picker.headerBackButtonText')}
          // headerStyle={{ color: '#525050' }}
          textStyle={{
            color: '#525050',
            fontSize: Platform.OS === 'ios' ? 13 : 15,
            fontFamily: 'Ubuntu',
            fontWeight: 'normal',
          }}
          // mode='dropdown'
          mode="dialog"
          options={options}
          style={
            Platform.OS === 'android'
              ? pickerStyle
              : {
                  flex: 1,
                  width: pickerWidth || Dimensions.get('window').width / 2.8,
                }
          }
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
    fontFamily: 'Ubuntu',
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

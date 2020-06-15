import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { Picker } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { LocalizationContext } from '../../Context';

const InputTextPicker = ({
  label,
  selectedValue,
  onValueChange,
  options,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  onSelectionChange,
  onSubmitEditing,
  onFocus,
  onBlur,
  labelTextStyle,
  appInputStyle,
}) => {
  const {
    containerStyle,
    labelStyle,
    componentLabelTextStyle,
    inputStyle,
    inputTextStyle,
    pickerStyle,
    arrowIosStyle,
  } = styles;
  const { t } = React.useContext(LocalizationContext);

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={[componentLabelTextStyle, labelTextStyle]}>{label}</Text>
        {Platform.OS === 'android' && <View style={{ paddingLeft: 1.5 }} />}
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          // itemStyle={{ color: '#525050' }}
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
          options={options}
          style={pickerStyle}
          // headerStyle={{ backgroundColor: '#b95dd3' }}
          iosIcon={<Icon name="md-arrow-dropdown" style={arrowIosStyle} />}
        >
          {options.map((item, index) => (
            <Picker.Item label={item} value={index} key={item} />
          ))}
        </Picker>
      </View>
      <View style={inputStyle}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          // autoCorrect={false}
          style={[inputTextStyle, appInputStyle]}
          value={value}
          onChangeText={onChangeText}
          onSelectionChange={onSelectionChange}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
        />
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
    // justifyContent: 'center',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  componentLabelTextStyle: {
    fontFamily: 'Ubuntu',
    paddingLeft: 10,
    paddingRight: 5,
    alignSelf: 'center',
    // flex: 1,
  },
  inputStyle: {
    flex: 1.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  inputTextStyle: {
    paddingLeft: 10,
    paddingRight: 5,
    flex: 1,
    fontFamily: 'Ubuntu',
    fontWeight: 'normal',
  },
  pickerStyle: {
    flex: 0.9,
  },
  arrowIosStyle: {
    color: '#5c251c',
    alignSelf: 'flex-start',
    fontSize: 15,
    marginLeft: -8,
  },
};

export { InputTextPicker };

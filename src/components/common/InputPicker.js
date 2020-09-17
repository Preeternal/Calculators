import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { LocalizationContext } from '../../Context';
import { PickerButton } from './PickerButton';

const InputPicker = ({
  label,
  selectedValue,
  onValueChange,
  options,
  pickerWidth,
  customLabelStyle,
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
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options],
        destructiveButtonIndex: selectedValue,
        tintColor: '#525050',
        // cancelButtonIndex: 0
      },
      buttonIndex => {
        onValueChange(buttonIndex);
      },
    );

  return (
    <View style={containerStyle}>
      <View style={[labelStyle, customLabelStyle]}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={inputStyle}>
        {Platform.OS === 'android' && <View style={{ paddingLeft: 10 }} />}
        {Platform.OS === 'android' ? (
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
            style={pickerStyle}
            // headerStyle={{ backgroundColor: '#b95dd3' }}
            iosIcon={<Icon name="md-arrow-dropdown" style={arrowIosStyle} />}
          >
            {options.map((item, index) => (
              <Picker.Item label={item} value={index} key={item} />
            ))}
          </Picker>
        ) : (
          <View style={pickerStyle}>
            {/* <Button onPress={onPress} title={options[selectedValue]} /> */}
            <PickerButton
              onPress={onPress}
              title={options[selectedValue]}
              titleColor="#525050"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // borderRightWidth: 1,
    // borderColor: '#ddd',
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
    justifyContent: 'flex-end',
  },
  pickerStyle: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arrowIosStyle: {
    color: '#5c251c',
    alignSelf: 'flex-start',
    fontSize: 15,
    marginLeft: -8,
  },
});

export { InputPicker };

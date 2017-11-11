import React from 'react';
import { View, Text, Picker } from 'react-native';

const InputPicker = ({ label, selectedValue, onValueChange, options }) => {
  const { inputStyle, pickerStyle, labelStyle, containerStyle } = styles;

  return (
  <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View style={inputStyle}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          //mode='dropdown'
          options={options}
          style={pickerStyle}
        >
          {options.map((item, index) => {
            return (< Picker.Item label={item} value={index} key={index} />);
          })}
        </Picker>
    </View>
  </View>
  );
};


// var options ={
//         "1": "Home",
//         "2": "Food",
//         "3": "Car",
//         "4": "Bank",
// };
//     <Picker
//            style={{your_style}}
//            mode="dropdown"
//            selectedValue={this.state.selected}
//            onValueChange={()=>{}}>
//            {Object.keys(options).map((key) => {
//              return (<Item label={this.props.options[key]} value={key} key={key}/>)
//              //if you have a bunch of keys value pair
//                             })}
//     </Picker>


const styles = {
  inputStyle: {
    //color: '#525050',
    paddingRight: 5,
    paddingLeft: 7.15,
    flex: 1,
    //marginLeft: 0,
    //paddingTop: 2,
    //fontSize: 15,
    //lineHeight: 15,
    height: 52,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7
  },
  pickerStyle: {
    color: '#525050',
    //paddingRight: 5,
    //paddingLeft: 20,
    //paddingTop: 2,
    //fontSize: 15,
    //lineHeight: 23,
    //flex: 1,
    //height: 37,
    //borderColor: 'gray',
    //borderWidth: 1
  },
  labelStyle: {
    fontSize: 15,
    color: '#ffffff',
    backgroundColor: '#656262',
    paddingLeft: 10,
    flex: 2,
    lineHeight: 15,
    height: 52,
    borderColor: 'gray',
    borderRightWidth: 0.5,
    borderLeftWidth: 1,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    textAlignVertical: 'center'
  },
  containerStyle: {
    height: 52,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { InputPicker };

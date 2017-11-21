import React from 'react';
import { View, Text, Picker } from 'react-native';

const InputPicker = ({ label, selectedValue, onValueChange, options }) => {
  const { containerStyle, labelStyle, labelTextStyle, inputStyle, pickerStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>
        <Text style={labelTextStyle}>{label}</Text>
      </View>
      <View style={inputStyle}>
        <Text style={{ paddingLeft: 10 }} />
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
  containerStyle: {
    height: 52,
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center'
  },
  labelStyle: {
    //backgroundColor: '#757171',
    flex: 2,
    height: 52,
    borderColor: 'gray',
    borderRightWidth: 0.5,
    borderLeftWidth: 1,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    justifyContent: 'center'
  },
  labelTextStyle: {
    fontSize: 15,
    //color: '#eeeeee',
    paddingLeft: 10,
    paddingRight: 5,
    //textAlignVertical: 'center',
    //lineHeight: 15,
  },
  inputStyle: {
    flex: 1,
    //textDecorationLine: 'underline',
    height: 52,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    justifyContent: 'center',
    flexDirection: 'row'
    //alignItems: 'center'
  },
  pickerStyle: {
    color: '#525050',
    flex: 1
  }
};

export { InputPicker };

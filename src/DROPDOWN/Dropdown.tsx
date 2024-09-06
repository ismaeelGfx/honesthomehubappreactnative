import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({ data, placeholder, onSelect }:any) => {
  const [value, setValue] = useState(null);

  const handleValueChange = (item:any) => {
    setValue(item.value);
    onSelect(item.value); // Invoke the onSelect callback with the selected value
  };

  return (

    

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={handleValueChange} // Use handleValueChange to set the value and invoke onSelect
        renderLeftIcon={() => (
          <View  >
            <Text  >{/* Optional left icon or text */}</Text>
          </View>
        )}
      />
    
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    // backgroundColor:'yellow'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'white',
    // backgroundColor:"red"
  },
  selectedTextStyle: {
    fontSize: 16,
    // backgroundColor:"red"
    color:"white"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

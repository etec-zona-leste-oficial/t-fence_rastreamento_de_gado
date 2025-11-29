import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./Style"
import { Picker } from "@react-native-picker/picker";
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function InputSelect({Propwidth = "40%", title = "Selecione", options = [], SetSelect, select}) {

  return (
    <View style={[style.pickerWrapper, {width: Propwidth}]}>
      <Picker
        selectedValue={select}
        onValueChange={(value) => SetSelect(value)}
        style={style.picker}
        dropdownIconColor="#008000"
        dropdownIconRippleColor={themes.colors.greenGray} 
      >
         {options.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style"
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function SearchBar({ value, searchFunction, onChangeText, placeholder = 'Pesquisar', Propwidth = "100%", Propheight}) {

  return (
    <View style={[style.inputBox, {width: Propwidth}, {height: Propheight}]}>
        <MaterialIcons
            name= 'search'
            size={24}
            color={themes.colors.green}
          />
          
          <TextInput   
            style={style.input}
            value={value}
            onChangeText={(value) => {
              onChangeText(value);
              searchFunction(value); 
            }}
            placeholder={placeholder}
            placeholderTextColor={themes.colors.lightGreen}
          />
       
    </View>
  );
}

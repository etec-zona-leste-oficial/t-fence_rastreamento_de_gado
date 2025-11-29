import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style"
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function input({ value, onChangeText, placeholder, keyboardType = "default", inputPassword = false, Propwidth = "100%", multiline= false, Propheight, editable = false}) {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <View style={[style.inputBox, {width: Propwidth}, {height: Propheight}, { alignItems: multiline ? "top" : "center" }]}>
        <TextInput
            textAlignVertical={multiline ? "top" : "center"}
            keyboardType={keyboardType}
            style={style.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={themes.colors.lightGreen}
            secureTextEntry={inputPassword ? passwordHidden : false}
            multiline={multiline}
            editable={editable ? false : true}
          />
          {inputPassword ?(
          <MaterialIcons
            name={passwordHidden ? "visibility-off" : "visibility"}
            size={20}
            color={themes.colors.green}
            onPress={() => setPasswordHidden(passwordHidden === true ? false : true)}
          />) : null
          }
    </View>
  );
}

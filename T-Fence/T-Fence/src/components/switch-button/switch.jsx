import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Switch } from "react-native";
import style from "./style";
import {themes} from "../../global/themes";

export default function SwitchButton({ value, onValueChange }) { // <-- Adicionar props

    return (
        <View style={style.container}>
            <Switch
                trackColor={{ false: themes.colors.lightGray, true: themes.colors.greenGray }}
                thumbColor={value ? themes.colors.white : themes.colors.white} 
                onValueChange={onValueChange} // <-- Usar a função do pai
                value={value}                 // <-- Usar o valor do pai
            />
        </View>
  );
}


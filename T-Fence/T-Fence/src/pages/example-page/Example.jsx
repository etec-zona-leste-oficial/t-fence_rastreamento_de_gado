import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style";
import IconPadlock from '../../assets/icons/IconPadlock.png'
// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function ProfilePage() {

  return (
    <View style={style.container}>

      <Text>Perfil</Text>
       
    </View>
  );
}

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style"
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

//icons

import IconAnimals from '../../assets/icons/IconAnimal.png'
import IconBettery from '../../assets/icons/IconBattery.png'
import IconStatus from '../../assets/icons/IconStatus.png'
import IconTag from '../../assets/icons/IconTag.png'
import IconFence from '../../assets/icons/fenceIconColored.png'

export default function CardFence({name= "Undefined", status = "Undefined", propertyid = "Undfined", onPress}) {

  return (
    <TouchableOpacity
    activeOpacity={0.4}
    onPress={() => onPress()}
    >
    <View style={style.CardFence}>

      <View style={style.bodyCard}>
      <Image
          source={IconFence}
          resizeMode="contain"
          style={{width: 60, height: 60}}
          />
      <View style={style.colunm1}>
        <View style={style.collarColunm}>
          <Text style={{fontSize: 15}}>Nome:</Text>
          

        </View>
        <View style={style.batteryColunm}>
          <Text style={{fontSize: 15}}>Status:</Text>
        </View>

        <View style={style.statusColunm}>
          <Text style={{fontSize: 15}}>Qtd de animais:</Text>
        </View>
        
      </View>

      <View style={style.colunm2}>

        <View style={style.collarColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>{name}</Text>
        </View>
        <View style={style.batteryColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>{status ? "Ativo" : "Desativado"}</Text>
        </View>
        <View style={style.statusColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>34</Text>
        </View>
        

      </View>
        
    </View>
    </View>
    </TouchableOpacity>
  );
}

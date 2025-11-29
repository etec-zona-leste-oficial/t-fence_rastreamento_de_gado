import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style"
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

//icons


import UpdateIcon from '../../assets/icons/updateIcon.png'
import CollarIcon from '../../assets/icons/collarIcon.png'
import CowIcon from '../../assets/icons/cowIcon.png'

import IconAnimal from '../../assets/icons/IconStatus.png'
import IconBettery from '../../assets/icons/IconBattery.png'
import IconStatus from '../../assets/icons/IconStatus.png'
import IconTag from '../../assets/icons/IconTag.png'
import IconCollar from '../../assets/icons/IconCollar.png'
import FenceIcon from '../../assets/icons/fenceIcon.png'

export default function CardAnimal({name= "Undefined", identifier = "Undefined", collar = "Nenhum", fence = "Nenhum", onPress}) {

  return (
    <TouchableOpacity
    activeOpacity={0.4}
    onPress={() => onPress()}
    
    >
    <View style={style.CardCollar}>
      <Image
          source={CowIcon}
          resizeMode="contain"
          style={{width: 60, height: 60}}
          />
      <View style={style.colunm1}>
        <View style={style.collarColunm}>
          <Image
          source={IconAnimal}
          resizeMode="contain"
          style={{width: 22, height: 22}}
          />
          <Text style={{fontSize: 15}}>Nome:</Text>
        </View>

        <View style={style.animalColunm}>
          <Image
          source={IconTag}
          resizeMode="contain"
          style={{width: 18, height: 20}}
          />
          <Text style={{fontSize: 15}}>Identificador:</Text>
        </View>
        
        <View style={style.batteryColunm}>
          <Image
          source={CollarIcon}
          resizeMode="contain"
          style={{width: 18, height: 20}}
          />
          <Text style={{fontSize: 15}}>Coleira:</Text>
        </View>

        <View style={style.statusColunm}>
          <Image
          source={FenceIcon}
          resizeMode="contain"
          style={{width: 18, height: 20}}
          />
          <Text style={{fontSize: 15}}>Cerca:</Text>
        </View>
      
      </View>

      <View style={style.colunm2}>

        <View style={style.collarColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>{name}</Text>
        </View>
        <View style={style.animalColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>{identifier}</Text>
        </View>
        <View style={style.batteryColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>{collar}</Text>
        </View>
        <View style={style.statusColunm}>
          <Text style={[{color:themes.colors.darkGray, fontSize: 15}]}>{fence}</Text>
        </View>
        

      </View>
        
          
    </View>
    </TouchableOpacity>
  );
}

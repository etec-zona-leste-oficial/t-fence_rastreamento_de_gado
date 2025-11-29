import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import { useState } from "react";
import style from './Style'
import BluetoothIcon from '../../assets/icons/BluetoothIcon.png'
import GpsIcon from '../../assets/icons/GpsIcon.png'
import Button from '../button/button'

export default function permission({type = "Bluetooth", onPress}) {

  const [createScreen, SetCreateScreen] = useState(true);

  return (
    <>
    <View style={[style.FullyScreen, {display: createScreen ? "flex" : "none"}]}>

    <View style={style.CreateScreen}>
      <View style={style.header}>
        <Text style={style.titleScreen}>
          {type == "Bluetooth" ? "Bluetooth" : "Sua localização"}
        </Text>
        
      </View>
      <View style={style.horizontalLine}></View>

      <View style={style.body}>
      
      <Image
      source={type == "Bluetooth" ? BluetoothIcon : GpsIcon}
      style={{width: 80, height: 80, marginBottom: 10}}
      resizeMode="contain"
      ></Image>

      

      <Text style={style.subtitleScreen}>
        {type == "Bluetooth" ? "Para poder sincronizar a central com seu dispositivo, ative o Bluetooth do seu celular" : "Para poder utilizar as funcionalidades do App, atualize suas configurações de localização para “sempre” ou “durante o uso”."}
      </Text>
      <View style={style.buttons}>
        <Button
          onPress={type == "Bluetooth" ? () => onPress() : () => Linking.openSettings()}
          texto={type !== "Bluetooth" ? "Ir para configurações" : "Fechar"}
          typeButton={"full"}
        />
      {type !== "Bluetooth" ?
       <TouchableOpacity
        onPress={() => onPress()}
        > 
          <Text style={style.textButton}>Mais tarde</Text>
        </TouchableOpacity>
        : null}
      </View>
      </View>

    </View>

    </View>
    </>
  )
}


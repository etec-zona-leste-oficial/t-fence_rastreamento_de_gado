import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useState } from "react";
import style from './Style'
import {MaterialIcons} from '@expo/vector-icons'
import IconSuccess from '../../assets/icons/confirmationIcon.png'
import IconError from '../../assets/icons/IconAlert.png'
import Input from "../input/input";
import InputSelect from "../input-select/input-select";
import Button from '../button/button'

export default function alert({type = "Success", title = "Success", message = "Operation completed successfully", onPress = () => null, OnPressDenied = null, OnPressAccepted = null}) {

  const [AlertScreen, SetAlertScreen] = useState(true);

  return (
    <>
    <View style={[style.FullyScreen, {display: AlertScreen ? "flex" : "none"}]}>

    <View style={style.AlertScreen}>
      <View style={style.body}>
        <Image
        source={type == "Success" ? IconSuccess : IconError}
        style={{width: 80, height: 80, marginBottom: 10}}
        resizeMode="contain"
        ></Image>

        <Text style={style.titleScreen}>
          {title}
        </Text>

        <Text style={style.subtitleScreen}>
          {message}
        </Text>
      </View>
      <View style={style.buttons}>
      {type !== "Confirmation" &&
      <Button
        onPress={() => {onPress(), SetAlertScreen(false)}}
        texto={"Fechar"}
        typeButton={"full"}
      />
      }

      {type === "Confirmation" &&
        <Button
          onPress={() => {OnPressAccepted(), SetAlertScreen(false)}}
          texto={"Sim"}
          typeButton={"Shadow"}
      />
      }
      
      {type === "Confirmation" &&
        <Button
          onPress={() => {OnPressDenied(), SetAlertScreen(false)}}
          texto={"Não"}
          typeButton={"full"}
      />
      }


      </View>

    </View>
    </View>
    </>
  )
}


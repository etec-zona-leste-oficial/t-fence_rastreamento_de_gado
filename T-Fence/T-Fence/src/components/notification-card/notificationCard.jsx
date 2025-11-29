import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style"
import { themes } from '../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

//icons

import iconAlertbattery from '../../assets/icons/IconAlertBattery.png'
import iconAlert from '../../assets/icons/IconAlert.png'
import iconAlertCheck from '../../assets/icons/IconAlertCheck.png'

export default function notificationCard({ nameAnimal = "Undefined", nameCollar = "Undefined", resolved = false, type = "Undefined", date = "Undfined", onPress = () => { console.log("Card clicado") } }) {
  const hourAlert = new Date(date);
  const hours = hourAlert.getHours().toString().padStart(2, '0');
  const minutes = hourAlert.getMinutes().toString().padStart(2, '0');
  const formatedHour = `${hours}:${minutes}`;
  
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => onPress()}
    >
      <View style={style.notificationCard}>
        <Image
          source={
            type == "OUT_OF_BOUNDS" ? (
              iconAlert
            ) : type == "RETURNED" ? (
              iconAlertCheck
            ) : type == "LOW_BATTERY" ? (
              iconAlertbattery
            ) : null
          }
          resizeMode="contain"
          style={[style.icon, { width: 45, height: 45 }]}
        ></Image>

        <View style={style.info}>
          {type == "OUT_OF_BOUNDS" ? (
            <Text style={style.title}>Fuga Detectada {resolved ?  <Text style={style.status}>(Resolvido)</Text> : <Text style={style.status}>(Não Resolvido)</Text>}</Text>
          ) : type == "RETURNED" ? (
            <Text style={style.title}>Animal Retornou ao perímetro </Text>
          ) : type == "LOW_BATTERY" ? (
            <Text style={style.title}>Bateria Fraca</Text>
          ) : null
          }
          <View style={style.block2}>
            {type == "OUT_OF_BOUNDS" ? (
              <Text style={style.description}>Animal ‘{nameAnimal}’ saiu do perímetro</Text>
            ) : type == "RETURNED" ? (
              <Text style={style.description}>Animal ‘{nameAnimal}’ retornou ao perímetro</Text>
            ) : type == "LOW_BATTERY" ? (
              <Text style={style.description}>Coleira ‘{nameCollar}’ está com a bateria fraca</Text>
            ) : null
            }
            <Text style={style.hour}>{formatedHour}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
}

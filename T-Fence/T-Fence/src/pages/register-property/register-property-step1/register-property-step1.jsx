import { registerUser } from "../../../services/userService";

import { useState, useEffect, useCallback   } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, BackHandler} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import style from "./Style";
import {themes} from '../../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'
import Input from "../../..//components/input/input";
import ImageTop from '../../../assets/icons/happyguy.png'
import Button from '../../../components/button/button'

export default function RegisterPropertyStep1({navigation, route}) {

  useFocusEffect(
    useCallback(() => {
      // Esta função será executada quando a tela entrar em foco
      const onBackPress = () => {
        // Retornar 'true' desabilita o botão de voltar NESTA TELA
        return true;
      };

      // Adiciona o event listener
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Esta função será executada quando a tela perder o foco
      return () => subscription.remove();
    }, [])
  );

  return (
    <View style={style.container}>
      {/* <View> */}
      <View style={style.boxTop}>
        <Image style={style.imageTop} source={ImageTop}></Image>

        <View style={style.textBox}>
        <Text style={style.title}>Como você pretende usar o T-Fence?</Text>
        <Text style={style.text}>
          Escolha como você vai usar o T-Fence: como dono da propriedade ou colaborador de uma fazenda.
        </Text>
        </View>
      </View>

      <View style={style.boxCenter}>
        <Button
        onPress={() => navigation.navigate('RegisterPropertyStep2')}
         texto="Sou dono de uma propriedade">
        </Button>
        <Button
         onPress={() => navigation.navigate('RequestCollaborators')}
         texto="Sou um colaborador"
         typeButton="Shadow"
         >
          
        </Button>
        

      </View>
      
    </View>
  );
}

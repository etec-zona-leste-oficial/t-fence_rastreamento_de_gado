import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./Style";
import imageTop from '../../../assets/icons/confirmationIcon.png'
import {themes} from '../../../global/themes'
import Button from "../../../components/button/button";
import {MaterialIcons} from '@expo/vector-icons'

export default function Step4({navigation}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (

       <View style={style.container}>
        {/* <View> */}
        <View style={style.boxTop}>
          <Image style={style.imageTop} source={imageTop}></Image>
          <Text style={style.title}>Concluido!</Text>
          <Text style={style.text}>
            Seu e-mail foi confirmado com sucesso. Agora você já pode prosseguir
            com o cadastro!
          </Text>
        </View>

        <View style={style.boxCenter}>
          
        </View>

        <View style={style.boxBottom}>
          <Button
          // onPress={() => navigation.navigate('')}
           texto={"Continuar"}></Button>
        </View>
        {/* </View> */}
      </View>

  );
}

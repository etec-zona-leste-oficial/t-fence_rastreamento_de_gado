import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./Style";
import Concluido from "../../../assets/icons/Concluido.png";
import Button from "../../../components/button/button";
import { themes } from "../../../global/themes";

export default function Step2() {
  return (
    <View style={style.container}>
      {/* <View> */}
      <View style={style.boxTop}>
        <Image style={style.imgConcluido} source={Concluido}></Image>
      </View>

      <View style={style.boxCenter}>
        <Text style={style.title}>Concluido!</Text>
        <Text style={style.text}>
          Seu e-mail foi confirmado com sucesso. Agora você já pode prosseguir
          com o cadastro!
        </Text>
      </View>

      <View style={style.boxBottom}>
        <Button texto={"Continuar"}></Button>
      </View>
      {/* </View> */}
    </View>
  );
}

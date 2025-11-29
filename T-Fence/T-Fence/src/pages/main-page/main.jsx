import { loginUser } from "../../services/userService";
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext  } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import style from "./style";
import ImageMain from '../../assets/images/mainImage.png'
import TfenceLogo from '../../assets/icons/T-FenceLogoHD.png'
import Button from '../../components/button/button'
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function Main({ navigation }) {

  return (
    <View style={style.container}>

      <View style={style.boxTop}>
        <Image
        style={style.imageMain}
        source={ImageMain}
        >
        </Image>

      </View>  

      <View style={style.boxCenter}>
        <View style={style.blockInfo}>
          <Image
            source={TfenceLogo}
            style={style.logoTfence}>
          </Image>
          <Text style={style.description}>
          Comece agora mesmo a utilizar as {"\n"}funcionalidades da T-Fence e deixe seu rabanho mais seguro.
          </Text>
        </View>

        <Button
        style={style.button}
        onPress={() => navigation.navigate('Login')}
        texto={"Vamos lá"}
        >

        </Button>

      </View> 
      
    </View>
  );
}

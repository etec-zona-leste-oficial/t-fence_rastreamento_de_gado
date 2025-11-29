import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style";
import ProfilePic from "../../assets/icons/photoProfile.png";
import Delete from "../../assets/icons/delete.png"
import Edit from "../../assets/icons/edit.png"
// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import {MaterialIcons} from '@expo/vector-icons'

export default function ColaboratorCard({name = "Undefined", onPress = ()=> console.log("Função Undefined")}) {

  return (
    <View style={style.card}>
        <View style={style.image}>
            <Image
             source={ProfilePic}
             style={style.profilePic}
             resizeMode='contain'/>
             
        </View>

        <View style={style.text}>
            <Text style={style.title}>{name}</Text>
            <Text style={style.subtitle}>Colaborador</Text>
        </View>

        <View style={style.options}>

            {/* <TouchableOpacity>
                <Image
                source={Edit}
                style={style.icon}
                resizeMode="contain"></Image>
            </TouchableOpacity> */}

            <TouchableOpacity
                onPress={()=> onPress()}
            >
                <Image
                source={Delete}
                style={style.icon}
                resizeMode="contain"></Image>
            </TouchableOpacity>
            
        </View>
    </View>

  );
}

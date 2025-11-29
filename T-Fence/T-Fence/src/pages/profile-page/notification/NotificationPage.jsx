import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./Style";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import Switch from "../../../components/switch-button/switch";
import batteryIcon from "../../../assets/icons/batteryIcon.png";
import rainIcon from "../../../assets/icons/rainIcon.png";
import windIcon from "../../../assets/icons/wind.png";
import notificationIcon from "../../../assets/icons/notificationIcon.png";
import arrowIcon from "../../../assets/icons/arrowGray.png";
import { MaterialIcons } from "@expo/vector-icons";
import {themes} from '../../../global/themes';

export default function NotificationPage({navigation}) {

  const [bateriaAtivo, setBateriaAtivo] = useState(false);
  const [chuvaAtivo, setChuvaAtivo] = useState(false);
  const [fugaAtivo, setFugaAtivo] = useState(false);

  return (

   
    <View style={style.container}>


        <TopNavigation
            text={"Notificações"}
            onPress={() =>  navigation.goBack('Profile')}   
        />


        <View style={style.optionsNotification}>

          <View style={style.optionsCard}>
            <View style={style.boxImage}>
              <Image
                style={style.icon}
                source={batteryIcon}
                resizeMode={'contain'}>
              </Image>
            </View>

            <View style={style.boxText}>
              <Text style={style.title}>Alerta de Bateria</Text>
              <Text style={style.subtitle}>Receberá um alerta quando a bateria estiver baixa</Text>
            </View>

            <View style={style.boxSwitch}>
              <Switch value={bateriaAtivo} onValueChange={() => setBateriaAtivo(prev => !prev)}/>
            </View>
          </View>

          <View style={style.optionsCard}>
            <View style={style.boxImage}>
              <Image
                style={style.icon}
                source={rainIcon}
                resizeMode={'contain'}>
              </Image>
            </View>

            <View style={style.boxText}>
              <Text style={style.title}>Alerta de chuva</Text>
              <Text style={style.subtitle}>Reberá um alerta quando começar a chover</Text>
            </View>

            <View style={style.boxSwitch}>
              <Switch value={chuvaAtivo} onValueChange={() => setChuvaAtivo(prev => !prev)}/>
            </View>
          </View>

          <View style={style.optionsCard}>
            <View style={style.boxImage}>
              <Image
                style={style.icon}
                source={windIcon}
                resizeMode={'contain'}>
              </Image>
            </View>

            <View style={style.boxText}>
              <Text style={style.title}>Alerta de fuga</Text>
              <Text style={style.subtitle}>Reberá um alerta caso o animal saia da área definida</Text>
            </View>

            <View style={style.boxSwitch}>
              <Switch value={fugaAtivo} onValueChange={() => setFugaAtivo(prev => !prev)}/>
            </View>
          </View>

          <TouchableOpacity style={style.optionsCard} onPress={''}>
            <View style={style.boxImage}>
              <Image
                style={style.notificationIcon}
                source={notificationIcon}
                resizeMode={'contain'}>
              </Image>
            </View>

            <View style={style.boxText}>
              <Text style={style.title}>Definir som de notificação</Text>
            </View>

            <View style={style.boxSwitch}>
             {/* <Image
                style={style.arrowIcon}
                source={arrowIcon}
                resizeMode={'contain'}>
              </Image> */}

              <MaterialIcons name="chevron-right" size={25} color={themes.colors.darkGray}/>

            </View>
          </TouchableOpacity>
  
      </View>

    </View>
  );
}

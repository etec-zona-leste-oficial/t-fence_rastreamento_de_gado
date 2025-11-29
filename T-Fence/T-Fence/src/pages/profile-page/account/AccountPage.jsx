import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';
import { MaterialIcons } from "@expo/vector-icons";
import style from "./Style";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import nameIcon from "../../../assets/icons/nameIcon.png";
import messageIcon from "../../../assets/icons/messageIcon.png";
import padlockIcon from "../../../assets/icons/padlockIcon.png";
import phoneIcon from "../../../assets/icons/phoneIcon.png";
import { themes } from "../../../global/themes";

export default function AccountPage({ navigation }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <View style={style.container}>
      <TopNavigation
        text={"Conta"}
        onPress={() => navigation.goBack("Profile")}
      />

      <View style={style.optionAccount}>
        <TouchableOpacity
          style={style.option}
          onPress={() => navigation.navigate("EditName")}
        >
          <View style={style.imageView}>
            <Image
              source={nameIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Nome</Text>
            <Text style={style.subtitle}>{userInfo.firstName +" "+ userInfo.surname}</Text>
          </View>
          <View style={style.iconView}>
            <MaterialIcons
              name="chevron-right"
              size={25}
              color={themes.colors.darkGray}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.option}
          onPress={() => navigation.navigate("EditEmail")}
        >
          <View style={style.imageView}>
            <Image
              source={messageIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Email</Text>
            <Text style={style.subtitle}>{userInfo.email}</Text>
          </View>
          <View style={style.iconView}>
            <MaterialIcons
              name="chevron-right"
              size={25}
              color={themes.colors.darkGray}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.option} onPress={() => navigation.navigate("EditLock")}>
          <View style={style.imageView}>
            <Image
              source={padlockIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Senha</Text>
            <Text style={style.subtitle}>*********</Text>
          </View>
          <View style={style.iconView}>
            <MaterialIcons
              name="chevron-right"
              size={25}
              color={themes.colors.darkGray}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.option}
          onPress={() => navigation.navigate("EditPhone")}
        >
          <View style={style.imageView}>
            <Image
              source={phoneIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Número de Telefone</Text>
            <Text style={style.subtitle}>{userInfo.phoneNumber}</Text>
          </View>
          <View style={style.iconView}>
            <MaterialIcons
              name="chevron-right"
              size={25}
              color={themes.colors.darkGray}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

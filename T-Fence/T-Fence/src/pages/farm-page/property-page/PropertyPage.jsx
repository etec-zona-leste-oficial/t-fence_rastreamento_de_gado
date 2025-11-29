import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import style from "./Style";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import { AuthContext } from "../../../context/AuthContext";
import nameIcon from "../../../assets/icons/nameImage.png";
import locationIcon from "../../../assets/icons/locationIcon.png";
import areaIcon from "../../../assets/icons/areaIcon.png";
import informationIcon from "../../../assets/icons/informationIcon.png";
import { themes } from "../../../global/themes";

export default function PropertyPage({ navigation }) {

  const {propertyInfo} = useContext(AuthContext);
  const [propertyName, setPropertyName] = useState(""); 
  const [Area, setArea] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(()=>{
    setPropertyName(propertyInfo.name_Property);
    setArea(propertyInfo.area);
    setDescription(propertyInfo.Description);
  },[propertyInfo])

const truncate = (text, maxLength = 25) => {
  if (!text) return "";
  return text.length > maxLength 
    ? text.substring(0, maxLength) + "..." 
    : text;
};

  return (
    <View style={style.container}>
      <TopNavigation
        text={"Propriedade"}
        onPress={() => navigation.goBack("")}
      />

      <View style={style.optionProperty}>
        <TouchableOpacity
          style={style.option}
          onPress={() => navigation.navigate("EditNameFarm")}
        >
          <View style={style.imageView}>
            <Image
              source={nameIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Nome da propriedade</Text>
            <Text style={style.subtitle}>{truncate(propertyInfo.name_Property)}</Text>
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
          onPress={() => navigation.navigate("EditArea")}
        >
          <View style={style.imageView}>
            <Image
              source={areaIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Área da propriedade</Text>
            <Text style={style.subtitle}>{truncate(propertyInfo.area)}</Text>
          </View>
          <View style={style.iconView}>
            <MaterialIcons
              name="chevron-right"
              size={25}
              color={themes.colors.darkGray}
            />
          </View>
        </TouchableOpacity>
        
        {/* <TouchableOpacity
          style={style.option}
          onPress={() => navigation.navigate("")}
        >
          <View style={style.imageView}>
            <Image
              source={locationIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Localização</Text>
            <Text style={style.subtitle}>Juazeirense do Norte</Text>
          </View>
          <View style={style.iconView}>
            <MaterialIcons
              name="chevron-right"
              size={25}
              color={themes.colors.darkGray}
            />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={style.option}
          onPress={() => navigation.navigate("EditInfo")}
        >
          <View style={style.imageView}>
            <Image
              source={informationIcon}
              style={style.icons}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={style.textView}>
            <Text style={style.title}>Descrição</Text>
            <Text style={style.subtitle}>{truncate(propertyInfo.description)}</Text>
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



import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import style from "./Style";
import {themes} from '../../../global/themes';
import {MaterialIcons} from '@expo/vector-icons';
import InputSelect from "../../../components/input-select/input-select";
import Input from "../../..//components/input/input";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import ImageTop from '../../../assets/icons/Checklist-bro.png';
import Button from '../../../components/button/button';
import MapIcon from '../../../assets/icons/mapIcon.png';
import FarmingIcon from '../../../assets/icons/farmingIcon.png';
import {Picker} from '@react-native-picker/picker';
import { registerProperty } from "../../../services/PropertyService";
import { AuthContext } from '../../../context/AuthContext';


export default function RegisterPropertyStep5({navigation, route}) {
  const { userInfo } = useContext(AuthContext);
  const { registerPropertyAuth } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  
  const namePropriety  = route.params.namePropriety;
  const city  = route.params.city;
  const address  = route.params.address;
  const uf  = route.params.uf;
  const measure  = route.params.measure;
  const area  = route.params.area + "" + measure;
  const description  = route.params.description;
  const location  = "-23.489631956271126, -46.515698193012675";

    console.log(
    "\n"+
    "Nome da Propriedade: " + namePropriety +"\n"+
    "Cidade:              " + city +"\n"+
    "Endereço:            " + address +"\n"+
    "Estado:              " + uf +"\n"+
    "Medida:              " + measure +"\n"+
    "area:                " + area +"\n"+
    "Descrição:           " + description +"\n"
  )

  const handleRegister = async () => {
    try {
      console.log("todos ps dados a serem enviados "+ userInfo._id + " " + namePropriety + " " + uf + " " + city + " " + address + " " + area + " " + location + " " + description);

    setIsLoading(true)
    await registerPropertyAuth(userInfo._id, namePropriety, uf, city, address, area, location, description)
    }catch(err){
      console.log("Erro ao cadastrar:", err.response?.data || err.message);
      alert(`Erro ao cadastrar: ${err.response?.data?.error || err.message}`);

      if (err.response) {
      console.log("Erro do servidor:", err.response.data);
      Alert.alert("Erro", err.response.data.error || "Erro no servidor.");
      }
    }finally{
      setIsLoading(false)
    }
  }

  return (
      <ScrollView
      style={style.scrollView}
      >
    <View style={style.container}>
      <TopNavigation
      text={"Confirmação"}
      onPress={() =>  navigation.goBack('Login')}   
      />
      <View style={style.boxTop}>
        <Image style={style.imageTop} source={ImageTop}></Image>

        <View style={style.textBox}>
        <Text style={style.text}>
          Verifique se os dados estão corretos antes de concluir o cadastro.
        </Text>
        </View>
      </View>
      
      <View style={style.boxCenter}>

        <View style={style.proprietyCard}>
          <View>
            <Image style={style.farmingIcon} source={FarmingIcon}></Image>
          </View>
          <View style={style.cardInformation}>
            <Text style={style.titleInformation}>Informações da Propriedade</Text> 
            <View style={style.informationColumn}>

              <View style={style.titlesColunm}>
                <Text>Nome:</Text>
                <Text>Código:</Text>
                <Text>Área:</Text>
              
              </View>

              <View style={style.fieldsColunm}>
                <Text style={style.fieldsText}>{namePropriety}</Text>
                <Text style={style.fieldsText}>#2342</Text>
                <Text style={style.fieldsText}>{area +" "+ measure}</Text>
              </View>


            </View>
          </View>
           
        </View>

        <View style={style.proprietyCard}>
          <View>
            <Image style={style.MapIcon} source={MapIcon}></Image>
          </View>
          <View style={style.cardInformation}>
            <Text style={style.titleInformation}>Localização</Text> 
            <View style={style.informationColumn}>

              <View style={style.titlesColunm}>
                <Text>Estado:</Text>
                <Text>Cidade:</Text>
                <Text>Endereço:</Text>
              
              </View>

              <View style={style.fieldsColunm}>
                <Text style={style.fieldsText}>{uf}</Text>
                <Text style={style.fieldsText}>{city}</Text>
                <Text style={style.fieldsText}>{address}</Text>
              </View>


            </View>
          </View>
           
        </View>

        <View style={style.desciptionCard}>
          <Text style={style.titleDescription}>
            Descrição:
          </Text>

          <Text style={style.description}>
            {description}
          </Text>
        </View>
        
        <Button
        onPress={handleRegister}
         texto={isLoading ? (  <ActivityIndicator size="30" color="#fff" />) : ( "Cadastrar Propriedade")}
         typeButton="Full"
         >
        </Button>
        

      </View>
      
    </View>
    </ScrollView>
  );
}
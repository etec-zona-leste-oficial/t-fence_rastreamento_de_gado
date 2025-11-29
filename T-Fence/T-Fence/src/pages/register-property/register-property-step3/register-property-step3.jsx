import { registerUser } from "../../../services/userService";

import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import { themes } from '../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'
import InputSelect from "../../../components/input-select/input-select";
import Input from "../../..//components/input/input";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import ImageTop from '../../../assets/icons/ImgMap.png'
import Button from '../../../components/button/button'
import { Picker } from '@react-native-picker/picker'

export default function RegisterPropertyStep3({ navigation, route }) {
  //Dados de página
  const namePropriety = route.params.namePropriety;

  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [erroMessage, setErroMessage] = useState("Null");
  const [city, SetCity] = useState("");
  const [address, setAddress] = useState("");
  const [uf, SetUf] = useState("Null");
  const options = [
    { label: "Estado", value: "Null" },
    { label: "Acre (AC)", value: "AC" },
    { label: "Alagoas (AL)", value: "AL" },
    { label: "Amapá (AP)", value: "AP" },
    { label: "Amazonas (AM)", value: "AM" },
    { label: "Bahia (BA)", value: "BA" },
    { label: "Ceará (CE)", value: "CE" },
    { label: "Distrito Federal (DF)", value: "DF" },
    { label: "Espírito Santo (ES)", value: "ES" },
    { label: "Goiás (GO)", value: "GO" },
    { label: "Maranhão (MA)", value: "MA" },
    { label: "Mato Grosso (MT)", value: "MT" },
    { label: "Mato Grosso do Sul (MS)", value: "MS" },
    { label: "Minas Gerais (MG)", value: "MG" },
    { label: "Pará (PA)", value: "PA" },
    { label: "Paraíba (PB)", value: "PB" },
    { label: "Paraná (PR)", value: "PR" },
    { label: "Pernambuco (PE)", value: "PE" },
    { label: "Piauí (PI)", value: "PI" },
    { label: "Rio de Janeiro (RJ)", value: "RJ" },
    { label: "Rio Grande do Norte (RN)", value: "RN" },
    { label: "Rio Grande do Sul (RS)", value: "RS" },
    { label: "Rondônia (RO)", value: "RO" },
    { label: "Roraima (RR)", value: "RR" },
    { label: "Santa Catarina (SC)", value: "SC" },
    { label: "São Paulo (SP)", value: "SP" },
    { label: "Sergipe (SE)", value: "SE" },
    { label: "Tocantins (TO)", value: "TO" },
  ];


  const handleContinue = () => {

    if (city.length == 0) {
      console.log("Preencha o campo cidade")
      setErroMessage("FieldCityEmpaty");
      return
    } else {
      setErroMessage("Null");
    }

    if (!/^[\p{L}\s-]+$/u.test(city.trim())) {
      console.log("O nome da cidade só pode conter letras")
      setErroMessage("FieldCity");
      return
    } else {
      setErroMessage("Null");
    }

    if (uf == "Null") {
      console.log("Selecione um estado")
      setErroMessage("FieldUf");
      return
    } else {
      setErroMessage("Null");
    }

    navigation.navigate('RegisterPropertyStep4', {
      namePropriety: namePropriety,
      city: city.trim(),
      address: address.trim(),
      uf: uf,
    })
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardOpen(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);

        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              y: 120,
              animated: true,
            });
          }
        }, 100);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        scrollEnabled={keyboardOpen}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
        contentInsetAdjustmentBehavior="always"
        showsVerticalScrollIndicator={false}
      >

        <View style={style.container}>
          <TopNavigation
            text={"Localização"}
            onPress={() => navigation.goBack('Login')}
          />
          {/* <View> */}
          <View style={style.boxTop}>
            <Image style={style.imageTop} source={ImageTop}></Image>

            <View style={style.textBox}>
              <Text style={style.text}>
                Informe onde sua propriedade está localizada
              </Text>
            </View>
          </View>

          <View style={style.boxCenter}>


            <View style={style.ComboInput} >
              <InputSelect
                options={options}
                select={uf}
                SetSelect={SetUf}
                title={"UF"}
              />
              <Input
                Propwidth={"55%"}
                onChangeText={SetCity}
                placeholder={'Cidade'}
              />
            </View>

            <Input
              onChangeText={setAddress}
              placeholder={'Endereço (Opcional)'}
            >

            </Input>
            <Button
              texto="Usar minha lcoalizazção atual"
              typeButton="Shadow"
            >
            </Button>
            {erroMessage === "FieldCity" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                O campo Cidade só pode conter letras
              </Text>
            ) : erroMessage === "FieldUf" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                Selecione um estado
              </Text>
            ) : erroMessage === "FieldCityEmpaty" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                Preencha o campo Cidade
              </Text>
            ) : null}
            <Button
              onPress={handleContinue}
              texto="Avançar"
              typeButton="Full"
            >
            </Button>

          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

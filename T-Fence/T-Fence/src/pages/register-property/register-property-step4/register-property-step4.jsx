import { registerUser } from "../../../services/userService";

import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import { themes } from '../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'
import InputSelect from "../../../components/input-select/input-select";
import Input from "../../..//components/input/input";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import ImageTop from '../../../assets/icons/HouseFarming.png'
import Button from '../../../components/button/button'
import { Picker } from '@react-native-picker/picker'

export default function RegisterPropertyStep4({ navigation, route }) {
  const namePropriety = route.params.namePropriety;
  const city = route.params.city;
  const address = route.params.address;
  const uf = route.params.uf;

  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [erroMessage, setErroMessage] = useState("null");
  const [measure, setMeasure] = useState("Null");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");

  //Logs
  console.log(
    "\n" +
    "Nome da Propriedade: " + namePropriety + "\n" +
    "Cidade:              " + city + "\n" +
    "Endereço:            " + address + "\n" +
    "Estado:              " + uf + "\n"
  )

  const options = [
    { label: "Medida", value: "Null" },
    { label: "ha", value: "ha" },
    { label: "m²", value: "m²" }
  ];

  const handleContinue = () => {
    if (area.length == 0) {
      console.log("Preencha o campo área aproximada")
      setErroMessage("FieldAreaEmpaty");
      return
    } else {
      setErroMessage("Null");
    }

    if (!/^[0-9]+$/.test(area)) {
      console.log("A área aproximado só pode conter numeros")
      setErroMessage("FieldAreaInvalid");
      return
    } else {
      setErroMessage("Null");
    }

    if (measure == "Null") {
      console.log("Selecione uma medida")
      setErroMessage("FieldMeasureIsNull");
      return
    } else {
      setErroMessage("Null");
    }

    if (description.length < 10) {
      console.log("A descrição esta vazia")
      setErroMessage("FieldDescriptionIsNull");
      return
    } else {
      setErroMessage("Null");
    }

    navigation.navigate('RegisterPropertyStep5', {
      namePropriety: namePropriety,
      city: city,
      address: address,
      uf: uf,
      area: area.trim(),
      description: description.trim(),
      measure: measure

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
              y: 230,      // 👈 Aqui você define quanto quer que role
              animated: true,
            });
          }
        }, 100); // tempo perfeito pra esperar o teclado abrir
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
            text={"Sobre a propriedade"}
            onPress={() => navigation.goBack('Login')}
          />
          {/* <View> */}
          <View style={style.boxTop}>
            <Image style={style.imageTop} source={ImageTop}></Image>

            <View style={style.textBox}>
              <Text style={style.text}>
                Esses dados ajudam o T-Fence a otimizar as funcionalidades da plataforma para sua fazenda.
              </Text>
            </View>
          </View>

          <View style={style.boxCenter}>


            <View style={style.ComboInput} >
              <Input
                keyboardType="number-pad"
                onChangeText={setArea}
                value={area}
                Propwidth={"55%"}
                placeholder={'Área aproximada'}
              />

              <InputSelect
                select={measure}
                SetSelect={setMeasure}
                options={options}
                title={"Medida"}
              />

            </View>

            <Input
              onChangeText={setDescription}
              value={description}
              multiline={true}
              Propheight={150}
              placeholder={'Descrição....'}
            >

            </Input>

            {erroMessage === "FieldAreaEmpaty" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                O campo área aproximada deve ser preenchida.
              </Text>
            ) : erroMessage === "FieldAreaInvalid" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                O campo área aproximada só deve conter numeros.
              </Text>
            ) : erroMessage === "FieldMeasureIsNull" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                Escolha uma medida.
              </Text>
            ) : erroMessage === "FieldDescriptionIsNull" ? (
              <Text style={{ marginLeft: 3, marginTop: 5, color: themes.colors.red, fontFamily: 'Poppins' }}>
                O campo descrição deve ter no minimo 10 caracteres.
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

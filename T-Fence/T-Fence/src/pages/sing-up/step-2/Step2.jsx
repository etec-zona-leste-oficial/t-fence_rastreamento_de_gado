import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import style from "./Style";
import imageTop from '../../../assets/icons/setaIcon.png'
import Button from "../../../components/button/button";
import Input from "../../../components/input/input"
import TopNavigation from "../../../components/top-navigation/topNavigation";
import { themes } from '../../../global/themes'

export default function Step2({ navigation, route }) {
  const email = route.params.email;
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneChange = (text) => {
    // Remove tudo que não é número
    const cleaned = text.replace(/\D/g, "");

    // Aplica a máscara conforme o tamanho
    let formatted = cleaned;
    if (cleaned.length <= 2) {
      formatted = `(${cleaned}`;
    } else if (cleaned.length <= 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 11) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    } else {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }

    setPhoneNumber(formatted);
  };

  const handleContinue = () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, ""); // remove máscara

    if (!firstName.trim() || !surname.trim()) {
      // alert('Por favor, insira um nome valido.');
      setErrorMessage("invalidName")
      return;
    }
    if (!/^[0-9]+$/.test(cleanedPhone) || cleanedPhone.length !== 11) {
      setErrorMessage("invalidPhoneNumber")
      // alert('Por favor, insira um número de telefone valido.');
      return;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(firstName.trim())) {
      setErrorMessage("invalidName")
      // alert('O nome não pode conter números ou caracteres especiais.');
      return;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(surname.trim())) {
      setErrorMessage("invalidSurname")
      // alert('O sobrenome não pode conter números ou caracteres especiais.');
      return;
    }
    setErrorMessage("valid")
    navigation.navigate('Step3', {
      email: email,
      firstName: firstName.trim(),
      surname: surname.trim(),
      phoneNumber: cleanedPhone.trim(), // envia sem máscaras
    });

  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -200} // ajuste se precisar
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={style.container}>
          <TopNavigation
            text={""}
            onPress={() => navigation.goBack('Login')}
          />
          <View style={style.boxTop}>
            <Image
              style={style.imageTop}
              source={imageTop}
            ></Image>
          </View>

          <View style={style.boxCenter}>
            <Text style={style.title}>Quase lá!</Text>
            <Text style={style.text}>Preencha mais algumas informações.</Text>

            <Input
              value={firstName}
              onChangeText={setFirstName}
              placeholder={'Nome'}
            ></Input>

            <Input
              value={surname}
              onChangeText={setSurname}
              placeholder={'Sobrenome'}
            ></Input>

            <Input
              keyboardType={"numeric"}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholder={'Telefone'}
              maxLength={15}
            ></Input>

            {errorMessage === "invalidName" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                O nome não pode conter números ou caracteres especiais.
              </Text>
            ) : errorMessage === "invalidSurname" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                O sobrenome não pode conter números ou caracteres especiais.
              </Text>
            ) : errorMessage === "invalidPhoneNumber" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                Por favor, insira um número de telefone valido.
              </Text>
            ) : null}


            <Button
              onPress={handleContinue}
              texto={"Continuar"}>

            </Button>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}

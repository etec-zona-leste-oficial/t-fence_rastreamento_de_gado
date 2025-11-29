import { verifyEmailExist } from "../../../services/userService";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import style from "./Style";
import imageTop from '../../../assets/icons/ProfileIcon.png';
import TopNavigation from "../../../components/top-navigation/topNavigation";
import Button from "../../../components/button/button";
import Input from "../../..//components/input/input";
import { themes } from '../../../global/themes';
import { MaterialIcons } from '@expo/vector-icons';

export default function Step1({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const handleContinue = async () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !regex.test(email)) {
      // alert('Por favor, insira um email válido.');
      setEmailStatus("invalid");
      return;
    }

    //Verifica se o email já está cadastrado
    try {
      const data = await verifyEmailExist(email);
      // alert("email já cadastrado.");
      setEmailStatus("emailExist");

    } catch (err) {
      setEmailStatus("valid");
      navigation.navigate('Step2', {
        email: email.trim()
      });
    }
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
              source={imageTop}
              resizeMode="contain"
              style={style.imageTop}
            ></Image>
            <View style={style.textBox}>
              <Text style={style.title}>Cadastro</Text>
              <Text style={style.text}>Crie uma conta gratuitamente!</Text>
            </View>
          </View>

          <View style={style.boxCenter}>

            <Input
              value={email}
              onChangeText={setEmail}
              placeholder={'Email'}
            ></Input>
            {emailStatus === "emailExist" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                Email já cadastrado!
              </Text>
            ) : emailStatus === "invalid" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                Digite um email valido!
              </Text>
            ) : null}

            <Button
              onPress={handleContinue}
              texto={"Continuar"}>

            </Button>

          </View>

          <View style={style.boxBottom}>
            {/* Colocar botoes das redes sociais */}

          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

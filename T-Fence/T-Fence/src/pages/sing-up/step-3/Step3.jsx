import { registerUser } from "../../../services/userService";
import { AuthContext } from '../../../context/AuthContext';

import { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import { themes } from '../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'
import Input from "../../..//components/input/input";
import imageTop from '../../../assets/icons/iconSecurity.png'
import Button from '../../../components/button/button'
import TopNavigation from "../../../components/top-navigation/topNavigation";
import AlertCustom from '../../../components/alert/Alert';

export default function Step3({ navigation, route }) {
  const email = route.params.email;
  const firstName = route.params.firstName;
  const surname = route.params.surname;
  const phoneNumber = route.params.phoneNumber;

  const { register, notificationToken } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validatio1, setConfirmValidatio1] = useState("");
  const [validatio2, setConfirmValidatio2] = useState("");
  const [validatio3, setConfirmValidatio3] = useState("");
  const [passwordEquals, setPasswordEquals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  



  const validation = (text) => {
    console.log(phoneNumber)
    if (text.length < 8) {
      setConfirmValidatio1("false");
    } else {
      setConfirmValidatio1("true");
    }

    if (!(/[A-Za-z]/.test(text) && /\d/.test(text))) {
      setConfirmValidatio2("false");
      // alert("Senha inválida! Deve conter letras e números.");
    } else {
      setConfirmValidatio2("true");
    }

    if (!/[A-Z]/.test(text) || !/[a-z]/.test(text)) {
      setConfirmValidatio3("false");
      // alert("Senha inválida! Deve conter pelo menos uma letra maiúscula.");
    } else {
      setConfirmValidatio3("true");
    }

  }

  const handleRegister = async () => {

    if (password.length < 8) {
      setConfirmValidatio1("block");
    } else {
      setConfirmValidatio1("true");
    }

    if (!(/[A-Za-z]/.test(password) && /\d/.test(password))) {
      setConfirmValidatio2("block");
      // alert("Senha inválida! Deve conter letras e números.");
    } else {
      setConfirmValidatio2("true");
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setConfirmValidatio3("block");
      // alert("Senha inválida! Deve conter pelo menos uma letra maiúscula.");
    } else {
      setConfirmValidatio3("true");
    }

    if (!password.trim() && !confirmPassword.trim()) {
      // alert('Por favor, insira um nome valido.');
      return;
    } else {
      if (password !== confirmPassword || validatio1 !== "true" || validatio2 !== "true" || validatio3 !== "true") {
        setPasswordEquals("false");
        // alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
      }
      setPasswordEquals("true");
    }

    // Chamar a função de registro
    try {
      setIsLoading(true);
      const registro = await register(email, password, firstName, surname, notificationToken, phoneNumber);
      console.log(registro)
      setSuccess(true)
    } catch (err) {
      alert("Erro: ", err);
      Alert.alert("Erro", err.error || "Senha ou email inválido.");
    } finally {
      setIsLoading(false)
    }
  };



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
            text={""}
            onPress={() => navigation.goBack('Login')}
          />
          {/* <View> */}
          <View style={style.boxTop}>
            <Image style={style.imageTop} source={imageTop}></Image>

            <View style={style.textBox}>
              <Text style={style.title}>Definir Senha</Text>
              <Text style={style.text}>
                Crie uma senha para proteger sua conta.
              </Text>
            </View>
          </View>

          <View style={style.boxCenter}>


            <Input
              inputPassword={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                validation(text);
              }}
              secureTextEntry={true}
              placeholder={'Senha'}
            ></Input>

            <Input
              inputPassword={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              placeholder={'Confirmar Senha'}
            ></Input>

            {passwordEquals === "false" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                as senhas não coincidem. Por favor, tente novamente.
              </Text>
            ) : null}

            <Text style={{ color: themes.colors.green, marginTop: 10, fontFamily: 'Poppins-Medium' }}>
              Sua senha deve conter:{"\n"}
              {/* validação 1 */}
              {validatio1 === "true" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.green, fontFamily: 'Poppins' }}>
                  •   Pelo menos 8 caracteres {"\u2713"}{"\n"}
                </Text>
              ) : validatio1 === "block" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  •   Pelo menos 8 caracteres {"\n"}
                </Text>
              ) : <Text style={{ marginLeft: 3, color: "black", fontFamily: 'Poppins' }}>
                •   Pelo menos 8 caracteres {"\n"}
              </Text>}


              {/* validação 2 */}
              {validatio2 === "true" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.green, fontFamily: 'Poppins' }}>
                  •   Letras e números {"\u2713"} {"\n"}
                </Text>
              ) : validatio2 === "block" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  •   Letras e números {"\n"}
                </Text>
              ) : <Text style={{ marginLeft: 3, color: "black", fontFamily: 'Poppins' }}>
                •   Letras e números {"\n"}
              </Text>}

              {/* validação 3 */}
              {validatio3 === "true" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.green, fontFamily: 'Poppins' }}>
                  •   1 letra maíusculo e minúscula  {"\u2713"}
                </Text>
              ) : validatio3 === "block" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  •   1 letra maíusculo e minúscula
                </Text>
              ) : <Text style={{ marginLeft: 3, color: "black", fontFamily: 'Poppins' }}>
                •   1 letra maíusculo e minúscula
              </Text>}
            </Text>

            <Button
              //  onPress={handleRegister} 
              onPress={handleRegister}
              texto={isLoading ? (<ActivityIndicator size="30" color="#fff" />) : ("Cadastrar")}></Button>
          </View>

        </View>
      </ScrollView>
      {success &&
        <AlertCustom
          type={"Success"}
          title={"Sucesso"}
          message={"Conta criada com sucesso, vamos prosseguir para o promximos passoss"}
          onPress={() => {navigation.navigate('RegisterPropertyStep1')}}
        />
      }
    </KeyboardAvoidingView>
  );
}

import { useState, useContext, useEffect, useRef } from "react";
import TopNavigation from '../../../../components/top-navigation/topNavigation'
import { AuthContext } from '../../../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import { updatePassword } from "../../../../services/userService"
import AlertCustom from '../../../../components/alert/Alert'

// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditName({ navigation }) {
  const [currentName, setCurrentName] = useState("");
  const [Surname, setSurname] = useState("");

  const [NewName, setNewCurrentName] = useState("");
  const [NewSurname, setNewSurname] = useState("");

  const [equalFields, setEqualFields] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [success, SetSuccess] = useState(false);
  const [error, SetError] = useState(false);
  const [confirmationUpdate, SetConfirmationUpdate] = useState(false);


  const { userInfo, fetchUser } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validatio1, setConfirmValidatio1] = useState("");
  const [validatio2, setConfirmValidatio2] = useState("");
  const [validatio3, setConfirmValidatio3] = useState("");
  const [passwordEquals, setPasswordEquals] = useState("");



  const validation = (text) => {
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

  const handleUpdatePassword = async () => {

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

    console.log("Rodou a funçao");
    setIsLoading(true);
    if (!userInfo?._id) {
      setIsLoading(false);
      return;
    }

    try {
      console.log("Rodou a requisiçaio");
      Keyboard.dismiss();
      const user = await updatePassword(userInfo._id, password);
      await fetchUser(userInfo._id);
      SetError(false);
      SetSuccess(true);
      setIsLoading(false);
    } catch (error) {
      SetSuccess(false);
      SetError(true);
      setIsLoading(false);
      console.log("Erro ao atualizar nome:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(userInfo)
    setCurrentName(userInfo.firstName)
    setSurname(userInfo.surname)
    setNewSurname(userInfo.surname)
    setNewCurrentName(userInfo.firstName);

    if (NewName === currentName && NewSurname === Surname) {
      setEqualFields(true)
      console.log("Campos iguais");
    } else {
      setEqualFields(false)
    }
  }, [userInfo]);

  useEffect(() => {
    if (NewName === currentName && NewSurname === Surname) {
      setEqualFields(true)
      console.log("Campos iguais");
    } else {
      setEqualFields(false)
    }
  }, [NewSurname, NewName]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);

        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              y: 230,
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
    <>
      <View style={style.container}>
        <TopNavigation
          text={`Alterar senha`}
          onPress={() => navigation.goBack()}
        />

        <View style={style.content}>

          <View style={style.inputs}>
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
          </View>


          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={120}  // Ajuste se necessário
          >
            <Button
              style={style.button}
              disabled={false}
              onPress={() => {SetConfirmationUpdate(true), Keyboard.dismiss()}}
              texto={
                isLoading
                  ? <ActivityIndicator size="30" color="#fff" />
                  : "Salvar"
              }
            />
          </KeyboardAvoidingView>

        </View>

      </View>

      {success && (
        <AlertCustom
          type={"Success"}
          title={"Sucesso!"}
          message={"Senha atualizado com sucesso"}
          onPress={() => { SetSuccess(false), navigation.goBack() }}
        />
      )}

      {error && (
        <AlertCustom
          type={"Error"}
          title={"Ocorreu um erro"}
          message={"Erro ao atualizar senha, tente novamente"}
          onPress={() => { SetError(false), navigation.goBack() }}
        />)
      }

      {confirmationUpdate && (
        <AlertCustom
          type={"Confirmation"}
          title={"Tem certeza?"}
          message={"Você tem certeza que deseja atualizar sua senha?"}
          OnPressAccepted={() => { console.log("Acepted"), handleUpdatePassword(), SetConfirmationUpdate(false) }}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationUpdate(false) }}
        />
      )}
    </>
  );
}

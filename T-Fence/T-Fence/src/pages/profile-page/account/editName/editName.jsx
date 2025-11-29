import { useState, useContext, useEffect, useRef } from "react";
import TopNavigation from '../../../../components/top-navigation/topNavigation'
import { AuthContext } from '../../../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import { updateName } from "../../../../services/userService"
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


  const { userInfo, fetchUser } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleUpdateName = async () => {
    console.log("Rodou a funçao");
    setIsLoading(true);
    if (!userInfo?._id) {
      setIsLoading(false);
      return;
    }
    if (NewName === currentName && NewSurname === Surname) {
      setIsLoading(false);
      setEqualFields(true)
      console.log("Campos iguais");
      return
    }
    setEqualFields(false)

    try {
      console.log("Rodou a requisiçaio");
      Keyboard.dismiss();
      const user = await updateName(userInfo._id, NewName, NewSurname);
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
          text={`Alterar nome`}
          onPress={() => navigation.goBack()}
        />

        <View style={style.content}>

          <View style={style.inputs}>
            <Input
              keyboardType="text"
              onChangeText={setNewCurrentName}
              value={NewName}
              Propwidth={"100%"}
              placeholder={'Nome'}
            />

            <Input
              keyboardType="text"
              onChangeText={setNewSurname}
              value={NewSurname}
              Propwidth={"100%"}
              placeholder={'Sobrenome'}
            />
          </View>


          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={120}  // Ajuste se necessário
          >
            <Button
              style={style.button}
              disabled={equalFields}
              onPress={() => handleUpdateName()}
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
          message={"Nome atualizado com sucesso"}
          onPress={() => { SetSuccess(false), navigation.goBack() }}
        />
      )}

      {error && (
        <AlertCustom
          type={"Error"}
          title={"Ocorreu um erro"}
          message={"Erro ao atualizar o nome, tente novamente"}
          onPress={() => { SetError(false), navigation.goBack() }}
        />)
      }
    </>
  );
}

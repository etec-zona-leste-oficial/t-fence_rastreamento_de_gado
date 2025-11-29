import { useState, useContext, useEffect, useRef } from "react";
import TopNavigation from '../../../../components/top-navigation/topNavigation'
import { AuthContext } from '../../../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./style";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import { updateName } from "../../../../services/PropertyService"
import AlertCustom from '../../../../components/alert/Alert'

// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditName({ navigation }) {
  // const [newPhoneNumber, setNewPhoneNumber] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");

  const [newPropertyName, setNewPropertyName] = useState(""); // Hook utilizado para atualizar o nome
  const [propertyName, setPropertyName] = useState(""); //Hook que armazena o nome que vem do banco
  const [equalFields, setEqualFields] = useState(true);

  const [success, SetSuccess] = useState(false);
  const [error, SetError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {propertyInfo, fetchProperty} = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // const handlePhoneChange = (text) => {
  //   // Remove tudo que não é número
  //   const cleaned = text.replace(/\D/g, "");

  //   // Aplica a máscara conforme o tamanho
  //   let formatted = cleaned;
  //   if (cleaned.length <= 2) {
  //     formatted = `(${cleaned}`;
  //   } else if (cleaned.length <= 7) {
  //     formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  //   } else if (cleaned.length <= 11) {
  //     formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  //   } else {
  //     formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  //   }

  //   setNewPhoneNumber(formatted);
  // };

    const handleNameChange = (text) => {
        setNewPropertyName(text);
      };


  const handleUpdate = async () => {
    setIsLoading(true);
    if (!propertyInfo?._id) {
      setIsLoading(false);
      return;
    }
    try {
      Keyboard.dismiss();
      const property = await updateName(propertyInfo._id, newPropertyName);
      console.log("resultado da req",property)
      await fetchProperty(propertyInfo._id)
      SetError(false);
      SetSuccess(true);
    } catch (error) {
      SetSuccess(false);
      SetError(true);
      console.log("Erro ao Atualizar animal:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleNameChange(propertyName)
  }, [propertyName]);

  useEffect(() => {
    setNewPropertyName(propertyInfo.name_Property)
    setPropertyName(propertyInfo.name_Property)
  }, [propertyInfo]);

  useEffect(() => {
    if (newPropertyName === propertyName) {
      setEqualFields(true)
      console.log("Campos iguais");
    } else {
      setEqualFields(false)
    }
  }, [newPropertyName]);

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
          text={`Renomear propriedade`}
          onPress={() => navigation.goBack()}
        />

        <View style={style.content}>

          <View style={style.inputs}>
            <Input
              keyboardType="text"
              onChangeText={handleNameChange}
              value={newPropertyName}
              Propwidth={"100%"}
              placeholder={'Nome'}
            />

          </View>

          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={120}  // Ajuste se necessário
          >
            <Button
              style={style.button}
              disabled={equalFields}
              onPress={() => handleUpdate()}
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
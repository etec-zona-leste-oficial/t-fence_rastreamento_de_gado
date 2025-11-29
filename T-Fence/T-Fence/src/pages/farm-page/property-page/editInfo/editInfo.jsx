import { useState, useContext, useEffect, useRef } from "react";
import TopNavigation from '../../../../components/top-navigation/topNavigation'
import { AuthContext } from '../../../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./style";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import { updateDescription } from "../../../../services/PropertyService"
import AlertCustom from '../../../../components/alert/Alert'

// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditInfo({ navigation }) {
  const [newDescription, setNewDescription] = useState("");
  const [Description, setDescription] = useState("");
  const [equalFields, setEqualFields] = useState(true);

  const [success, SetSuccess] = useState(false);
  const [error, SetError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {propertyInfo, fetchProperty} = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleDescriptionChange = (text) => {
    setNewDescription(text);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (!propertyInfo?._id) {
      setIsLoading(false);
      return;
    }
    try {
      Keyboard.dismiss();
      const property = await updateDescription(propertyInfo._id, newDescription);
      console.log("resultado da req",property)
      await fetchProperty(propertyInfo._id, )
      SetError(false);
      SetSuccess(true);
    } catch (error) {
      SetSuccess(false);
      SetError(true);
      console.log("Erro ao Atualizar descrição:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleDescriptionChange(Description)
  }, [Description]);

  useEffect(() => {
    setNewDescription(propertyInfo.description)
    setDescription(propertyInfo.description)
  }, [propertyInfo]);

  useEffect(() => {
    if (newDescription === Description) {
      setEqualFields(true)
      console.log("Campos iguais");
    } else {
      setEqualFields(false)
    }
  }, [newDescription]);

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
          text={`Alterar Descrição`}
          onPress={() => navigation.goBack()}
        />

        <View style={style.content}>

          <View style={style.inputs}>
            <Input
              keyboardType="text"
              onChangeText={handleDescriptionChange}
              value={newDescription}
              Propwidth={"100%"}
              placeholder={'Descrição'}
              multiline={true}
              Propheight={150}
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
          message={"Descrição atualizada com sucesso"}
          onPress={() => { SetSuccess(false), navigation.goBack() }}
        />
      )}

      {error && (
        <AlertCustom
          type={"Error"}
          title={"Ocorreu um erro"}
          message={"Erro ao atualizar a descrição, tente novamente"}
          onPress={() => { SetError(false), navigation.goBack() }}
        />)
      }
    </>
  );
}
import { useState, useContext, useEffect, useRef } from "react";
import TopNavigation from '../../../../components/top-navigation/topNavigation'
import { AuthContext } from '../../../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";

// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditName({ navigation }) {
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [equalFields, setEqualFields] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    if (!userInfo?._id) {
      setIsLoading(false);
      return;
    }
    try {
      const user = await updateInfo(foundAnimal.animal._id, name, identifier);
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
    setEmail(userInfo.email)
    setNewEmail(userInfo.email)

  }, [userInfo]);

  useEffect(() => {
    if (newEmail === email) {
      setEqualFields(true)
      console.log("Campos iguais");
    } else {
      setEqualFields(false)
    }
  }, [newEmail]);

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
          text={`Email`}
          onPress={() => navigation.goBack()}
        />

        <View style={style.content}>

          <View style={style.inputs}>
            <Input
              editable={true}
              keyboardType="text"
              onChangeText={setNewEmail}
              value={newEmail}
              Propwidth={"100%"}
              placeholder={'Nome'}
            />

          </View>


          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={120}  // Ajuste se necessário
          >
            {/* <Button
              style={style.button}
              disabled={equalFields}
              onPress={() => console.log("s")}
              texto={
                isLoading
                  ? <ActivityIndicator size="30" color="#fff" />
                  : "Salvar"
              }
            /> */}
          </KeyboardAvoidingView>

        </View>


      </View></>
  );
}

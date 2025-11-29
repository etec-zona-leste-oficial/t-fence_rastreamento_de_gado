import { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard, ActivityIndicator } from "react-native";
import style from "./style";
import { AuthContext } from "../../context/AuthContext";
import { themes } from '../../global/themes'
import Clock from '../../assets/icons/clock.png';
import Button from "../../components/button/button";
import InputVerification from "../../components/inputVerification/inputVerification";
import { requestCollaborators, removeRequestCollaborator } from "../../services/PropertyService"
import AlertCustom from '../../components/alert/Alert'

export default function Verification({navigation}) {
  const { userInfo, setStatusRequestCollaborate, requestCollaborate } = useContext(AuthContext)
  const { completCollaborator } = useContext(AuthContext);

  const [propertyCode, setPropertyCode] = useState();
  const [success, SetSuccess] = useState(false);
  const [error, SetError] = useState(false);
  const [fieldValid, setFieldValid] = useState(false);
  const [errFild, setErrFild] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const cancelRequestCollaborator = async () => {
    setIsLoading(true)
    try {
      const requestCollaborator = await removeRequestCollaborator(userInfo._id);
      setStatusRequestCollaborate("false")
      console.log(requestCollaborator)
    } catch (err) {
      setErrFild(true);
      console.log("Erro ao cancelar solicitação: ", err)
    }finally{
    setIsLoading(false)
    }
  }

  useEffect(() => {
    if (propertyCode?.length >= 5) {
      setFieldValid(true)
    }
    setErrFild(false);
  }, [propertyCode])

useEffect(() => {
  const interval = setInterval(() => {
    console.log("Solicitaçao: " + requestCollaborate)
    if (requestCollaborate === "true") {
      completCollaborator(userInfo._id);
      console.log("Rodou");
    }
  }, 5000);

  return () => clearInterval(interval);
}, [requestCollaborate]);


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
          <View>
            <View style={style.boxTop}>
              <Image
                style={style.imgVerification}
                source={Clock}
                resizeMode="contain">
              </Image>

              <View style={style.text}>
                <Text style={style.title}>Solicitação enviada</Text>
                <Text style={style.subtitle}>Sua solicitação foi enviada com sucesso, aguarde a confirmação do proprietário .</Text>
              </View>

            </View>
            <View style={style.boxCenter}>
            </View>
            <View style={style.boxBottom}>
              <Button
                onPress={() => cancelRequestCollaborator()}
                texto={isLoading ? <ActivityIndicator size="30" color="#fff" /> : 'Cancelar solicitação'}>
              </Button>
              {errFild ? (
                <Text style={{ marginLeft: 3, marginTop: 10, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  Código inválido. Propriedade não encontrada.
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {error && (
          <AlertCustom
            type={"Error"}
            title={"Ocorreu um erro"}
            message={"Erro ao cadastrar o animal, tente novamenteErro ao atualizar o animal, tente novamente."}
            onPress={() => { SetError(false), reload() }}
          />)
        }
        {success && (
          <AlertCustom
            type={"Success"}
            title={"Sucesso!"}
            message={"dfsdf"}
            onPress={() => { SetSuccess(false) }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

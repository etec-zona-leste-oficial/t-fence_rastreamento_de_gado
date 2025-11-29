import { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard, ActivityIndicator } from "react-native";
import style from "./style";
import { AuthContext } from "../../context/AuthContext";
import { themes } from '../../global/themes'
import VerificationIcon from '../../assets/icons/VerificationIcon.png';
import Button from "../../components/button/button";
import InputVerification from "../../components/inputVerification/inputVerification";
import { requestCollaborators } from "../../services/PropertyService"
import AlertCustom from '../../components/alert/Alert'

export default function Verification({navigation}) {
  const { userInfo, setStatusRequestCollaborate } = useContext(AuthContext)
  const [propertyCode, setPropertyCode] = useState();
  const [success, SetSuccess] = useState(false);
  const [error, SetError] = useState(false);
  const [fieldValid, setFieldValid] = useState(false);
  const [errFild, setErrFild] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const RequestCollaborator = async () => {
    setIsLoading(true)
    try {
      const requestCollaborator = await requestCollaborators(propertyCode, userInfo._id);
      setStatusRequestCollaborate('true')
      navigation.navigate('RequestCollaboratorsAwaiting');
      console.log(requestCollaborator)
    } catch (err) {
      setErrFild(true);
      console.log("Erro ao enviar solicitação: ", err)
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
                source={VerificationIcon}
                resizeMode="contain">
              </Image>

              <View style={style.text}>
                <Text style={style.title}>Código da propriedade</Text>
                <Text style={style.subtitle}>insira o código de 5 digitos para enviar uma solicitação para se tornar colaborador.</Text>
              </View>

            </View>
            <View style={style.boxCenter}>
              <InputVerification
                onChangeText={(code) => setPropertyCode(code)}
              />
            </View>
            <View style={style.boxBottom}>
              <Button
                disabled={!fieldValid}
                onPress={() => RequestCollaborator()}
                texto={isLoading ? <ActivityIndicator size="30" color="#fff" /> : 'Enviar'}>
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

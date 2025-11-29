import { registerUser } from "../../../services/userService";
import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./Style";
import { themes } from '../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'
import Input from "../../..//components/input/input";
import ImageTop from '../../../assets/icons/Farmhouse-pana.png'
import Button from '../../../components/button/button'

export default function RegisterPropertyStep2({ navigation, route }) {

  const [namePropriety, setNamePropriety] = useState("");
  const [erroMessage, setErroMessage] = useState("null");

  const scrollRef = useRef(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const validation = (text) => {
    if (text.length < 4) {
      console.log("Menos que 4 caracteres")

      return
    }
  }

  const handleContinue = () => {
    if (namePropriety.length < 4) {
      setErroMessage("caracters")
      console.log("Menos que 4 caracteres")
      return
    }
    setErroMessage("null")
    navigation.navigate('RegisterPropertyStep3', {
      namePropriety: namePropriety.trim()
    })
  }

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
          {/* <View> */}
          <View style={style.boxTop}>
            <Image style={style.imageTop} source={ImageTop}></Image>

            <View style={style.textBox}>
              <Text style={style.title}>Cadastro {"\n"} de propiedade</Text>
              <Text style={style.text}>
                Vamos dar o primeiro passo? Preencha as informações da sua propriedade e comece a usar o T-Fence no campo.
              </Text>
            </View>
          </View>

          <View style={style.boxCenter}>
            <Input
              onChangeText={(text) => {
                setNamePropriety(text);
                validation(text);
              }}
              value={namePropriety}
              placeholder={'Nome da propriedade'}>
            </Input>
            {erroMessage === "caracters" ? (
              <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                o nome deve conter no mínimo 4 caracteres
              </Text>
            ) : null}

            <Button
              onPress={handleContinue}
              texto="Avançar"
              typeButton="Full"
            >
            </Button>

          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

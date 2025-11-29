import { useState, useContext, useEffect, useRef } from "react";
import TopNavigation from '../../../../components/top-navigation/topNavigation'
import { AuthContext } from '../../../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from "react-native";
import style from "./style";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import { updateArea } from "../../../../services/PropertyService"
import AlertCustom from '../../../../components/alert/Alert'
import InputSelect from "../../../../components/input-select/input-select";

// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditArea({ navigation }) {
  const [newArea, setNewArea] = useState("");
  const [Area, setArea] = useState("");
  const [measure, setMeasure] = useState("Null");
  const [originalMeasure, setOriginalMeasure] = useState("");
  const [equalFields, setEqualFields] = useState(true);

  const options = [
    { label: "Medida", value: "Null" },
    { label: "ha", value: "ha" },
    { label: "m²", value: "m²" }
  ];

  const [success, SetSuccess] = useState(false);
    const [error, SetError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {propertyInfo, fetchProperty} = useContext(AuthContext);
    const scrollRef = useRef(null);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
  
    const handleAreaChange = (text) => {
      setNewArea(text);
    };
  
    const handleUpdate = async () => {
  setIsLoading(true);

  if (!propertyInfo?._id) {
    setIsLoading(false);
    return;
  }

  try {
    Keyboard.dismiss();

    // Monta o valor antes de salvar
    const fullArea = `${newArea}${measure}`;

    const property = await updateArea(propertyInfo._id, fullArea);
    console.log("resultado da req", property);

    await fetchProperty(propertyInfo._id);

    SetError(false);
    SetSuccess(true);

  } catch (error) {
    SetSuccess(false);
    SetError(true);
    console.log("Erro ao Atualizar Area:", error);
  } finally {
    setIsLoading(false);
  }
};

    useEffect(() => {
      handleAreaChange(Area)
    }, [Area]);
  
    useEffect(() => {
  if (!propertyInfo?.area) return;

  const [, numero, unidade] = propertyInfo.area.match(/(\d+)([a-zA-Z²]+)/);

  setNewArea(numero);
  setArea(numero);        // número original
  setMeasure(unidade);    // para o select
  setOriginalMeasure(unidade); // <-- salvar a medida original
}, [propertyInfo]);


  
      useEffect(() => {
  if (newArea === Area && measure === originalMeasure) {
    setEqualFields(true);
  } else {
    setEqualFields(false);
  }
}, [newArea, measure]);

  
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
          text={`Alterar área`}
          onPress={() => navigation.goBack()}
        />

        <View style={style.content}>

          <View style={style.inputs}>
            <Input
              keyboardType="text"
              onChangeText={handleAreaChange}
              value={newArea}
              Propwidth={"55%"}
              placeholder={'Area'}
            />

            <InputSelect
              select={measure}
              SetSelect={setMeasure}
              options={options}
              title={"Medida"}                            
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
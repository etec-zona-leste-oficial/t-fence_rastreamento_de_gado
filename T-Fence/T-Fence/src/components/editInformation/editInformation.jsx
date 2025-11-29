import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./Style";
import Input from "../input/input";
import IconPadlock from '../../assets/icons/IconPadlock.png'
import TopNavigation from '../top-navigation/topNavigation'
import Button from '../button/button'
// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function EditInformation({
  titlePage,
  goBack,
  inputText,
  initialValue,
  inputPassword,
  navigation
}) {

  const [newValue, setNewValue] = useState(initialValue);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    onSave(newValue);
  };

  return (

    <View style={style.container}>

      <TopNavigation
        text={`Alterar ${titlePage}`}
        onPress={goBack}
      />

      <View style={style.form}>

        <View style={style.boxInput}>
          <Input
            value={newValue}
            onChangeText={setNewValue}
            placeholder={inputText}
            inputPassword={inputPassword}
          />

          {inputPassword ? (
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder={"Confirmar senha"}
              inputPassword={inputPassword}
            />
          ) : null}
        </View>

        <Button
          onPress={handleSave}
          texto={'Salvar'}
        />
      </View>


    </View>
  );
}

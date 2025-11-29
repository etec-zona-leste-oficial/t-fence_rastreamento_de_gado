import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style";
import {themes} from '../../global/themes'
import VerificationIcon from '../../assets/icons/VerificationIcon.png';
import Button from "../../components/button/button";
import InputVerification from "../../components/inputVerification/inputVerification";

 export default function Verification() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={style.container}>
      <View>
         <View style={style.boxTop}>
              <Image  
              style={style.imgVerification}
              source={VerificationIcon}
              resizeMode="contain">
              </Image>

            <View style={style.text}>
              <Text style={style.title}>Verificação</Text>
              <Text>Insira o código de 5 dígitos que enviamos para </Text>
              <Text style={style.textEmail}>vinicius123@gmail.com</Text>
              <Text>para confirmar sua identidade e continuar.</Text>
            </View>

          </View>
          <View style={style.boxCenter}>
              <InputVerification/>
              <Text>Deseja alterar seu Email?</Text>
          </View>
          <View style={style.boxBottom}>
             <Button texto = {'Verificar'}></Button> 
          </View>
        </View>
    </View>
  );
}

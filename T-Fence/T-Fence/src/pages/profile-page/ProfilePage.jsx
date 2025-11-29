import { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./Style";
import IconPadlock from '../../assets/icons/ImagemPerfil.png'
import leaveIcon from '../../assets/icons/leave.png'
import personIcon from '../../assets/icons/person.png'
import notificationIcon from '../../assets/icons/notification.png'
import photoProfile from '../../assets/icons/photoProfile.png'
import mailIcon from '../../assets/icons/mailIcon.png'
import AlertCustom from '../../components/alert/Alert'
// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { themes } from '../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function ProfilePage({ navigation }) {

  const { userToken, userInfo, isLoading, notificationToken } = useContext(AuthContext);
  const [confirmationUpdate, SetConfirmationUpdate] = useState(false);
  const { logout } = useContext(AuthContext);

  const sair = async () => {
    await logout();

  }


  return (
    <>
      <View style={style.container}>
        <View style={style.headerProfile}>
          <Image
            source={photoProfile}
            style={style.profileImage}
            resizeMode="contain"
          ></Image>

          <View style={style.userInformations}>
            <Text style={style.userName}>
              {userInfo ? userInfo.firstName + " " + userInfo.surname : "Undefined"}
            </Text>
            <View style={style.email}>
              <Image
                source={mailIcon}
                style={style.mailImage}
                resizeMode="contain"
              ></Image>
              <Text style={style.userEmail}>
                {userInfo ? userInfo.email : "Undefined"}
              </Text>
            </View>

          </View>

        </View>

        <View style={style.verticalSeparator} />

        <View style={style.optionProfile}>

          <View style={style.BoxTop}>

            <TouchableOpacity style={style.optionsCard} onPress={() => navigation.navigate("Account")}>
              <View style={style.imageView}>
                <Image
                  source={personIcon}
                  style={style.icons}
                  resizeMode="contain"
                ></Image>
              </View>

              <View style={style.textView}>
                <Text style={style.title}>Conta</Text>
                <Text style={style.subtitle}>Gerenciar dados pessoais e credenciais</Text>
              </View>

            </TouchableOpacity>

            {/* <TouchableOpacity style={style.optionsCard} onPress={() => navigation.navigate("Notification")}>
              <View style={style.imageView}>
                <Image
                  source={notificationIcon}
                  style={style.icons}
                  resizeMode="contain"
                ></Image>
              </View>

              <View style={style.textView}>
                <Text style={style.title}>Notificações</Text>
                <Text style={style.subtitle}>Ativar e desativar notificações</Text>
              </View>

            </TouchableOpacity> */}

          </View>

          <View style={style.BoxBottom}>

            <TouchableOpacity style={style.optionsCard} onPress={() => SetConfirmationUpdate(true)}>
              <View style={style.imageView}>
                <Image
                  source={leaveIcon}
                  style={style.icons}
                  resizeMode="contain"
                ></Image>
              </View>

              <View style={style.textView}>
                <Text style={[style.title, { color: themes.colors.red }]}>Sair</Text>
              </View>

            </TouchableOpacity>

          </View>

        </View>


      </View>
      {confirmationUpdate && (
        <AlertCustom
          type={"Confirmation"}
          title={"Tem certeza?"}
          message={"Você tem certeza que deseja sair?"}
          OnPressAccepted={() => { console.log("Acepted"), SetConfirmationUpdate(false), sair() }}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationUpdate(false) }}
        />
      )}
    </>
  );
}

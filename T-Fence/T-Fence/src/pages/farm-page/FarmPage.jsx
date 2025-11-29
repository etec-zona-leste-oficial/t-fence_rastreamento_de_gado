import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import style from "./style";
import IconPadlock from '../../assets/icons/IconPadlock.png'
// Tomar cuidado com a quantidade de (../../) se criar um arquivo dentro de mais pastas deve adicionar mais ../
import { AuthContext } from "../../context/AuthContext";
import {themes} from '../../global/themes'
import leaveIcon from '../../assets/icons/leave.png'
import personIcon from '../../assets/icons/person.png'
import notificationIcon from '../../assets/icons/notification.png'
import FarmImage from '../../assets/icons/FarmImage.png'
import FarmIcon from '../../assets/icons/FarmIcon.png'
import ColaboratorsIcon from '../../assets/icons/Colaborators.png'
import AccessIcon from '../../assets/icons/Access.png'
import mailIcon from '../../assets/icons/mailIcon.png'
import {MaterialIcons} from '@expo/vector-icons'

export default function FarmPage({navigation}) {

  const { propertyInfo, userInfo } = useContext(AuthContext);
  const [nameProperty, setNameProperty] = useState("");
  const [ownerName, SetOwnerName] = useState("");

   const sair = async () => {
    await logout(); 

  }

  useEffect(()=>{
    setNameProperty(userInfo.firstName+" "+userInfo.surname);
    SetOwnerName(propertyInfo.name_Property);
  },[propertyInfo])

  return (
    <View style={style.container}>
       <View style={style.headerFarm}>  
        <Image
          source={FarmImage}
          style={style.FarmImage}
          resizeMode="contain"
        ></Image>

        <View style={style.farmInformations}>
          <Text style={style.farmName}>
          {userInfo ? ownerName : "Undefined"}
          </Text>
          <View style={style.farmSubtitle}>
            
          <Text style={style.ownerName}> 
            <Text style={{ fontFamily: "Poppins-Medium" }}>Proprietário:</Text> {propertyInfo? nameProperty: "Undefined"}
          </Text>

          </View>
          
        </View>
        
      </View>

      <View style={style.verticalSeparator}/>

      <View style={style.optionFarm}> 
        
        <View style={style.BoxTop}>

          <TouchableOpacity style={style.optionsCard} onPress={() => navigation.navigate("Property")}>
            <View style={style.imageView}>
               <Image
                source={FarmIcon}
                style={style.icons}
                resizeMode="contain"
              ></Image>
            </View>

            <View style={style.textView}>
              <Text style={style.title}>Propriedade</Text>
              <Text style={style.subtitle}>Gerenciar informações da propriedade</Text>
            </View>
            
          </TouchableOpacity>

          <TouchableOpacity style={style.optionsCard}  onPress={() => navigation.navigate("ColaboratorPage")}>
            <View style={style.imageView}>
            <Image
                source={ColaboratorsIcon}
                style={style.icons}
                resizeMode="contain"
              ></Image>
            </View>

            <View style={style.textView}>
              <Text style={style.title}>Colaboradores</Text>
              <Text style={style.subtitle}>Gerencie os colaboradores de sua propriedade</Text>
            </View>
            
          </TouchableOpacity>

          <TouchableOpacity style={style.optionsCard}  onPress={() => navigation.navigate("PendingRequestCollaborators")}>
            <View style={style.imageView}>
            <Image
                source={AccessIcon}
                style={style.icons}
                resizeMode="contain"
              ></Image>
            </View>

            <View style={style.textView}>
              <Text style={style.title}>Pedidos de acesso</Text>
              <Text style={style.subtitle}>Gerencie os colaboradores de sua propriedade</Text>
            </View>
            
          </TouchableOpacity>

          {/* <TouchableOpacity style={style.optionsCard}  onPress={() => navigation.navigate("Notification")}>
            <View style={style.imageView}>
            <Image
                source={notificationIcon}
                style={style.icons}
                resizeMode="contain"
              ></Image>
            </View>

            <View style={style.textView}>
              <Text style={style.title}>Histórico de notificações</Text>
              <Text style={style.subtitle}>Gerencie o seu histórico de notificações</Text>
            </View>
            
          </TouchableOpacity> */}

        </View>
    
      </View>
    </View>
  );
}

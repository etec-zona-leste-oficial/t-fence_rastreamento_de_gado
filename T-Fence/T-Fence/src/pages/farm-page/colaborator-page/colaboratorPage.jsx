import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import style from "./style";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import ColaboratorCard from "../../../components/colaboration-card/colaborationCard";
import { fetchCollaborates, removeCollaborator } from "../../../services/PropertyService";
import { AuthContext } from "../../../context/AuthContext";
import AlertCustom from '../../../components/alert/Alert'
import themes from "../../../global/themes";

export default function ColaboratorPage({ navigation }) {
  const { propertyInfo } = useContext(AuthContext)
  const [collaborates, setCollaborates] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationRemoveCollaborator, SetConfirmationRemoveCollaborator] = useState(false);
  const [collaborateSelected, SetCollaborateSelected] = useState("");

  const ChangeRemoveCollaborator = async () => {
    try{
      setIsLoading(true);
      if(!collaborateSelected){
        console.log("colaborador não definido");
        return
      }
      const data = await removeCollaborator(collaborateSelected);
      SetCollaborateSelected("")
      console.log("Colaborador removido com sucesso: ", data);
      listCollaborates()
    }catch(error){
      console.log("Erro ao remover colaborador: ", error);
    }finally{
      setIsLoading(false);
    }

  }

  const listCollaborates = async () => {
    try {
      if (!propertyInfo) return;

      setIsLoading(true);

      const data = await fetchCollaborates(propertyInfo._id);

      setCollaborates(data.collaborators);

    } catch (error) {
      console.log("Erro ao listar colaboradores: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    listCollaborates();
  }, [propertyInfo]);

  return (
    <>
      <View style={style.container}>

        <TopNavigation
          text={"Colaboradores"}
          onPress={() => navigation.goBack("")}
        />

        {isLoading ? (
          <ActivityIndicator size={30} />
        ) : collaborates && collaborates.length > 0 ? (

          <FlatList
            data={collaborates}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={style.ListFence}>
                <ColaboratorCard
                  onPress={() => {SetConfirmationRemoveCollaborator(true), SetCollaborateSelected(item.user_id._id)}}

                  name={`${item.user_id.firstName} ${item.user_id.surname}`}
                  requestId={item.user_id._id}
                />
              </View>
            )}
          />

        ) : (
          <Text style={{ fontFamily: "Poppins-Medium", textAlign: "center", marginTop: 12 }}>
            Nenhum colaborador encontrado
          </Text>
        )}

      </View>
      {confirmationRemoveCollaborator && (
        <AlertCustom
          type={"Confirmation"}
          title={"Tem certeza?"}
          message={"Você tem certeza que deseja remover esse colaborador?"}
          OnPressAccepted={() => { console.log("Acepted"), SetConfirmationRemoveCollaborator(false), ChangeRemoveCollaborator()}}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationRemoveCollaborator(false) }}
        />
      )}
    </>
  );
}

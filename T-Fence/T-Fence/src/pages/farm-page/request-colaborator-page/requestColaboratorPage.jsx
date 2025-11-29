import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import style from "./style";
import TopNavigation from "../../../components/top-navigation/topNavigation";
import RequestColaboratorCard from "../../../components/request-colaboration-card/requestColaborationCard";
import { fetchRequestCollaborators, approveCollaborator, removeRequestCollaborator } from "../../../services/PropertyService";
import { AuthContext } from "../../../context/AuthContext";
import AlertCustom from '../../../components/alert/Alert'
import themes from "../../../global/themes";

export default function RequestColaboratorPage({ navigation }) {
  const { propertyInfo } = useContext(AuthContext)
  const [collaborators, setCollaborators] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationRemoveCollaborator, SetConfirmationRemoveCollaborator] = useState(false);
  const [confirmationApproveCollaborator, SetConfirmationApproveCollaborator] = useState(false);
  const [collaborateSelected, SetCollaborateSelected] = useState("");

  const ApproveCollaborator = async () => {
    try {
      setIsLoading(true);
      if (!collaborateSelected) {
        console.log("colaborador não definido");
        return
      }
      const data = await approveCollaborator(collaborateSelected);
      SetCollaborateSelected("")
      console.log("Colaborador aprovado com sucesso: ", data);
      listCollaborates()
    } catch (error) {
      console.log("Erro ao aprovar colaborador: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const RemoveRequestCollaborator = async () => {
    try {
      setIsLoading(true);
      if (!collaborateSelected) {
        console.log("colaborador não definido");
        return
      }
      const data = await removeRequestCollaborator(collaborateSelected);
      SetCollaborateSelected("")
      console.log("Colaborador recusado com sucesso: ", data);
      listCollaborates()
    } catch (error) {
      console.log("Erro ao recusar colaborador: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const listCollaborates = async () => {
    try {
      if (!propertyInfo) return;

      setIsLoading(true);

      const data = await fetchRequestCollaborators(propertyInfo._id);

      setCollaborators(data.collaboratorRequests);

    } catch (error) {
      console.log("Erro ao listar colaboradores: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    listCollaborates();
  }, [propertyInfo]);

    useEffect(() => {
    console.log("Colaboradores: ",collaborators)
  }, [propertyInfo]);


  return (
    <>
      <View style={style.container}>

        <TopNavigation
          text={"Solicitações"}
          onPress={() => navigation.goBack("")}
        />

        {isLoading ? (
          <ActivityIndicator size={30} />
        ) : collaborators && collaborators.length > 0 ? (

          <FlatList
            data={collaborators}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={style.ListFence}>
                <RequestColaboratorCard
                  removeFunction={() => { SetConfirmationRemoveCollaborator(true), SetCollaborateSelected(item.user_id._id) }}
                  approveFunction={() => { SetConfirmationApproveCollaborator(true), SetCollaborateSelected(item.user_id._id) }}
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
          OnPressAccepted={() => { console.log("Acepted"), SetConfirmationRemoveCollaborator(false), RemoveRequestCollaborator() }}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationRemoveCollaborator(false) }}
        />
      )}

      {confirmationApproveCollaborator && (
        <AlertCustom
          type={"Confirmation"}
          title={"Tem certeza?"}
          message={"Você tem certeza que deseja aceitar esse colaborador?"}
          OnPressAccepted={() => { console.log("Acepted"), SetConfirmationApproveCollaborator(false), ApproveCollaborator() }}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationApproveCollaborator(false) }}
        />
      )}
    </>
  );
}

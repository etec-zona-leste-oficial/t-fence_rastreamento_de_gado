import { useState, useContext, useEffect } from "react";
import { AuthContext } from '../../context/AuthContext';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from "react-native";
import style from "./Style";
import SearchBar from '../../components/serchBar/SearchBar'
import VirtualFenceCard from '../../components/create-virtualfence/CreateVirtualFence'
import CollarCard from '../../components/card-collar/CardCollar'
import IconPadlock from '../../assets/icons/IconPadlock.png'
import Map from '../../assets/icons/ImgMap.png'
import CardFence from '../../components/card-fence/CardFence'
import UpdateFenceScreen from '../../components/update-fence/UpdateFence'
import { findFence, searchFenceByName } from "../../services/fenceService";

import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function FencePage() {

  const { propertyInfo } = useContext(AuthContext);
  const [fences, setFences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchField, setSearchField] = useState("")
  const [updateScreenIsOpen, setUpdateScreenIsOpen] = useState(false);
  const [fenceId, setFenceId] = useState("");

  const fetchFences = async () => {
        // Garante que temos um ID de propriedade antes de fazer a chamada
        if (!propertyInfo?._id) {
            Alert.alert("Erro", "Nenhuma propriedade selecionada.");
            return;
        }

        try {
            setIsLoading(true);
            const foundFences = await findFence(propertyInfo._id);
            // console.log(foundFences)
            setFences(foundFences);
        } catch (error) {
            console.error("Erro ao buscar cercas:", error);
            Alert.alert("Erro", error.error || "Não foi possível carregar as cercas.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSearch = async (text) => {
        if (!propertyInfo?._id && text.length <= 0) {
            Alert.alert("Erro", "Nenhuma propriedade selecionada.");
            return;
        }

        try {
            setIsLoading(true);
            const foundFences = await searchFenceByName(propertyInfo._id, text);
            // console.log(foundFences)
            setFences(foundFences);
        } catch (error) {
            console.error("Erro ao buscar cercas por nome:", error);
            Alert.alert("Erro", error.error || "Não foi possível carregar as cercas.");
        } finally {
            setIsLoading(false);
        }
    };

     useEffect(() => {
        fetchFences();
    }, [propertyInfo]);

  const searchFence = async () => {
    try {
            await findFence(propertyInfo);

        } catch (error) {
            setErrorMessage("loginFailed");
            Alert.alert("Erro no Cadastro", error.error || "Ocorreu um erro, tente novamente.");
        }
    }


  return (
    <View style={style.container}>
      <View style={style.headerFence}>
        <Text style={style.titleHeader}>Cercas</Text>
      </View>
      <View style={style.bodyFence}>
        <View style={style.containerMap}>
          <MapView
           mapType="satellite"
           style={style.map}
           initialRegion={{
           latitude: -23.524034697030338,   //Etec Zona Leste
           longitude: -46.476110874399346,
           latitudeDelta: 0.01,   // zoom no eixo vertical
           longitudeDelta: 0.01,  // zoom no eixo horizontal
        }}
>
          {fences.map(fence => (
              <Polygon
                key={fence._id}
                coordinates={fence.coordinates.map(coord => ({
                  latitude: parseFloat(coord.latitude),
                  longitude: parseFloat(coord.longitude)
                }))}
                // strokeColor={themes.colors.green}
                //           fillColor="rgba(0, 82, 11, 0.3)"

                
                strokeColor={fence.status ? themes.colors.green : "rgba(255,0,0,0.8)"}
                fillColor={fence.status ? "rgba(0, 82, 11, 0.3)" : "rgba(255,0,0,0.3)"} // Verde se ativa, vermelho se inativa
                strokeWidth={2}
              />
          ))}
        </MapView>
          
        </View>

        <View style={style.Fence}>
          <Text style={style.titleFence}>Minhas Cercas</Text>
          <SearchBar
            onChangeText={setSearchField}
            searchFunction={fetchSearch}
            value={searchField}
            placeholder="Pesquisar cerca"/>

          {fences.length > 0 ? (
            <FlatList
            data={fences}
            keyExtractor={(item) => item._id} 
            initialNumToRender={5}
            windowSize={10}          // número de telas “visíveis” para renderizar antes/depois
            removeClippedSubviews={true} // remove itens que saem da tela
            renderItem={({ item }) => (
              <View style={style.ListFence}>
                <CardFence
                  name={item.name}
                  onPress={()=> {console.log("apertou"), setUpdateScreenIsOpen(true), setFenceId(item._id)}}
                  status={item.status}
                  propertyid={item._id}
                />
              </View>
                )
              }
            />
            ) :
            isLoading ?
            ( <ActivityIndicator size="30" color={themes.colors.green} />)
            :(<Text style={[{fontFamily: "Poppins-Medium"}, {textAlign: "center"},{marginTop: 12}]}>Nenhuma cerca encontrada</Text>)
          }

        </View>
      </View>
      
      <VirtualFenceCard
      reload={fetchFences}
      />
      
      {updateScreenIsOpen &&
      <UpdateFenceScreen
       fenceIdSelect={fenceId}
       closedScreenProp={() => {setUpdateScreenIsOpen(false)}}
       reload={fetchFences}
      />
      }
    </View>
  );
}

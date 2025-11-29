import { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import style from "./Style";

import SearchBar from '../../components/serchBar/SearchBar'
import CollarCard from '../../components/card-collar/CardCollar'
import PairCentral from '../../components/pair-central/PairCentral.jsx';
import IconPadlock from '../../assets/icons/IconPadlock.png'
import CreateCollar from '../../components/create-collar/CreateCollar'
import { findCollar, searchCollarByName } from "../../services/collarService";
import { verifyCentralPair } from "../../services/centralService";
import { AuthContext } from '../../context/AuthContext';
import Button from "../../components/button/button";

import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function CollarPage() {
  const { propertyInfo } = useContext(AuthContext);
  const [collars, setCollars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [centralPair, setIsCentralPair] = useState(true);
  const [updateScreenIsOpen, setUpdateScreenIsOpen] = useState(false);
  const [pairCentralIsOpen, setPairCentralIsOpen] = useState(true);
  const [searchField, setSearchField] = useState("")
  const [collarId, setCollarId] = useState("")

    const fetchCollar = async () => {
      // Garante que temos um ID de propriedade antes de fazer a chamada
      if (!propertyInfo?._id) {
          Alert.alert("Erro", "Nenhum collar selecionada.");
          return;
      }
      
      try {
          setIsLoading(true);
          const foundCollars = await findCollar(propertyInfo._id);
          // console.log(foundCollars)
          setCollars(foundCollars);
      } catch (error) {
          console.error("Erro ao buscar cercas:", error);
          Alert.alert("Erro", error.error || "Não foi possível carregar as cercas.");
      } finally {
          setIsLoading(false);
      }
    };

        const fetchCentral = async () => {
      // Garante que temos um ID de propriedade antes de fazer a chamada
      if (!propertyInfo?._id) {
          Alert.alert("Erro", "Nenhum id de propriedade encontrada.");
          return;
      }
      
      try {
          setIsLoading(true);
          const central = await verifyCentralPair(propertyInfo._id);
          // console.log(central)
          setIsCentralPair(true);
      } catch (error) {
          // console.error("Erro ao buscar central:", error);
          setIsCentralPair(false);
          // Alert.alert("Erro", error.error || "Não foi possível pesquisar a central.");
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
          const foundCollars = await searchCollarByName(propertyInfo._id, text);
          // console.log(foundCollars)
          setCollars(foundCollars);
      } catch (error) {
          console.error("Erro ao buscar cercas por nome:", error);
          Alert.alert("Erro", error.error || "Não foi possível carregar as cercas.");
      } finally {
          setIsLoading(false);
      }
    };
    

   useEffect(() => {
      fetchCollar();
  }, [propertyInfo]);

     useEffect(() => {
      fetchCentral();
  }, [pairCentralIsOpen]);

  return (
    <View style={style.container}>

      <View style={style.content}> 

  {centralPair ? (
        <View style={style.collar}>
          <Text style={style.titleCollar}>Coleiras</Text>
          <SearchBar
            onChangeText={setSearchField}
            searchFunction={fetchSearch}
            value={searchField}
            placeholder="Pesquisar coleiras"/>

          {collars.length > 0 ? (
            <FlatList
            data={collars}
            keyExtractor={(item) => item._id} 
            initialNumToRender={5}
            windowSize={10}          // número de telas “visíveis” para renderizar antes/depois
            removeClippedSubviews={true} // remove itens que saem da tela
            renderItem={({ item }) => (
              <View style={style.listCollar}>
                <CollarCard
                  onPress={() => {setCollarId(item._id) ,setUpdateScreenIsOpen(true)}}
                  name={item.name_collar}
                  status={item.status}
                  propertyid={item.property_id}
                  baterry={item.battery}
                  fence={item.fence_id?.name || "Nenhum"}
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
      ) : (null)
  }
       
        </View>  
        <CreateCollar
        reload={fetchCollar}
        />
        {
          updateScreenIsOpen &&
            <CreateCollar
            collarIdSelect={collarId}
            reload={fetchCollar}
            closedScreenProp={() => setUpdateScreenIsOpen(false)}
            type={"Update"}
          />
        }

          {!centralPair &&
          <PairCentral
            closedScreen={() => setPairCentralIsOpen(false)}
          />
        }
    </View>
  );
}

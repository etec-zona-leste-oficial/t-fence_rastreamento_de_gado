import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import style from "./Style";

import SearchBar from '../../components/serchBar/SearchBar'
import AnimalCard from '../../components/card-animal/CardAnimal'
import CreateAnimal from '../../components/create-animal/CreateAnimal'
import { findAnimals, searchCollarByName } from "../../services/animalService";
import { AuthContext } from '../../context/AuthContext';

import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'

export default function AnimalPage() {
  const { propertyInfo } = useContext(AuthContext);
  const [animals, setAnimals] = useState([]);
  const [updateScreenIsOpen, setUpdateScreenIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchField, setSearchField] = useState("")
  const [animalId, setAnimalId] = useState("")


    const fetchAnimals = async () => {
      if (!propertyInfo?._id) {
          Alert.alert("Erro", "Nenhum collar selecionada.");
          return;
      }
      
      try {
          setIsLoading(true);
          const foundAnimals = await findAnimals(propertyInfo._id);
          setAnimals(foundAnimals);
      } catch (error) {
          console.error("Erro ao buscar animais:", error);
          Alert.alert("Erro", error.error || "Não foi possível carregar as animaiss.");
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
          const foundAnimals = await searchCollarByName(propertyInfo._id, text);
          // console.log(foundCollars)
          setAnimals(foundAnimals);
      } catch (error) {
          console.error("Erro ao buscar cercas por nome:", error);
          Alert.alert("Erro", error.error || "Não foi possível carregar as cercas.");
      } finally {
          setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchAnimals();
    }, []);

  return (
    <View style={style.container}>
      <View style={style.content}>
        <View style={style.collar}>
          <Text style={style.titleCollar}>Animais</Text>
          <SearchBar
            onChangeText={setSearchField}
            searchFunction={fetchSearch}
            value={searchField}
            placeholder="Pesquisar animais"/>    

          {animals.length > 0 ? (
            <FlatList
            data={animals}
            keyExtractor={(item) => item._id} 
            initialNumToRender={5}
            windowSize={10}   
            removeClippedSubviews={true} 
            renderItem={({ item }) => (
              <View style={style.listCollar}>
                <AnimalCard
                  onPress={() => {setAnimalId(item._id); setUpdateScreenIsOpen(true)}}
                  name={item.name}
                  identifier={item.identifier}
                  fence={item.collar && item.collar.fence_id.name || "Nenhum"}
                  collar={item.collar &&  item.collar.name_collar || "Nenhum"}
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

      {
        updateScreenIsOpen &&
          <CreateAnimal
          animalIdSelect={animalId}
          reload={fetchAnimals}
          closedScreenProp={() => setUpdateScreenIsOpen(false)}
          type={"Update"}
        />
      }
      <CreateAnimal
        reload={fetchAnimals}
      />
    </View>
  );
}

import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { AuthContext } from '../../context/AuthContext';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { useState, useRef, useEffect, useContext } from "react";
import style from './Style'
import { MaterialIcons } from '@expo/vector-icons'
import AddIcon from '../../assets/icons/add.png'
import Input from "../input/input";
import InputSelect from "../input-select/input-select";
import Button from '../button/button'
import TopNavigation from '../top-navigation/topNavigation';
import { themes } from '../../global/themes'
import { registerFence } from "../../services/fenceService";
import AlertCustom from '../alert/Alert';
import BottomSheet from '../bottom-sheet/bottomSheet';
import MarkerSelectIcon from '../../assets/icons/markerSelect.png'
import Aim from '../../assets/icons/aim.png'

export default function CreateVirtualFence({ reload, type = "Create", closedScreenProp, SetCoordinates, lastCoordinates }) {

  const { propertyInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [createScreen, SetCreateScreen] = useState(false);
  const [points, setPoints] = useState([]);
  const [region, setRegion] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  const [success, setSuccess] = useState(false);
  const mapRef = useRef(null);
  const [nameFence, SetNameFence] = useState("");
  const [fieldInvalid, setFieldInvalid] = useState("");



  const handleUpdate = async () => {
    if (points.length < 3) {
      console.log("Adicione pelo menos 3 pontos")
      setFieldInvalid("fenceInvalid")
      return;
    }
    SetCoordinates(points);
    closedScreenProp()
  }

  const handleRegister = async () => {
    if (nameFence.length < 1) {
      console.log("Preencha o campo nome da cerca!")
      setFieldInvalid("nameInvalid")
      return;
    }

    if (points.length < 3) {
      console.log("Adicione pelo menos 3 pontos")
      setFieldInvalid("fenceInvalid")
      return;
    }

    try {
      setIsLoading(true);
      await registerFence(propertyInfo._id, true, nameFence, points);
      await reload();
      setFieldInvalid("")
      setSuccess(true)
      SetNameFence("");
      setPoints([]);
      setRegion(null);
      setIsLoading(false);

    } catch (err) {
      console.log("Erro ao cadastrar:", err.response?.data || err.message);
      alert(`Erro ao cadastrar: ${err.response?.data?.error || err.message}`);

      if (err.response) {
        console.log("Erro do servidor:", err.response.data);
        Alert.alert("Erro", err.response.data.error || "Erro no servidor.");
      }

    }
    SetNameFence("");
    setPoints([]);
    setRegion(null);
    setIsLoading(false);

    return;
  };


  const handleAddPoint = () => {
    if (region) {
      const center = {
        latitude: region.latitude,
        longitude: region.longitude,
      };
      setPoints([...points, center]);
      console.log("Ponto adicionado:", center);
    }
  };

  const handleRemoveLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    }
  };

  //função alternativa para salvar a mira
  const updateRegion = async () => {
    if (mapRef.current) {
      const camera = await mapRef.current.getCamera();
      setRegion({
        latitude: camera.center.latitude,
        longitude: camera.center.longitude,
        latitudeDelta: camera.zoom / 10,
        longitudeDelta: camera.zoom / 10,
      });
      console.log("Região atualizada:", camera.center);
    }
  };
  //executa a função que salva mira somente quando a tela esta aberta e se já foi adicionado um ponto
  useEffect(() => {
    let interval = null
    if (points.length > 0) {
      interval = setInterval(() => {
        updateRegion();
      }, 470);
    }
    return () => clearInterval(interval); // limpa o intervalo ao desmontar
  }, [createScreen, points]);

  return (
    <>
      {type == "Create" ?
        <TouchableOpacity
          onPress={() => {
            createScreen ? SetCreateScreen(false) :
              SetCreateScreen(true); SetNameFence("");
            setPoints([]);
            setRegion(null);
            setIsLoading(false);
            setFieldInvalid("")
          }}
          style={style.CreateButton}>
          <Image
            source={AddIcon}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        : null
      }


      <View style={[style.FullyScreen, { display: createScreen ? "block" : type == "Update" ? "flex" : "none" }]}>

        <View style={style.CreateScreen}>

          <View style={style.topNavigation}>
            <TopNavigation
              text={"Criar cerca"}
              onPress={() => { createScreen ? SetCreateScreen(false) : SetCreateScreen(true), setPoints([]), closedScreenProp && closedScreenProp() }}
            />
          </View>




          <View style={style.mapCreateFence} >
            <MapView
              mapType="satellite"
              ref={mapRef}
              style={style.map}
              region={{
                latitude: lastCoordinates && lastCoordinates.length > 0 ? parseFloat(lastCoordinates[0].latitude) : -23.524034697030338,   //Etec Zona Leste
                longitude: lastCoordinates && lastCoordinates.length > 0 ? parseFloat(lastCoordinates[0].longitude) : -46.476110874399346,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              //Função responsavel por determinar o centro da mira, que corrige a posiçao da linha
              //A primeira atualiza em tempo real, entretanto trava muito o mapinha
              //a segunda função só atualiza a posição quando o usuario para de mexer o mapa e tira o dedo do mapa
              //A terceira opção é uma função onde é capturada a posição manualmente, mas é possivel controlar o tempo
              // onRegionChange={(reg) => setRegion(reg)} //Trava muito
              onRegionChangeComplete={(reg) => setRegion(reg)} //Trava nada, mas a linha fica lenta
            >

              {/* Linha temporária do último ponto até o centro da mira */}
              {points.length > 0 && region && (
                <Polyline
                  coordinates={[
                    points[points.length - 1], // último ponto salvo
                    {
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }, // centro atual do mapa
                  ]}
                  strokeColor={themes.colors.greenGray}
                  strokeWidth={1.4}

                />
              )}

              {/* Polígono fechado se houver pelo menos 3 pontos e a cerca estiver fechada */}
              {/* isClosed && caso eu mude de ideia */}
              {points.length >= 3 && (
                <Polygon
                  coordinates={[...points, points[0]]}
                  strokeColor={themes.colors.green}
                  fillColor="rgba(0, 82, 11, 0.3)"
                  strokeWidth={2}
                />
              )}

              {lastCoordinates ? (
                <Polygon
                  coordinates={lastCoordinates.map(coord => ({
                    latitude: parseFloat(coord.latitude),
                    longitude: parseFloat(coord.longitude)
                  }))}
                  strokeColor={"rgba(0, 150, 0, 0.6)"}    // verde mais claro e translúcido
                  fillColor={"rgba(0, 100, 0, 0.1)"}      // preenchimento suave
                  strokeWidth={2}
                  lineDashPattern={[15, 5]}
                />
              ) : null}

              {points.map((point, index) => (
                <Marker
                  anchor={{ x: 0.5, y: 0.5 }}
                  image={MarkerSelectIcon}
                  key={index}
                  coordinate={point}
                  title={`Ponto ${index + 1}`}
                  description={`Lat: ${point.latitude}, Lng: ${point.longitude}`}
                ></Marker>
              )
              )}

              {/* Linha conectando todos os pontos já adicionados */}
              {points.length >= 2 && (
                <Polyline
                  coordinates={isClosed ? [...points, points[0]] : points}
                  strokeColor={themes.colors.green}
                  strokeWidth={2}
                />
              )}
            </MapView>

            <View style={style.crosshair}>
              <Text style={{ fontSize: 28, color: "red" }}>
                <Image
                  source={Aim}
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                >

                </Image>
              </Text>
            </View>

            <BottomSheet
              snapPointsMax={type == "Update" ? "34%" : "40%"}
              snapPointsMin={type == "Update" ? "34" : "20%"}


            >
              <View style={style.headerButtons}>
                <Text style={style.textTitleButtons}>{type == "Update" ? "Atualizando Cerca virtual" : " Criando cerca virtual"}   </Text>
                <TouchableOpacity onPress={handleRemoveLastPoint} style={style.buttonRedo}>
                  <Image source={require('../../assets/icons/redo.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
              </View>
              <View style={style.comboButtons}>

                <View style={style.viewButtons}>
                  <Button typeButton={"Shadow"} onPress={handleAddPoint} texto="Adicionar ponto" />
                </View>

                {/* <View style={style.viewButtons}>
            <Button typeButton={"Shadow"} onPress={() => setIsClosed(!isClosed)} texto="Fechar Forma" />
          </View> */}

              </View>
              {type != "Update" &&
                <Input
                  value={nameFence}
                  onChangeText={SetNameFence}
                  placeholder={"Nome da cerca"}
                />
              }

              {fieldInvalid == "nameInvalid" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  Preencha o nome da cerca!
                </Text>
              ) : fieldInvalid == "fenceInvalid" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  Marque no minimo 3 pontos no mapa!
                </Text>
              ) : ""}


              {type == "Update" &&
                <Button onPress={handleUpdate} texto={isLoading ? (<ActivityIndicator size="30" color="#fff" />) : ("Confirmar")} />
              }

              {type != "Update" &&
                <Button onPress={handleRegister} texto={isLoading ? (<ActivityIndicator size="30" color="#fff" />) : ("Cadastrar")} />
              }

            </BottomSheet>

          </View>
        </View>

        {success && (
          <AlertCustom
            type={"Success"}
            title={"Sucesso!"}
            message={"Cerca criada com sucessso!"}
            onPress={() => { setSuccess(false), SetCreateScreen(false); }}
          />
        )}
      </View>
    </>
  )
}


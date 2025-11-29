import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import axios from 'axios';
import style from './style';
import PairCentral from '../../components/pair-central/PairCentral.jsx';
import { AuthContext } from '../../context/AuthContext';
import CollarMarker from '../../components/collar-marker/CollarMarker.jsx'
import CollarMarkerImg from '../../assets/icons/markerCollar.png'
import CollarMarkerAlert from '../../assets/icons/markerCollarAlert.png'
import { themes } from '../../global/themes.js';
import AlertCustom from '../../components/alert/Alert.jsx'
import Notifications from '../../components/notifications/notifications.jsx';

import OxIcon from '../../assets/icons/oxIcon.png';
import CollarIcon from '../../assets/icons/collarCartoonIcon.png';
import { findAnimalById } from "../../services/animalService.js";
import { findCollar } from "../../services/collarService.js";
import { findAlerts } from '../../services/alertService';
import { findFence } from "../../services/fenceService";

import BottomSheet from '../../components/bottom-sheet/bottomSheet';

export default function MapaMultiplosMarcadores() {
  const { propertyInfo } = useContext(AuthContext);
  const [fences, setFences] = useState([]);
  const [posicoes, setPosicoes] = useState([]);
  const [historico, setHistorico] = useState({});
  const [animalInfo, setAnimalInfo] = useState(null);
  const [collarInfo, setCollarInfo] = useState(null);
  const [alert, SetAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertsEscapes, setAlertsEscapes] = useState([])
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false)
  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);

  const fetchFences = async () => {
        // Garante que temos um ID de propriedade antes de fazer a chamada
        if (!propertyInfo?._id) {
            return;
        }
        try {
            setIsLoading(true);
            const foundFences = await findFence(propertyInfo._id);
            // console.log(foundFences)
            setFences(foundFences);
        } catch (error) {
            console.error("Erro ao buscar cercas:", error);
        } finally {
            setIsLoading(false);
        }
    };

  const clickMarker = (markerId) => {
    const marker = posicoes.find(pos => pos.id === markerId);
    if (marker) {
      ChangeMarket(
        marker.animal_id,
        marker.name_collar,
        marker._id,
        marker.id,
        marker.battery,
        marker.rssi
      );

      mapRef.current?.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);

      setBottomSheetIsOpen(true);
    }
  };

  const ChangeMarket = async (animalId, name_collar, collarId, id, baterry, rssi) => {

    try {
      setIsLoading(true);
      bottomSheetRef.current?.expand()

      const foundAnimals = await findAnimalById(animalId);
      setAnimalInfo(foundAnimals);

      setCollarInfo({
        _id: id,
        name_collar: name_collar,
        collarId: collarId,
        baterry: baterry,
        rssi: rssi,
      });
      if (animalInfo) {
        console.log(animalInfo)
      }
      if (collarInfo) {
        console.log(collarInfo)
      }
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      Alert.alert("Erro", error.error || "Não foi possível carregar as animais.");
    }
    finally {
      setIsLoading(false);
    }


  }

  const fetchColler = async () => {
    try {
      const response = await findCollar(propertyInfo._id);
      const data = response;

      // Extrai última posição e histórico de cada coleira
      const novasPosicoes = data
        .filter(item => item.location && item.location.length > 0)
        .map(item => {
          const ultimaPos = item.location[item.location.length - 1];
          return {
            id: String(item._id),
            latitude: parseFloat(ultimaPos.latitude),
            longitude: parseFloat(ultimaPos.longitude),
            historico: item.location.map(loc => ({
              latitude: parseFloat(loc.latitude),
              longitude: parseFloat(loc.longitude),
            })),
            name_collar: item.name_collar,
            battery: item.battery,
            rssi: item.rssi,
            animal_id: item.animal_id,
            alert: item.resolved,
          };
        });

      // Atualiza marcadores
      setPosicoes(novasPosicoes);

      // Atualiza histórico
      const novoHistorico = {};
      novasPosicoes.forEach(pos => {
        novoHistorico[pos.id] = pos.historico;
      });
      setHistorico(novoHistorico);
    } catch (error) {
      console.log('Erro ao buscar posições:', error);
    }
  };

  const fetchAlerts = async () => {
    if (!propertyInfo?._id) {
      return;
    }
    try {
      setIsLoading(true);
      const foundAlerts = await findAlerts(propertyInfo._id);
      if (!foundAlerts[foundAlerts.length - 1].resolved) {
        SetAlert(true)
      }
      setAlertsEscapes(foundAlerts);
      SetAlert
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColler();
    fetchAlerts();
    const interval = setInterval(fetchColler, 5000);
    return () => clearInterval(interval);
  }, []);

       useEffect(() => {
        fetchFences();
    }, [propertyInfo]);

  useEffect(() => {
    console.log(propertyInfo);
  }, []);
  return (
    <View style={estilos.container}>
      <MapView
        ref={mapRef}
        mapType="satellite"
        onPress={() => bottomSheetRef.current?.close()}
        style={estilos.map}
        initialRegion={{
          latitude: posicoes[0]?.latitude || -23.52265,
          longitude: posicoes[0]?.longitude || -46.4758,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        
        {posicoes.map(pos => (
          <Marker
            key={pos.id}
            image={!pos.alert ? CollarMarkerAlert : pos.alert ? CollarMarkerImg : CollarMarkerImg}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{ latitude: pos.latitude, longitude: pos.longitude }}
            title={`Coleira ${pos.name_collar}`}
            description={`Sinal: ${pos.rssi >= -60 ? (
                "Exelente"
              ) :
                pos.rssi >= -80 ? (
                  "Exelente"
                ) :
                  pos.rssi >= -100 ? (
                    "Exelente"
                  ) :
                    pos.rssi >= -120 && (
                      "Exelente"
                    )
              } | Bateria: ${pos.battery}%`}
            onPress={() => { ChangeMarket(pos.animal_id, pos.name_collar, pos._id, pos.id, pos.battery, pos.rssi); setBottomSheetIsOpen(true) }}
          >

            {/* Quando esse trecho esta aqui acontece esse bug */}
            {/* {pos && !pos.alert ? (
              <CollarMarker />
            ) : null
            } */}

          </Marker>
        ))}

        {Object.entries(historico).map(([id, coords]) => (
          <Polyline
            key={`polyline-${id}`}
            coordinates={coords}
            strokeColor={themes.colors.greenGray}
            strokeWidth={3}
          />
        ))}

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

      {bottomSheetIsOpen ? (
        <BottomSheet
          refBottomSheet={bottomSheetRef}
          snapPointsMax={"40%"}
          snapPointsMin={"26%"}
        >

          <View style={style.cardAnimal}>
            <View style={style.infoAnimal}>
              <Image
                style={style.OxIcon}
                source={OxIcon}
              >
              </Image>
              <View>
                <Text style={style.titleCard}>
                  Informação do animal
                </Text>
                <View style={style.table}>
                  <View style={style.colunm1}>
                    <Text style={style.textColunm1}>
                      Nome do animal:
                    </Text>
                    <Text style={style.textColunm1}>
                      ID do animal:
                    </Text>

                    <Text style={style.textColunm1}>
                      Km percorrido:
                    </Text>
                  </View>
                  <View style={style.colunm2}>
                    <Text style={style.textColunm2}>
                      {animalInfo ? animalInfo.animal.name : "Undefined"}
                    </Text>
                    <Text style={style.textColunm2}>
                      {animalInfo ? animalInfo.animal.identifier : "Undefined"}
                    </Text>

                    <Text style={style.textColunm2}>
                      6Km
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

          <View style={style.cardCollar}>
            <View style={style.infoCollar}>
              <Image
                style={style.CollarIcon}
                source={CollarIcon}
              >
              </Image>
              <View>
                <Text style={style.titleCard}>
                  Informação da coleira
                </Text>
                <View style={style.table}>
                  <View style={style.colunm1}>
                    <Text style={style.textColunm1}>
                      Nome da coleira:
                    </Text>
                    <Text style={style.textColunm1}>
                      Bateria:
                    </Text>
                    <Text style={style.textColunm1}>
                      Qualidade do sinal:
                    </Text>
                    {/* <Text style={style.textColunm1}>
                Ultima localização:
                </Text> */}
                  </View>
                  <View style={style.colunm2}>
                    <Text style={style.textColunm2}>
                      {animalInfo ? collarInfo.name_collar : "Undefined"}
                    </Text>
                    <Text style={style.textColunm2}>
                      {animalInfo ? collarInfo.baterry + "%" : "Undefined"}
                    </Text>
                    <Text style={style.textColunm2}>
                      {animalInfo ? (
                        collarInfo.rssi >= -60 ? (
                          "Exelente"
                        ) :
                          collarInfo.rssi >= -80 ? (
                            "Bom"
                          ) :
                            collarInfo.rssi >= -100 ? (
                              "Médio"
                            ) :
                              collarInfo.rssi >= -120 && (
                                "Ruim"
                              )
                      ) : "Undefined"}
                    </Text>
                    {/* <Text style={style.textColunm2}>
                16:44
                </Text> */}
                  </View>
                </View>
              </View>

            </View>

          </View>

        </BottomSheet>
      ) : ""}
      <Notifications
        clickMarker={clickMarker}
      />

      {alert && (
        <AlertCustom
          type={"Error"}
          title={"Fuga detectada!"}
          message={"O Animal '" + alertsEscapes[alertsEscapes.length - 1].name_animal + "' saiu do perímetro delimitado "}
          onPress={() => { clickMarker(alertsEscapes[alertsEscapes.length - 1].collar_id) }}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

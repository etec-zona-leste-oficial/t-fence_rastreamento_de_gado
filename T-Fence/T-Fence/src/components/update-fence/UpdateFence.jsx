import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { useState, useContext, useEffect } from "react";
import style from './Style'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthContext } from '../../context/AuthContext';
import VirtualFenceCard from '../../components/create-virtualfence/CreateVirtualFence'
import AddIcon from '../../assets/icons/add.png'
import Input from "../input/input";
import InputSelect from "../input-select/input-select";
import { themes } from '../../global/themes'
import Button from '../button/button'
import { findAnimals } from "../../services/animalService";
import { findFence } from "../../services/fenceService";
import { registerCollar, collarDelete, findCollarById, updateInfo } from "../../services/collarService";
import { findFenceById, updateFence, deleteFence } from '../../services/fenceService';
import AlertCustom from '../alert/Alert';

export default function updateFenceScreen({ reload, type = "Create", closedScreenProp, fenceIdSelect }) {
  const { propertyInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [animalId, setAnimalId] = useState(null);
  const [fence_id, setFenceId] = useState(null);
  const [equalFields, SetEqualFields] = useState(false);
  const [mec, setImec] = useState("");
  const [errorName, SetErrorName] = useState(null);
  const [errorMec, setErrorMec] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastCoordinates, setLastCoordinates] = useState([]);
  const [nameFence, SetNameFence] = useState("");
  const [coordinates, SetCoordinates] = useState([]);
  const [lastFence, setLastCollar] = useState("");
  const [createScreen, SetCreateScreen] = useState(true);
  const [success, SetSuccess] = useState(false);
  const [successDelete, SetSuccessDelete] = useState(false);
  const [error, SetError] = useState(false);
  const [foundAnimals, SetFoundAnimals] = useState([]);
  const [foundFence, setFoundFence] = useState([]);
  const [foundCollar, setFoundcollar] = useState([]);
  const [changeFencescreen, setChangeFencescreen] = useState(false);
  const [confirmationUpdate, SetConfirmationUpdate] = useState(false);
  const [confirmationDelete, SetConfirmationDelete] = useState(false);

  const fetchFenceById = async () => {
    if (!fenceIdSelect) {
      return;
    }
    try {
      setIsLoading(true);
      const fence = await findFenceById(fenceIdSelect);
      setFoundFence(fence);
      setLastName(fence.name);
      setLastCoordinates(fence.coordinates);
    } catch (error) {
      console.error("Erro ao buscar cerca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (!propertyInfo?._id) {
      setIsLoading(false);
      return;
    }
    if (nameFence.length <= 0) {
      setIsLoading(false);
      SetErrorName(true);
      return;
    }
    setErrorMec(false);
    SetErrorName(false);

    try {
      console.log(coordinates)
      const collar = await updateFence(foundFence._id, nameFence, coordinates);
      SetError(false);
      SetSuccess(true);
    } catch (error) {
      SetSuccess(false);
      SetError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    if (!propertyInfo?._id) {
      setIsLoadingDelete(false);
      return;
    }

    setErrorMec(false);
    SetErrorName(false);
    try {
      const fence = await deleteFence(foundFence._id);
      SetError(false);
      SetSuccess(true);
      SetSuccessDelete(true);
    } catch (error) {
      SetSuccess(false);
      SetSuccessDelete(false);
      SetError(true);
      console.log("Erro ao deleter coleira:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const VerifyEqualFields = () => {
    if (nameFence === lastName && coordinates === lastCoordinates) {
      SetEqualFields(true)
    } else {
      SetEqualFields(false);
    }

  }

  useEffect(() => {
    VerifyEqualFields()
  }, [fence_id, coordinates, nameFence]);

  const clearInput = () => {
    setImec("");
    SetNameFence("");
    setFenceId(null);
    setAnimalId(null);
    setErrorMec(false);
    SetErrorName(false);
  }

  useEffect(() => {
    if (fenceIdSelect) {
      fetchFenceById();
    }
  }, [fenceIdSelect]);

  useEffect(() => {
    if (foundFence) {
      SetNameFence(foundFence.name || "");
      SetCoordinates(foundFence.coordinates);
    }
  }, [foundFence]);
  return (
    <>

      <View style={[style.FullyScreen, { display: "flex" }]}>

        {!success && !error ? (
          <View style={style.CreateScreen}>

            <Text style={style.titleScreen}>
              Informações da cerca
            </Text>

            <View style={style.containerMap}>
              <MapView
                mapType="satellite"
                style={style.map}
                region={{
                  latitude: foundFence.coordinates && foundFence.coordinates.length > 0 ? parseFloat(foundFence.coordinates[0].latitude) : -23.524034697030338,   //Etec Zona Leste
                  longitude: foundFence.coordinates && foundFence.coordinates.length > 0 ? parseFloat(foundFence.coordinates[0].longitude) : -46.476110874399346,
                  latitudeDelta: 0.02,   // zoom no eixo vertical
                  longitudeDelta: 0.02,  // zoom no eixo horizontal
                }}
              >
                {coordinates ? (
                  <Polygon
                    coordinates={coordinates.map(coord => ({
                      latitude: parseFloat(coord.latitude),
                      longitude: parseFloat(coord.longitude)
                    }))}

                    strokeColor={themes.colors.green}
                    fillColor={"rgba(0, 82, 11, 0.3)"}
                    strokeWidth={2}
                  />
                ) : null}

                {lastCoordinates && coordinates && lastCoordinates != coordinates ? (
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

              </MapView>

            </View>

            <Button
              disabled={isLoading}
              onPress={() => { setChangeFencescreen(true) }}
              texto={"Redefinir área"}
            />

            <View style={style.ComboInput} >
              <Input
                keyboardType="text"
                onChangeText={SetNameFence}
                value={nameFence}
                Propwidth={"100%"}
                placeholder={'Nome da cerca'}
              />



              <View style={style.buttons}>

              </View>
              {errorName &&
                <Text style={{ color: 'red', marginBottom: 10 }}>Preencha o campo "Nome da cerca".</Text>
              }
              {errorMec &&
                <Text style={{ color: 'red', marginBottom: 10 }}>IMEC da coleira inválido, deve conter 17 caracteres, digite novamente! </Text>
              }
              <Button
                disabled={isLoading || equalFields ? true : false}
                onPress={() => { SetConfirmationUpdate(true) }}
                texto={"Salvar alterações"}
              />

              <Button
                disabled={isLoadingDelete ? true : false}
                onPress={() => { SetConfirmationDelete(true) }}
                texto={isLoadingDelete ? (<ActivityIndicator size="30" color="#fff" />) : "Deletar"}
              />

              <Button
                disabled={isLoading ? true : false}
                onPress={() => { SetCreateScreen(false), clearInput(), reload(), closedScreenProp && closedScreenProp() }}
                texto={"Cancelar"}
                typeButton={"Shadow"}
              />
            </View>
          </View>
        ) : null}

        {error && (
          <AlertCustom
            type={"Error"}
            title={"Ocorreu um erro"}
            message={type == "Create" ? "Erro ao cadastrar a coleira, tente novamente." : "Erro ao atualizar a coleira, tente novamente."}
            onPress={() => { SetCreateScreen(false), clearInput(), SetError(false), closedScreenProp && closedScreenProp() }}
          />)
        }
        {success && (
          <AlertCustom
            type={"Success"}
            title={"Sucesso!"}
            message={!successDelete ? "A cerca foi atualizada com sucesso." : "A cerca foi deletada com sucesso."}
            onPress={() => { SetCreateScreen(false), clearInput(), SetSuccess(false), SetSuccessDelete(false), reload(), closedScreenProp && closedScreenProp() }}
          />
        )}

        {confirmationUpdate && (
          <AlertCustom
            type={"Confirmation"}
            title={"Tem certeza?"}
            message={"Você tem certeza que deseja atualizar essa cerca?"}
            OnPressAccepted={() => { console.log("Acepted"), handleUpdate(), SetConfirmationUpdate(false) }}
            OnPressDenied={() => { console.log("Denied"), SetConfirmationUpdate(false) }}
          />
        )}

        {confirmationDelete && (
          <AlertCustom
            type={"Confirmation"}
            title={"Tem certeza?"}
            message={"Você tem certeza que deseja deletar essa cerca? essa ação não pode ser desfeita!"}
            OnPressAccepted={() => { console.log("Acepted"), handleDelete(), SetConfirmationDelete(false) }}
            OnPressDenied={() => { console.log("Denied"), SetConfirmationDelete(false) }}
          />
        )}


      </View>

      {changeFencescreen &&
        <VirtualFenceCard
          closedScreenProp={() => { setChangeFencescreen(false) }}
          SetCoordinates={SetCoordinates}
          lastCoordinates={lastCoordinates}
          type='Update'
        />
      }
    </>
  )
}
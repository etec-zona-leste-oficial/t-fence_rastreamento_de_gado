import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useState, useContext, useEffect } from "react";
import style from './Style'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '../../assets/icons/add.png'
import Input from "../input/input";
import InputSelect from "../input-select/input-select";
import Button from '../button/button'
import { findAnimals } from "../../services/animalService";
import { findFence } from "../../services/fenceService";
import { registerCollar, collarDelete, findCollarById, updateInfo } from "../../services/collarService";
import AlertCustom from '../alert/Alert';

export default function createCollar({ reload, type = "Create", closedScreenProp, collarIdSelect }) {
  const { propertyInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [animalId, setAnimalId] = useState(null);
  const [fence_id, setFenceId] = useState(null);
  const [equalFields, SetEqualFields] = useState(false);
  const [name_collar, SetAnimalName] = useState("");
  const [mec, setImec] = useState("");
  const [errorName, SetErrorName] = useState(null);
  const [errorMec, setErrorMec] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastAnimal, setLastAnimal] = useState("");
  const [lastFence, setLastCollar] = useState("");
  const [createScreen, SetCreateScreen] = useState(false);
  const [success, SetSuccess] = useState(false);
  const [successDelete, SetSuccessDelete] = useState(false);
  const [error, SetError] = useState(false);
  const [foundAnimals, SetFoundAnimals] = useState([]);
  const [foundFences, setFoundFences] = useState([]);
  const [foundCollar, setFoundcollar] = useState([]);
  const [confirmationUpdate, SetConfirmationUpdate] = useState(false);
  const [confirmationDelete, SetConfirmationDelete] = useState(false);

  const defaultOption1 = { label: "Vincular Animal", value: null };
  const animalOptions = foundAnimals
    .filter(animal => {
      if (animal.collar === null) {
        return true;
      }
      if (type === "Update" && foundCollar && animal._id === foundCollar.animal_id) {
        return true;
      }
      return false;
    })
    .map(animal => {
      return {
        label: animal.name,
        value: animal._id
      };
    });
  const options1 = [defaultOption1, ...animalOptions];

  const defaultOption2 = { label: "Vincular Cerca", value: null };
  const animalOptions2 = foundFences.map(fence => {
    return {
      label: fence.name,
      value: fence._id
    };
  });
  const options2 = [defaultOption2, ...animalOptions2];

  const fetchAnimals = async () => {
    if (!propertyInfo?._id) {
      return;
    }
    try {
      const foundAnimals = await findAnimals(propertyInfo._id);
      SetFoundAnimals(foundAnimals);
    } catch (error) {
    }
  };

  const fetchFences = async () => {
    if (!propertyInfo?._id) {
      return;
    }
    try {
      const foundFences = await findFence(propertyInfo._id);
      setFoundFences(foundFences);
    } catch (error) {
      console.error("Erro ao buscar cercas:", error);
    }
  };

  const fetchCollarById = async () => {
    if (!collarIdSelect) {
      return;
    }
    try {
      setIsLoading(true);
      const collarFence = await findCollarById(collarIdSelect);
      console.log(collarFence.name_collar);
      console.log(collarFence.animal_id);
      console.log(collarFence.fence_id);
      setLastName(collarFence.name_collar);
      setLastAnimal(collarFence.animal_id);
      setLastCollar(collarFence.fence_id);
      setFoundcollar(collarFence);
    } catch (error) {
      console.error("Erro ao buscar cerca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    if (!propertyInfo?._id) {
      setIsLoading(false);
      return;
    }
    if (name_collar.length <= 0) {
      setIsLoading(false);
      setErrorMec(false);
      SetErrorName(true);
      return;
    }
    // if (mec.length !== 17) {
    //   setIsLoading(false);
    //   SetErrorName(false);
    //   setErrorMec(true);
    //   return;
    // }
    setErrorMec(false);
    SetErrorName(false);
    try {
      const collar = await registerCollar(mec, name_collar, fence_id, propertyInfo._id, animalId);
      SetError(false);
      SetSuccess(true);
    } catch (error) {
      SetSuccess(false);
      SetError(true);
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
    if (name_collar.length <= 0) {
      setIsLoading(false);
      setErrorMec(false);
      SetErrorName(true);
      return;
    }
    // if (mec.length !== 17) {
    //   setIsLoading(false);
    //   SetErrorName(false);
    //   setErrorMec(true);
    //   return;
    // }
    setErrorMec(false);
    SetErrorName(false);

    try {
      const collar = await updateInfo(foundCollar._id, name_collar, animalId, fence_id);
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
      const collar = await collarDelete(foundCollar._id);
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
    if (fence_id === lastFence && name_collar === lastName && animalId === lastAnimal) {
      SetEqualFields(true)
    } else {
      SetEqualFields(false);
    }

  }

  useEffect(() => {
    VerifyEqualFields()
  }, [fence_id, animalId, name_collar]);

  const clearInput = () => {
    setImec("");
    SetAnimalName("");
    setFenceId(null);
    setAnimalId(null);
    setErrorMec(false);
    SetErrorName(false);
  }

  useEffect(() => {
    fetchAnimals();
    fetchFences();
  }, [createScreen]);

  useEffect(() => {
    if (collarIdSelect) {
      fetchCollarById();
    }
  }, [collarIdSelect]);

  useEffect(() => {
    if (foundCollar) {
      SetAnimalName(foundCollar.name_collar || "");
      setImec(foundCollar.mec || "");
      setFenceId(foundCollar.fence_id || null);
      setAnimalId(foundCollar.animal_id || null);
    }
  }, [foundCollar]);
  return (
    <>
      {type == "Create" && (
        <TouchableOpacity onPress={() => { createScreen ? SetCreateScreen(false) : SetCreateScreen(true) }} style={style.CreateButton}>
          <Image
            source={AddIcon}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      )}



      <View style={[style.FullyScreen, { display: type !== "Create" || (createScreen && type === "Create") ? "flex" : "none", }]}>

        {!success && !error ? (
          <View style={style.CreateScreen}>

            <Text style={style.titleScreen}>
              {type == "Create" ? "Cadastrar Coleira" : "Atualizar Coleira"}
            </Text>

            <View style={style.ComboInput} >
              <Input
                keyboardType="text"
                onChangeText={SetAnimalName}
                value={name_collar}
                Propwidth={"100%"}
                placeholder={'Nome da Coleira'}
              />

              <Input
                keyboardType="text"
                onChangeText={setImec}
                value={mec}
                Propwidth={"100%"}
                placeholder={'IMEC da Coleira (Escrito na Coleira)'}
                editable={type === "Create" ? false : true}
              />

              <InputSelect
                Propwidth={'100%'}
                options={options1}
                select={animalId}
                SetSelect={setAnimalId}
                title={"UF"}
              />

              <InputSelect
                Propwidth={'100%'}
                options={options2}
                select={fence_id}
                SetSelect={setFenceId}
                title={"UF"}
              />

              <View style={style.buttons}>

              </View>
              {errorName &&
                <Text style={{ color: 'red', marginBottom: 10 }}>Preencha o campo "Nome da Coleira".</Text>
              }
              {errorMec &&
                <Text style={{ color: 'red', marginBottom: 10 }}>IMEC da coleira inválido, deve conter 17 caracteres, digite novamente! </Text>
              }
              <Button
                disabled={isLoading || equalFields ? true : false}
                onPress={() => { type == "Create" ? handleRegister() : SetConfirmationUpdate(true) }}
                texto={isLoading ? (<ActivityIndicator size="30" color="#fff" />) : (type == "Create" ? "Cadastrar" : "Atualizar")}
              />
              {type == "Update" &&
                <Button
                  disabled={isLoadingDelete ? true : false}
                  onPress={() => { SetConfirmationDelete(true) }}
                  texto={isLoadingDelete ? (<ActivityIndicator size="30" color="#fff" />) : "Deletar"}
                />
              }
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
            message={type == "Create" ? "A coleira foi cadastrada com sucesso." : type == "Update" && !successDelete ? "A coleira foi atualizada com sucesso." : "A coleira foi deletada com sucesso."}
            onPress={() => { SetCreateScreen(false), clearInput(), SetSuccess(false), SetSuccessDelete(false), reload(), closedScreenProp && closedScreenProp() }}
          />
        )}

        {confirmationUpdate && (
          <AlertCustom
            type={"Confirmation"}
            title={"Tem certeza?"}
            message={"Você tem certeza que deseja atualizar essa coleira?"}
            OnPressAccepted={() => { console.log("Acepted"), handleUpdate(), SetConfirmationUpdate(false) }}
            OnPressDenied={() => { console.log("Denied"), SetConfirmationUpdate(false) }}
          />
        )}

        {confirmationDelete && (
          <AlertCustom
            type={"Confirmation"}
            title={"Tem certeza?"}
            message={"Você tem certeza que deseja atualizar essa coleira? essa ação não pode ser desfeita!"}
            OnPressAccepted={() => { console.log("Acepted"), handleDelete(), SetConfirmationDelete(false) }}
            OnPressDenied={() => { console.log("Denied"), SetConfirmationDelete(false) }}
          />
        )}

      </View>
    </>
  )
}
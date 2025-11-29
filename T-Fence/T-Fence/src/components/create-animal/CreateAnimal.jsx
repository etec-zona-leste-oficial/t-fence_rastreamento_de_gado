import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useState, useContext, useEffect } from "react";
import style from './Style'
import { MaterialIcons } from '@expo/vector-icons'
import AddIcon from '../../assets/icons/add.png'
import Input from "../input/input";
import InputSelect from "../input-select/input-select";
import Button from '../button/button'
import { registerAnimal } from '../../services/animalService'
import { AuthContext } from '../../context/AuthContext'
import AlertCustom from '../alert/Alert'
import { findAnimalById, updateInfo, animalDelete } from "../../services/animalService";

export default function createAnimal({ type = "Create", closedScreenProp, animalIdSelect, reload }) {
  const { propertyInfo } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastIdentifier, setLastIdentifier] = useState("");
  const [createScreen, SetCreateScreen] = useState(false);
  const [success, SetSuccess] = useState(false);
  const [confirmationUpdate, SetConfirmationUpdate] = useState(false);
  const [confirmationDelete, SetConfirmationDelete] = useState(false);
  const [error, SetError] = useState(false);
  const [validation, SetValidation] = useState(null);
  const [equalFields, SetEqualFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [successDelete, SetSuccessDelete] = useState(false);
  const [foundAnimal, setFoundAnimal] = useState([]);

  const handleRegister = async () => {
    SetError(false);
    SetSuccess(false);
    setIsLoading(true);

    // validação dos camposs
    if (!name.length > 0) {
      SetValidation("Preencha o nome do animal")
      setIsLoading(false);
      console.log("Invalido nome")
      return
    }

    if (!identifier.length > 0) {
      SetValidation("Preencha o identificador do animal")
      setIsLoading(false);
      console.log("Invalido identificador")
      return
    }
    SetValidation(null)

    if (!propertyInfo?._id) {
      console.log("Erro", "Nenhuma propriedade selecionada.");
      setIsLoading(false);
      return;
    }
    try {
      const collar = await registerAnimal(propertyInfo._id, name, identifier);
      SetError(false);
      SetSuccess(true);
      console.log(collar)
    } catch (error) {
      SetError(true);
      SetSuccess(false);
      console.log("Erro ao cadastrar coleira:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnimalById = async () => {
    if (!animalIdSelect) {
      return;
    }
    try {
      setIsLoading(true);
      const animal = await findAnimalById(animalIdSelect);
      setLastIdentifier(animal.animal.identifier);
      setLastName(animal.animal.name);
      setFoundAnimal(animal);

    } catch (error) {
      console.error("Erro ao buscar animal:", error);
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
    console.log(lastIdentifier + "==" + identifier)
    if (lastIdentifier === identifier && lastName === name) {
      setIsLoading(false);
      SetEqualFields(true)
      console.log("Campos iguais");
      return
    }
    SetEqualFields(false)
    SetValidation(null)

    try {
      const animal = await updateInfo(foundAnimal.animal._id, name, identifier);
      SetError(false);
      SetSuccess(true);
    } catch (error) {
      SetSuccess(false);
      SetError(true);
      console.log("Erro ao Atualizar animal:", error);
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

    try {
      const animal = await animalDelete(foundAnimal.animal._id);
      SetError(false);
      SetSuccess(true);
      SetSuccessDelete(true);
      console.log(animal)
    } catch (error) {
      SetSuccess(false);
      SetSuccessDelete(false);
      SetError(true);
      console.log("Erro ao deleter animal:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const clearInput = () => {
    setName("");
    setIdentifier(null);
    SetValidation(null);
  }

  const VerifyEqualFields = () => {
    if (lastIdentifier === identifier && lastName === name) {
      SetEqualFields(true)
      console.log("Campos iguais");
    } else {
      SetEqualFields(false);
      console.log("Campos Liberados");
    }

  }

  useEffect(() => {
    if (animalIdSelect) {
      fetchAnimalById();
      if (lastIdentifier === identifier && lastName === name) {
        setIsLoading(false);
        SetEqualFields(true)
        console.log("Campos iguais");
        return
      }
      SetEqualFields(false)
    }
  }, [animalIdSelect]);


  useEffect(() => {
    if (foundAnimal?.animal?.name) {
      setName(foundAnimal.animal.name)
      setIdentifier(foundAnimal.animal.identifier)
    }
  }, [foundAnimal]);

  useEffect(() => {
    VerifyEqualFields()
  }, [name, identifier]);

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



      <View style={[style.FullyScreen, { display: type !== "Create" || (createScreen && type === "Create") ? "flex" : "none" }]}>
        {!success && !error ? (
          <View style={style.CreateScreen}>

            <Text style={style.titleScreen}>
              {type === "Create" ? "Cadastrar Animal" : "Atualizar Animal"}
            </Text>

            <View style={style.ComboInput} >
              <Input
                keyboardType="text"
                onChangeText={setName}
                value={name}
                Propwidth={"100%"}
                placeholder={'Nome do animal'}
              />

              <Input
                keyboardType="text"
                onChangeText={setIdentifier}
                value={identifier}
                Propwidth={"100%"}
                placeholder={'Identificador do animal'}
              />

              <View style={style.buttons}>
                {validation &&
                  <Text style={{ color: 'red', marginBottom: 10 }}>{validation}</Text>
                }

              </View>
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
                onPress={() => { SetCreateScreen(false), clearInput(), closedScreenProp && closedScreenProp(), reload() }}
                texto={"Cancelar"}
                typeButton={"Shadow"}
              />
            </View>


          </View>
        ) : null}
      </View>

      {error && (
        <AlertCustom
          type={"Error"}
          title={"Ocorreu um erro"}
          message={type == "Create" ? "Erro ao cadastrar o animal, tente novamente." : "Erro ao atualizar o animal, tente novamente."}
          onPress={() => { SetCreateScreen(false), clearInput(), SetError(false), reload(), closedScreenProp && closedScreenProp() }}
        />)
      }
      {success && (
        <AlertCustom
          type={"Success"}
          title={"Sucesso!"}
          message={type == "Create" ? "O animal foi cadastrada com sucesso." : type == "Update" && !successDelete ? "O animal foi atualizada com sucesso." : "O animal foi deletada com sucesso."}
          onPress={() => { SetCreateScreen(false), clearInput(), SetSuccess(false), SetSuccessDelete(false), reload(), closedScreenProp && closedScreenProp() }}
        />
      )}

      {confirmationUpdate && (
        <AlertCustom
          type={"Confirmation"}
          title={"Tem certeza?"}
          message={"Você tem certeza que deseja atualizar esse animal?"}
          OnPressAccepted={() => { console.log("Acepted"), handleUpdate(), SetConfirmationUpdate(false) }}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationUpdate(false) }}
        />
      )}

      {confirmationDelete && (
        <AlertCustom
          type={"Confirmation"}
          title={"Tem certeza?"}
          message={"Você tem certeza que deseja deletar esse animal? essa ação não pode ser desfeita!"}
          OnPressAccepted={() => { console.log("Acepted"), handleDelete(), SetConfirmationDelete(false) }}
          OnPressDenied={() => { console.log("Denied"), SetConfirmationDelete(false) }}
        />
      )}
    </>
  )
}


import apiClient from '../api/axiosConfig';

const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";

const API_URL = `${API_URL_Tfence}/animal`;

export const registerAnimal = async (property_id, name, identifier) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, { property_id, name, identifier });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao cadastrar Animal" };
  }
};

export const updateInfo = async (_id, name, identifier) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateInfo`, { _id, name, identifier });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao Atualizar a Animal" };
  }
};

export const animalDelete = async (animal_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/delete`, { animal_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao deletar o Animal" };
  }
};

export const findAnimalById = async (animal_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/getAnimalById`, { animal_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar Animal" };
  }
};

export const findAnimals = async (property_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/findAnimals`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar Animal" };
  }
};

export const findAnimalsNoCollars = async (property_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/findAnimalsNoCollars`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar animais sem coleiras" };
  }
};

export const searchCollarByName = async (property_id, name_animal) => {
  try {
    const response = await apiClient.post(`${API_URL}/searchCollarByName`, { property_id, name_animal });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar animais" };
  }
};
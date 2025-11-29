import apiClient from '../api/axiosConfig';

const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";
const API_URL = `${API_URL_Tfence}/collar`;

export const registerCollar = async (mec, name_collar, fence_id, property_id, animal_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, {mec, name_collar, fence_id, property_id, animal_id});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao cadastrar a Coleira" };
  }
};

export const collarDelete = async (collar_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/delete`, {collar_id});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao deletar a Coleira" };
  }
};

export const updateInfo = async (collar_id, name_collar, animal_id, fence_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateInfo`, {collar_id, name_collar, fence_id, animal_id});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao Atualizar a Coleira" };
  }
};

export const findCollar = async ( property_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/findCollar`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar coleiras" };
  }
};

export const findCollarById = async ( collar_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/findCollarById`, { collar_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar coleira por ID" };
  }
};

export const findAnimal = async ( animal_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/getAnimalById`, { animal_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar Animal" };
  }
};

export const searchCollarByName = async ( property_id, name_collar ) => {
  try {
    const response = await apiClient.post(`${API_URL}/searchCollarByName`, { property_id, name_collar });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar coleiras" };
  }
};
import apiClient from '../api/axiosConfig';

const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";
const API_URL = `${API_URL_Tfence}/fence`;

export const registerFence = async ( property_id, status, name, coordinates) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, {  property_id, status, name, coordinates });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao cadastrar cerca" };
  }
};

export const updateFence = async ( fence_id, name, coordinates) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateFence`, {  fence_id, name, coordinates });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar cerca" };
  }
};

export const deleteFence = async ( fence_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/deleteFence`, {  fence_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao deletar cerca" };
  }
};

export const findFence = async ( property_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/select`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar cerca" };
  }
};

export const findFenceById = async ( fence_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/findFenceById`, { fence_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar cerca por id" };
  }
};

export const searchFenceByName = async ( property_id, name ) => {
  try {
    const response = await apiClient.post(`${API_URL}/search`, { property_id, name });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar cerca" };
  }
};
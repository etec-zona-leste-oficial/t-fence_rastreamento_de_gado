import apiClient from '../api/axiosConfig';
const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";

const API_URL = `${API_URL_Tfence}/alert`;

export const findAlerts = async (property_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/findAlerts`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar alertas" };
  }
};

import apiClient from '../api/axiosConfig';

const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";
const API_URL = `${API_URL_Tfence}/central`;

export const verifyCentralPair = async (property_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/verifyCentralPair`, { property_id });
    return response.data;
  } catch (error) {
    console.log("Erro ao verificar central:", error);
    console.log("Mensagem:", error.message);
    console.log("Status:", error.response?.status); 
    console.log("Dados:", error.response?.data); 
    throw error.response?.data || { error: "Erro ao verifiacar central" };
  };
};


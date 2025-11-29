import apiClient from '../api/axiosConfig';

const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";

const API_URL = `${API_URL_Tfence}/users`;

export const registerUser = async (email, password, firstName, surname, notification_token, phoneNumber) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, { email, password, firstName, surname, notification_token, phoneNumber });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao cadastrar usuário" };
  }
};

export const loginUser = async (email, password, notificationToken) => {
  try {
    const response = await apiClient.post(`${API_URL}/login`, { email, password, notificationToken });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao fazer login" };
  };
};

export const verifyEmailExist = async (email) => {
  try {
    const response = await apiClient.post(`${API_URL}/verifyEmailExist`, { email });
    return response.data;
  } catch (error) {
    console.log("Erro ao verificar email:", error);
    console.log("Mensagem:", error.message);
    console.log("Status:", error.response?.status);
    console.log("Dados:", error.response?.data);
    throw error.response?.data || { error: "Erro ao verifiacar email" };
  };
};

export const registerNotificationToken = async (email, notification_token) => {
  try {
    const response = await apiClient.post(`${API_URL}/registerNotificationToken`, { email, notification_token });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao verifiacar email" };
  };
};

export const selectUser = async ( _id) => {
  try {
    const response = await apiClient.post(`${API_URL}/selectUser`, { _id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar usuario" };
  };
};

export const updateName = async ( _id, firstName, surname ) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateName`, { _id, firstName, surname });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar nome do usuario" };
  };
};


export const updateNumber = async ( _id, number) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateNumber`, { _id, number });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar numero do usuario" };
  };
};

export const updatePassword = async (_id, password) => {
  try {
    const response = await apiClient.post(`${API_URL}/updatePassword`, { _id, password});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar usuario" };
  };
};

export const verifyUserType = async (user_id) => {
  try {
    const response = await apiClient.post(`${API_URL}/verifyUserType`, { user_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar a funçao do usuario" };
  };
};



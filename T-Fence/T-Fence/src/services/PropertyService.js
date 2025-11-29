import apiClient from '../api/axiosConfig';

const API_URL_Tfence = process.env.API_URL_Tfence || "https://tfence.tcorporation.com.br";
const API_URL = `${API_URL_Tfence}/property`;

export const registerProperty = async ( user_id, name_Property, state, city, address, area, location, description) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, {  user_id, name_Property, state, city, address, area, location, description });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao cadastrar propriedade" };
  }
};

export const findProperty = async ( user_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/select`, { user_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar propriedade" };
  }
};

export const findCollaborator = async ( user_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/findCollaborator`, { user_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao pesquisar colaborador" };
  }
};

export const requestCollaborators = async ( propertyCode, user_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/requestCollaborators`, { propertyCode, user_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao enviar solicitação" };
  }
};

export const approveCollaborator = async ( user_id  ) => {
  try {
    const response = await apiClient.post(`${API_URL}/approveCollaborator`, { user_id  });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao aprovar colaborador" };
  }
};

export const removeRequestCollaborator = async ( user_id  ) => {
  try {
    const response = await apiClient.post(`${API_URL}/removeRequestCollaborator`, { user_id  });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao remover solicitação colaborador" };
  }
};

export const removeCollaborator = async ( user_id  ) => {
  try {
    const response = await apiClient.post(`${API_URL}/removeCollaborator`, { user_id  });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao remover solicitação colaborador" };
  }
};

export const updateName = async ( _id, name_Property ) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateName`, { _id, name_Property});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar nome da propriedade" };
  };
};

export const updateArea = async ( _id, area ) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateArea`, { _id, area});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar area da propriedade" };
  };
};

export const updateDescription = async ( _id,description ) => {
  try {
    const response = await apiClient.post(`${API_URL}/updateDescription`, { _id, description});
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao atualizar descrição da propriedade" };
  };
};

export const findPropertyById = async ( property_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/findPropertyById`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar propriedade" };
  };
};

export const fetchCollaborates = async ( property_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/fetchCollaborates`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar propriedade" };
  };
}

export const fetchRequestCollaborators = async ( property_id ) => {
  try {
    const response = await apiClient.post(`${API_URL}/fetchRequestCollaborators`, { property_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Erro ao buscar propriedade" };
  };
}
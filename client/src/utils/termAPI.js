import api from "@/utils/apiConfig";

export const createTerm = async (termData) => {
  try {
    const response = await api.post("/terms/create", termData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllTerms = async (userData) => {
  try {
    const response = await api.get("/terms", userData);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getTermById = async (termId) => {
  try {
    const response = await api.get(`/terms/${termId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

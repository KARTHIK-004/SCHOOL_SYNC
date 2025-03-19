import api from "./apiConfig";

export const createClass = async (classData) => {
  try {
    const response = await api.post("/classes/create", classData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllClasses = async () => {
  try {
    const response = await api.get("/classes");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getClassById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const response = await api.put(`/classes/${id}`, classData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

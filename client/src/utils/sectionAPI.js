import api from "./apiConfig";

export const createSection = async (sectionData) => {
  try {
    const response = await api.post("/sections/create", sectionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllSections = async () => {
  try {
    const response = await api.get("/sections");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSectionsByClass = async (classId) => {
  try {
    const response = await api.get(`/sections/class/${classId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSectionById = async (id) => {
  try {
    const response = await api.get(`/sections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSection = async (id, sectionData) => {
  try {
    const response = await api.put(`/sections/${id}`, sectionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSection = async (id) => {
  try {
    const response = await api.delete(`/sections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

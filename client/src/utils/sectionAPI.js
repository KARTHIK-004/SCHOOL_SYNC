import axios from "axios";

export const createSection = async (sectionData) => {
  try {
    const response = await axios.post("/sections", sectionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllSections = async () => {
  try {
    const response = await axios.get("/sections");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSectionsByClass = async (classId) => {
  try {
    const response = await axios.get(`/sections/class/${classId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSectionById = async (id) => {
  try {
    const response = await axios.get(`/sections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSection = async (id, sectionData) => {
  try {
    const response = await axios.put(`/sections/${id}`, sectionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSection = async (id) => {
  try {
    const response = await axios.delete(`/sections/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

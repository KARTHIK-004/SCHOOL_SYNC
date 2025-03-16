import axios from "axios";

export const createClass = async (classData) => {
  try {
    const response = await axios.post("/classes", classData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllClasses = async () => {
  try {
    const response = await axios.get("/classes");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getClassById = async (id) => {
  try {
    const response = await axios.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const response = await axios.put(`/classes/${id}`, classData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await axios.delete(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

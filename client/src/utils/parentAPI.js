import api from "@/utils/apiConfig";

// Parent Operations
export const createParent = async (parentData) => {
  try {
    const response = await api.post("/parents/create", parentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateParent = async (id, parentData) => {
  try {
    const response = await api.put(`/parents/${id}`, parentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteParent = async (id) => {
  try {
    const response = await api.delete(`/parents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getParentById = async (id) => {
  try {
    const response = await api.get(`/parents/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getParentsBySchool = async (schoolId) => {
  try {
    const response = await api.get(`/parents/school/${schoolId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

import api from "@/utils/apiConfig";

export const createDepartment = async (departmentData) => {
  try {
    const response = await api.post("/departments/create", departmentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllDepartments = async (userData) => {
  try {
    const response = await api.get("/departments", userData);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getDepartmentById = async (departmentId) => {
  try {
    const response = await api.get(`/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

import api from "@/utils/apiConfig";

// School Operations
export const createSchool = async (schoolData) => {
  try {
    const response = await api.post("/schools/create", schoolData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllSchools = async () => {
  try {
    const response = await api.get("/schools");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getSchoolById = async (schoolId) => {
  try {
    const response = await api.get(`/schools/${schoolId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getMySchool = async () => {
  try {
    const response = await api.get("/schools/my-school");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

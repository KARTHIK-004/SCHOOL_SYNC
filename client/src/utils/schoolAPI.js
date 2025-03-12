import api from "@/utils/apiConfig";

// Function to create a new school
export const createSchool = async (schoolData) => {
  try {
    const response = await api.post("/schools/create", schoolData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get all schools
export const getAllSchools = async () => {
  try {
    const response = await api.get("/schools");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get a school by ID
export const getSchoolById = async (id) => {
  try {
    const response = await api.get(`/schools/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getSchoolsByUserId = async (userId) => {
  try {
    const response = await api.get("/schools", {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

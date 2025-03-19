import api from "./apiConfig";

export const createSubject = async (subjectData) => {
  try {
    const response = await api.post("/subjects/create", subjectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllSubjects = async () => {
  try {
    const response = await api.get("/subjects");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

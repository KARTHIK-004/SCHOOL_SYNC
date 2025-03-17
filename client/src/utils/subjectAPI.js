import axios from "axios";

export const createSubject = async (subjectData) => {
  try {
    const response = await axios.post("/subjects/create", subjectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubjects = async () => {
  try {
    const response = await axios.get("/subjects");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

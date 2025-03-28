import api from "@/utils/apiConfig";

export const createStudent = async (studentData) => {
  try {
    const response = await api.post("/students/create", studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudentsBySection = async (sectionId) => {
  try {
    const response = await api.get(
      `/students/section/${sectionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching students by section:", error);
    throw error;
  }
};

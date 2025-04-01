import api from "@/utils/apiConfig";

// Teacher Operations
export const createTeacher = async (teacherData) => {
  try {
    const response = await api.post("/teachers/create", teacherData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getTeacherById = async (id) => {
  try {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getTeacherByUserId = async (userId) => {
  try {
    const response = await api.get(`/teachers/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllTeachers = async () => {
  try {
    const response = await api.get("/teachers");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getTeachersBySchool = async (schoolId) => {
  try {
    const response = await api.get(`/teachers/school/${schoolId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

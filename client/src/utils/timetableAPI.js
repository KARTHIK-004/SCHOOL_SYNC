import api from "@/utils/apiConfig";

export const createTimetable = async (timetableData) => {
  try {
    const response = await api.post("/timetable/create", timetableData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTimetableBySchoolId = async (schoolId) => {
  try {
    const response = await api.get(`/timetable/school/${schoolId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTimetable = async (schoolId) => {
  try {
    const response = await api.get(`/timetable`, {
      params: { schoolId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTimetableEntry = async (data) => {
  try {
    const response = await api.post(`/timetable`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

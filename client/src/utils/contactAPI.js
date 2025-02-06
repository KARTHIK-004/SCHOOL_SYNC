import api from "@/utils/apiConfig";

export const submitContactForm = async (formData) => {
  try {
    const response = await api.post(`/contact/submit`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await api.get(`/contact/submissions`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteContact = async () => {
  console.log("delete");
  return {
    ok: true,
  };
};

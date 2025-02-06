import api from "@/utils/apiConfig";

export const getAllContacts = async () => {
  try {
    const response = await api.get(`/contact/submissions`);
    const contacts = response.data;
    return contacts;
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

import api from "@/utils/apiConfig";

export const signIn = async (email, password) => {
  try {
    const response = await api.post(`/users/signin`, { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.user.role); // Store role in localStorage
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await api.post(`/users/signup`, userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.user.role); // Store role in localStorage
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const logout = async () => {
  try {
    const response = await api.post(`/users/logout`);
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    if (response.data.status === "success" && response.data.data.user) {
      const user = response.data.data.user;

      // Add school status check
      if (user.role === "schoolAdmin") {
        const schoolRes = await api.get(`/schools?userId=${user.id}`);
        if (schoolRes.data.data.schools.length > 0) {
          localStorage.setItem(
            "schoolHasCompletedOnboarding",
            schoolRes.data.data.schools[0].hasCompletedOnboarding
          );
        }
      }

      return user;
    } else {
      throw new Error("User data not found in the response");
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
        return null;
      }
    }
    throw error;
  }
};

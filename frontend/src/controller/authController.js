import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

export const loginUser = async (user_name, user_password) => {
  // console.log("Base URL:", base_url);

  try {
    const response = await axios.post(`${base_url}/auth/login`, {
      user_name,
      user_password
    });

    // console.log(response);

    const { success, message, result } = response.data;

    if (success) {
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("login", success);
      sessionStorage.setItem("user_name", result.user_name);
    }

    return { success, message, result };
  } catch (error) {
    if (error.response) {
      console.error("Login error:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Login failed.",
        result: null
      };
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      return {
        success: false,
        message: "No response from server. Please try again.",
        result: null
      };
    } else {
      console.error("Unexpected error:", error.message);
      return {
        success: false,
        message: "Unexpected error occurred. Please try again.",
        result: null
      };
    }
  }
};

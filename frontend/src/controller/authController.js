import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

export const loginUser = async (user_name, user_password) => {
  console.log("base url",base_url);

  try {
    const response = await axios.post(`${base_url}/auth/login`, {
      "user_name": `${user_name}`,
      "user_password": `${user_password}`,
    });
    

    console.log(response)

    // On success, store token and return response
    sessionStorage.setItem("token", response.data.result.token);
    sessionStorage.setItem("login", response.data.success); // For ProtectedRoute
    sessionStorage.setItem("user_name", response.data.result.user_name); 
    return response.data;
  } catch (error) {
    if (error.response) {
      // Backend responded with an error (like 400, 401, 404)
      console.error("Login error:", error.response.data);
      return error.response.data; // Return error response
    } else if (error.request) {
      // No response from the server (CORS, network issue)
      console.error("No response received from server", error.request);
      return { success: false, message: "No response from server" };
    } else {
      // Unknown Axios error
      console.error("Axios error:", error.message);
      return { success: false, message: "Unexpected error occurred" };
    }
  }
};
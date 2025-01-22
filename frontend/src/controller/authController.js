import axios from 'axios';

export const loginUser = async (user_name, user_password) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
      "user_name": `${user_name}`,
      "user_password": `${user_password}`,
    });

    console.log(response)

    // On success, store token and return response
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("login", true); // For ProtectedRoute
    return { success: true, message: "Login successful" };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Something went wrong",
    };
  }
};
import axios from 'axios';

export const loginUser = async (user_name, user_password) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
      "user_name": `${user_name}`,
      "user_password": `${user_password}`,
    });

    console.log(response)

    // On success, store token and return response
    sessionStorage.setItem("token", response.data.result);
    sessionStorage.setItem("login", true); // For ProtectedRoute
    return response.data;
  } catch (err) {
    return {
      success: false,
      result: err,
      message: "Something went wrong! Please try again"
    };
  }
};
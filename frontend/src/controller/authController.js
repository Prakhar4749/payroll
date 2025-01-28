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
  } catch (err) {
    return {
      success: false,
      result: err,
      message: "Something went wrong! Please try again after some time"
    };
  }
};
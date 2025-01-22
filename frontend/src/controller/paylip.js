import axios from 'axios';

const check_id = async (e_id) => {
  try {
    const response = await axios.post("http://localhost:5000/emp/:e_id");

    console.log(response)

    return { success: true, message: " successful" };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Something went wrong",
    };
  }
};
const fetch_form = async (e_id) => {
  try {
    const response = await axios.post("http://localhost:5000/emp/:e_id");

    console.log(response)

    return { success: true, message: " successful" };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Something went wrong",
    };
  }
};

export {
  fetch_form,
}
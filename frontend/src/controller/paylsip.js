import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

const check_id = async (e_id) => {
  try {
    const response = await axios.post(`${base_url}/emp/:e_id`);

    console.log(response)

    return response.data;
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Something went wrong",
    };
  }
};
const fetch_form = async (e_id) => {
  try {
    const response = await axios.post(`${base_url}/emp/${e_id}`);

    console.log(response)

    return response.data;
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Something went wrong",
    };
  }
};

export {
  check_id,fetch_form,
}
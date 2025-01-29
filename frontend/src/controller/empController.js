import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

const all_emp_data = async () => {
  try {
    const response = await axios.get(`${base_url}/emp/`);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const check_for_add_emp = async (raw_data) => {
  try {
    const response = await axios.put(`${base_url}/emp/chk/1`, raw_data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const add_emp_details = async (data) => {
  try {
    const response = await axios.post(`${base_url}/emp/add_emp`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const check_for_update_emp = async (raw_data) => {
  try {
    const response = await axios.put(
      `${base_url}/emp/chk_for_update`,
      raw_data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const update_emp_details = async (data) => {
  try {
    const response = await axios.put(`${base_url}/emp/update_emp`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const delete_emp_details = async (e_id) => {
  try {
    console.log("conroller", e_id);
    const response = await axios.delete(`${base_url}/emp/delete/${e_id}`);
    console.log("conroller", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const view_emp_by_id = async (e_id) => {
  try {
    const response = await axios.get(`${base_url}/emp/${e_id}`);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

export {
  all_emp_data,
  view_emp_by_id,
  update_emp_details,
  add_emp_details,
  check_for_add_emp,
  delete_emp_details,
  check_for_update_emp,
};

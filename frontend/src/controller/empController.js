import axios from 'axios';

const all_emp_data = async () => {
  try {
    const response = await axios.get("http://localhost:5000/emp/");
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error.message);
  }

}

const check_for_add_emp = async (raw_data) => {
  try {
    const response = await axios.put(`http://localhost:5000/emp/chk/1`,raw_data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const add_emp_details = async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/emp/add_emp`,data , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.message;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const update_emp_details = async (data) => {
  try {
    const response = await axios.put(`http://localhost:5000/emp/update_emp`,data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};

const delete_emp_details = async (e_id) => {
  try {

    console.log("conroller",e_id);
    const response = await axios.delete(`http://localhost:5000/emp/delete/${e_id}`);
    console.log("conroller",response.data);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};


const view_emp_by_id = async (e_id) => {
  try {
    const response = await axios.get(`http://localhost:5000/emp/${e_id}`);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error);
  }
};


export {
  all_emp_data, view_emp_by_id, update_emp_details, add_emp_details, check_for_add_emp, delete_emp_details
}

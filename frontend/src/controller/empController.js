import axios from 'axios';

const all_emp_data = async () => {
  try {
    const response = await axios.get("http://localhost:5000/emp/");
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error.message);
  }

}

const view_emp_by_id = async (e_id) => {
  try {
    const response = await axios.get(`http://localhost:5000/emp/${e_id}`);
    return response.data;
  } catch (error) {
    console.error("Axios request failed:", error.message);
  }
};
export {
  all_emp_data, view_emp_by_id,
}

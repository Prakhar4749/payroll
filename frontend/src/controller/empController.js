import axios from 'axios';

export const all_emp_data = async (e_id) => {
  try {
    const response = await axios.get("http://localhost:5000/emp/");
    return response.data; 
} catch (error) {
  console.error("Axios request failed:", error.message);
}
};
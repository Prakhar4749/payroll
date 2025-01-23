import axios from "axios";

async function fetchAllDeptData() {
  try {
    const response = await axios.get("http://localhost:5000/dept");
    // console.log(response.data);
    return response.data; // Update state with API response
  } catch (error) {
    console.error("Axios request failed:", error.message);
  }
}


const checkDepartment = async (d_id, d_name) => {
  try {
    const response = await axios.post("http://localhost:5000/dept/chk/1", {
      d_id: d_id,
      d_name: d_name,
    });
    // console.log(response.data);
    return response.data;  
  } catch (err) {
    console.error("Error checking department:", err);
    throw err;  
  }
};


export { fetchAllDeptData ,checkDepartment };

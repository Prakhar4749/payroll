import axios from "axios";

// const ip="http://localhost:5000"
const ip = process.env.REACT_APP_BASE_URL;

async function fetchAllDeptData() {
  try {
    const response = await axios.get(`${ip}/dept/`);
    // console.log(response.data);
    // console.log(response.data)
    return response.data  ; // Update state with API response
  } catch (error) {
    console.error("Axios request failed:", error.message);
  }
}


const checkDepartment = async (d_id, d_name) => {
  try {
    const response = await axios.post(`${ip}/dept/chk/1`, {
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


const updateDepartment=async (newData)=>{
  try {
    const response = await axios.put(`${ip}/dept/update_d_id`, newData );
    // console.log(response.data);
    return response.data;  
  } catch (err) {
    console.error("Error checking department:", err);
    throw err;  
  }
}

const addToDepartment = async (to_add)=>{
    try{
      const response = axios.post(`${ip}/dept/add_dept` , to_add)

      return response;
    }catch(err){
      console.error("Error checking department:", err);
    throw err;
    }
}

const removeFromDept = async (d_id)=>{
    try{
      const result = await axios.delete(`${ip}/dept/delete_d_id/${d_id}`)
      // console.log(result)
      return result.data;
    }catch(err){
      console.log(err)
    }
}

export { fetchAllDeptData ,checkDepartment ,updateDepartment ,addToDepartment,removeFromDept};

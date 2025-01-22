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


export { fetchAllDeptData };

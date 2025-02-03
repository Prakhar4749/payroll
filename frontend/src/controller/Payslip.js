import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

const check_id = async(e_id)=>{
  try {
    const response = await axios.get(`${base_url}/payslip/isit/${e_id}`);

    console.log(response);

    const { success, message, result } = response.data;
    return { success, message, result };
  } catch (error) {
    console.error("Error checking e_id:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      result: null
    };
  }

}

const check_payslip_in_archive = async (e_id, salary_month, salary_year) => {
  try {
    const response = await axios.post(`${base_url}/payslip/isit`, {
      e_id,
      salary_month,
      salary_year
    });

    console.log(response);

    const { success, message, result } = response.data;
    return { success, message, result };
  } catch (error) {
    console.error("Error checking payslip:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      result: null
    };
  }
};

const fetch_form = async (e_id) => {
  try {
    const response = await axios.get(`${base_url}/emp/${e_id}`);

    console.log(response);

    const { success, message, result } = response.data;
    return { success, message, result };
  } catch (error) {
    console.error("Error fetching form:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      result: null
    };
  }
};
const create_salary_archive = async(data)=>{
  try {
    const response = await axios.put(`${base_url}/payslip/create_payslip`,{data});

    console.log(response);

    const { success, message, result } = response.data;
    return { success, message, result };
  } catch (error) {
    console.error("Error creating payslip:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      result: null
    };
  }

}

const get_payslip = async (e_id, salary_month, salary_year) => {
  try {
    const response = await axios.post(`${base_url}/payslip/get_pdf`, {
      e_id,
      salary_month,
      salary_year
    });

    console.log(response);

    const { success, message, result } = response.data;
    return { success, message, result };
  } catch (error) {
    console.error("Error geting payslip:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      result: null
    };
  }
};


export {
  check_id,fetch_form,check_payslip_in_archive,create_salary_archive,get_payslip
}
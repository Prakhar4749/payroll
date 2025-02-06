import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

const check_id = async(e_id)=>{
  try {
    const response = await axios.get(`${base_url}/payslip/isit/${e_id}`);

    // console.log(response);

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

const check_payslip_in_archive = async ({e_id, salary_month, salary_year}) => {
  try {
    const response = await axios.post(`${base_url}/payslip/isit`, {
      e_id,
      salary_month,
      salary_year
    });

    // console.log(response);

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


const create_salary_archive = async(data)=>{
  try {
    const response = await axios.put(`${base_url}/payslip/create_payslip`,data);

    // console.log(response);

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

const get_payslip = async ({e_id, salary_month, salary_year}) => {
  try {
    const response = await axios.post(`${base_url}/payslip/get_pdf`, {
      e_id,
      salary_month,
      salary_year
    });

    // console.log(response);

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

const send_pdf_to_email = async ({to,subject,text,html,file,file_name}) => {
  try {
    const formData = new FormData();
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("text", text);
    formData.append("html", html);
    formData.append("file", file, file_name);

    const response = await axios.post("http://localhost:5000/payslip/send_email", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(response.data);
    return response.data

  } catch (error) {
    console.error("Error sending email:", error);
  
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      result: null
    };
  }
};




export {
  check_id,check_payslip_in_archive,create_salary_archive,get_payslip,send_pdf_to_email
}
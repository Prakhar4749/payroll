import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

const check_for_payslip_in_archive = async (e_id, salary_month, salary_year) => {
  try {
    const response = await axios.post(`${base_url}/payslip/isit`,{e_id: e_id,
      salary_month: salary_month,
      salary_year: salary_year} );

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
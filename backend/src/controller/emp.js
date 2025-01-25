
import { checkConnection, pool } from "../config/db.js";

//chk for the update 
async function chk_for_update(req, res) {
  let result = {
    e_mobile_number: false,
    e_bank_acc_number: false,
    e_pan_number: false,
    d_id: false,
    d_name: false
  };

  const rawdata = req.body;
  const { e_id } = rawdata.emp_details;
  const data = {
    e_mobile_number: rawdata.emp_details?.e_mobile_number || null,
    e_bank_acc_number: rawdata.emp_bank_details?.e_bank_acc_number || null,
    e_pan_number: rawdata.emp_bank_details?.e_pan_number || null,
    d_id: rawdata.emp_details?.d_id || null
  };

  console.log(data);

  try {
    const sql = `
      SELECT e_id FROM emp_details WHERE e_mobile_number = '${data.e_mobile_number}';
      SELECT e_id FROM emp_bank_details WHERE e_bank_acc_number = '${data.e_bank_acc_number}';
      SELECT e_id FROM emp_bank_details WHERE e_pan_number = '${data.e_pan_number}';
      SELECT d_id, d_name FROM dept_details WHERE d_id = '${data.d_id}';
    `;

    const [SQLresult] = await pool.query(sql);
    console.log(SQLresult);

    // Check mobile number
    if ((SQLresult[0][0]?.e_id == e_id || !SQLresult[0][0]) && data.e_mobile_number != null) 
      result.e_mobile_number = true;

    // Check bank account number
    if ((SQLresult[1][0]?.e_id == e_id || !SQLresult[1][0]) && data.e_bank_acc_number != null) 
      result.e_bank_acc_number = true;

    // Check PAN number
    if ((SQLresult[2][0]?.e_id == e_id || !SQLresult[2][0]) && data.e_pan_number != null) 
      result.e_pan_number = true;

    // Check if d_id exists and fetch d_name
    if (SQLresult[3].length > 0) {
      result.d_id = true;
      result.d_name = SQLresult[3][0].d_name ? SQLresult[3][0].d_name : false;
    }

    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json({ error: "Database error occurred" });
  }
}


// to check that (e_mobile_number ,e_bank_acc_number ,e_pan_number ,d_name )  pressent or not
async function check_for_data(req, res) {
  console.log("I am running ----");

  let result = {
    e_mobile_number: false,
    e_bank_acc_number: false,
    e_pan_number: false,
    d_id: false,
    d_name: false,
  };

  const rawdata = req.body;
  const data = {
    e_mobile_number: rawdata.emp_details?.e_mobile_number || null,
    e_bank_acc_number: rawdata.emp_bank_details?.e_bank_acc_number || null,
    e_pan_number: rawdata.emp_bank_details?.e_pan_number || null,
    d_id: rawdata.emp_details?.d_id || null
  };

  console.log(data);

  try {
    const sql = `
      SELECT COUNT(1) as count FROM emp_details WHERE e_mobile_number = '${data.e_mobile_number}';
      SELECT COUNT(1) as count FROM emp_bank_details WHERE e_bank_acc_number = '${data.e_bank_acc_number}';
      SELECT COUNT(1) as count FROM emp_bank_details WHERE e_pan_number = '${data.e_pan_number}';
      SELECT d_id, d_name FROM dept_details WHERE d_id = '${data.d_id}';
    `;

    const [SQLresult] = await pool.query(sql);
    console.log(SQLresult);
    console.log(sql);

    // Check if e_mobile_number doesn't exist and data is provided
    if (SQLresult[0][0].count == 0 && data.e_mobile_number != null) 
      result.e_mobile_number = true;

    // Check if e_bank_acc_number doesn't exist and data is provided
    if (SQLresult[1][0].count == 0 && data.e_bank_acc_number != null) 
      result.e_bank_acc_number = true;

    // Check if e_pan_number doesn't exist and data is provided
    if (SQLresult[2][0].count == 0 && data.e_pan_number != null) 
      result.e_pan_number = true;

    // Check if d_id exists and fetch d_name
    if (SQLresult[3].length > 0) {
      result.d_id = true;
      result.d_name = SQLresult[3][0].d_name ? SQLresult[3][0].d_name : false;
    } else {
      result.d_id = false;
      result.d_name = false;
    }

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error occurred", details: err });
  }
}


// to export all emp_details
async function get_all_basic__emp_details(req, res) {
  const sql = "SELECT * FROM emp_details";
  try {
    const [results, fields] = await pool.query(sql);
    // Clean the fields to include only necessary information
    const sanitizedFields = fields.map((field) => ({
      name: field.name,
      type: field.type,
    }));

    return res.json(results);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Failed to fetch user data." });
  }
}

// for geting detail by e_id the emp_details
async function get_all_e_id_emp_details(req, res) {
  const sql_for_emp_details = `SELECT * FROM emp_details  WHERE e_id = '${req.params["e_id"]}' ; 
    SELECT * FROM emp_bank_details  WHERE e_id = '${req.params["e_id"]}' ; 
    SELECT * FROM emp_deduction_details  WHERE e_id = '${req.params["e_id"]}' ; 
    SELECT * FROM emp_earning_details  WHERE e_id = '${req.params["e_id"]}' ;  `;
  try {
    const [result, fildes1] = await pool.query(sql_for_emp_details);

    // for gatin the dept_details
    // console.log(result[0][0])
      const [dept_details, fi] = await pool.query(`SELECT * FROM dept_details WHERE d_id = '${result[0][0].d_id}'`);

    return res.json({
      emp_details: result[0][0],
      dept_details: dept_details[0],
      emp_bank_details: result[1][0],
      emp_deduction_details: result[2][0],
      emp_earning_details: result[3][0],
    });
  } catch (err) {
    res.json({ err_: err });
  }
}

// for deleting the e_id from (emp_details, emp_bank_details,emp_deduction_details ,emp_earning_details)
async function delete_e_id(req, res) {
  const e_id = req.params["e_id"];

  if (!e_id || e_id.length != 5) {
    return res.json({ mess: " enter the valid e_id" });
  }

  const sql_for_emp_details = `
        DELETE FROM emp_bank_details WHERE e_id = ?;
        DELETE FROM emp_deduction_details WHERE e_id = ?;
        DELETE FROM emp_earning_details WHERE e_id = ?;
        DELETE FROM emp_details WHERE e_id = ?;
        `;

  try {
    const [result] = await pool.query(sql_for_emp_details, [
      e_id,
      e_id,
      e_id,
      e_id,
    ]);

    console.log("Queries executed successfully:", result);
    return res.json({
      success: true,
      message: ` employee details of id: ${e_id} is succesfully deleted`,
      result: result,
    });
  } catch (err) {
    console.error("Error executing queries:", err);
    return res.json({
      success: false,
      message: `thir is some problum in deleting the ${e_id}`,
      err: err,
    });
  }
}

//  add new emp
async function add_new_emp(req, res) {
  // to generat new e_id
  let new_e_id;
  function incrementString(input) {
    const prefix = input.slice(0, -3); // Extract the non-numeric part ('E')
    const numberPart = input.slice(-3); // Extract the numeric part ('001')
    const incrementedNumber = (parseInt(numberPart, 10) + 1)
      .toString()
      .padStart(3, "0"); // Increment and pad with zeros
    return prefix + incrementedNumber; // Combine the prefix and incremented number
  }

  const sql1 = "SELECT * FROM emp_details";
  try {
    const [results, fields] = await pool.query(sql1);
    new_e_id = incrementString(results[results.length - 1]["e_id"]);
    console.log(new_e_id);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "Failed to fetch user data." });
  }

  // fatching data fro req
  const data = req.body;
  //   console.log(data);

  const sql = `
  -- Insert into emp_details
  INSERT INTO emp_details (
      e_id, e_name, e_mobile_number, e_gender, e_email, e_address, e_photo, d_id, 
      e_designation, e_group, e_date_of_joining, e_DOB
  ) VALUES (
      '${new_e_id}', '${data.emp_details.e_name}', ${
    data.emp_details.e_mobile_number
  }, '${data.emp_details.e_gender}', '${data.emp_details.e_email}', 
      '${data.emp_details.e_address}', ${
    data.emp_details.e_photo === null ? "NULL" : `'${data.emp_details.e_photo}'`
  }, '${data.emp_details.d_id}', 
      '${data.emp_details.e_designation}', '${data.emp_details.e_group}', '${
    data.emp_details.e_date_of_joining
  }', '${data.emp_details.e_DOB}'
  );
  
  -- Insert into emp_bank_details
  INSERT INTO emp_bank_details (
      e_id, e_name, e_bank_name, e_bank_acc_number, e_pan_number, e_bank_IFSC, e_cpf_or_gpf_number
  ) VALUES (
      '${new_e_id}', '${data.emp_bank_details.e_name}', '${
    data.emp_bank_details.e_bank_name
  }', ${data.emp_bank_details.e_bank_acc_number}, 
      '${data.emp_bank_details.e_pan_number}', '${
    data.emp_bank_details.e_bank_IFSC
  }', ${
    data.emp_bank_details.e_cpf_or_gpf_number === null
      ? "NULL"
      : `'${data.emp_bank_details.e_cpf_or_gpf_number}'`
  }
  );
  
  -- Insert into emp_deduction_details
  INSERT INTO emp_deduction_details (
      e_id, e_name, leave_days, leave_deduction_amount, deduction_CPF, GIS, 
      house_rent, water_charges, electricity_charges, vehicle_deduction, 
      HB_loan, GPF_loan, festival_loan, grain_charges, bank_advance, advance, 
      RGPV_advance, income_tax, professional_tax
  ) VALUES (
      '${new_e_id}', '${data.emp_deduction_details.e_name}', ${
    data.emp_deduction_details.leave_days
  }, ${data.emp_deduction_details.leave_deduction_amount}, 
      ${data.emp_deduction_details.deduction_CPF}, ${
    data.emp_deduction_details.GIS
  }, ${data.emp_deduction_details.house_rent}, 
      ${data.emp_deduction_details.water_charges}, ${
    data.emp_deduction_details.electricity_charges
  }, ${data.emp_deduction_details.vehicle_deduction}, 
      ${data.emp_deduction_details.HB_loan}, ${
    data.emp_deduction_details.GPF_loan
  }, ${data.emp_deduction_details.festival_loan}, 
      ${data.emp_deduction_details.grain_charges}, ${
    data.emp_deduction_details.bank_advance
  }, ${data.emp_deduction_details.advance}, 
      ${data.emp_deduction_details.RGPV_advance}, ${
    data.emp_deduction_details.income_tax
  }, ${data.emp_deduction_details.professional_tax}
  );
  
  -- Insert into emp_earning_details
  INSERT INTO emp_earning_details (
      e_id, e_name, basic_salary, special_pay, dearness_allowance, DA, ADA, 
      interim_relief, HRA, CCA, conveyance, medical, washing_allowance, BDP, arrears
  ) VALUES (
      '${new_e_id}', '${data.emp_earning_details.e_name}', ${
    data.emp_earning_details.basic_salary
  }, ${data.emp_earning_details.special_pay}, 
      ${data.emp_earning_details.dearness_allowance}, ${
    data.emp_earning_details.DA
  }, ${data.emp_earning_details.ADA}, 
      ${data.emp_earning_details.interim_relief}, ${
    data.emp_earning_details.HRA
  }, ${data.emp_earning_details.CCA}, 
      ${data.emp_earning_details.conveyance}, ${
    data.emp_earning_details.medical
  }, ${data.emp_earning_details.washing_allowance}, 
      ${data.emp_earning_details.BDP}, ${data.emp_earning_details.arrears}
  );
  `;

  try {
    const [newResult, fi] = await pool.query(sql);
    console.log(newResult);
  } catch (err) {
    return res.json({ mess: err });
  }

  const sql_for_emp_details = `SELECT * FROM emp_details  WHERE e_id = '${new_e_id}' ; 
    SELECT * FROM emp_bank_details  WHERE e_id = '${new_e_id}' ; 
    SELECT * FROM emp_deduction_details  WHERE e_id = '${new_e_id}' ; 
    SELECT * FROM emp_earning_details  WHERE e_id = '${new_e_id}' ;  `;
  try {
    const [result, fildes1] = await pool.query(sql_for_emp_details);

    
    return res.json({
      success: true,
      message: `employee added successfull , ${new_e_id} is your E_id `,
      result:{
        emp_details: result[0][0],
        emp_bank_details: result[1][0],
        emp_deduction_details: result[2][0],
        emp_earning_details: result[3][0],
      }
    });
  } catch (err) {
    res.json({  success: false,
      message: `failed to add emmoploye`,
      error:err});
  }
}

//update the emp
async function update_emp(req, res) {
    const data =req.body;
    try {
        // Update emp_details table
        const empDetailsQuery = `
            UPDATE emp_details 
            SET 
                e_name = ?, e_mobile_number = ?, e_gender = ?, e_email = ?, e_address = ?, 
                e_photo = ?, d_id = ?, e_designation = ?, e_group = ?, 
                e_date_of_joining = ?, e_DOB = ?
            WHERE e_id = ?;
        `;

        const empDetailsValues = [
            data.emp_details.e_name,
            data.emp_details.e_mobile_number,
            data.emp_details.e_gender,
            data.emp_details.e_email,
            data.emp_details.e_address,
            data.emp_details.e_photo,
            data.emp_details.d_id,
            data.emp_details.e_designation,
            data.emp_details.e_group,
            data.emp_details.e_date_of_joining,
            data.emp_details.e_DOB,
            data.emp_details.e_id
        ];

        await pool.query(empDetailsQuery, empDetailsValues);

        // Update dept_details table
        const deptDetailsQuery = `
            UPDATE dept_details 
            SET d_name = ?
            WHERE d_id = ?;
        `;

        const deptDetailsValues = [
            data.dept_details.d_name,
            data.dept_details.d_id
        ];

        await pool.query(deptDetailsQuery, deptDetailsValues);

        // Update emp_bank_details table
        const empBankQuery = `
            UPDATE emp_bank_details 
            SET 
                e_name = ?, e_bank_name = ?, e_bank_acc_number = ?, 
                e_pan_number = ?, e_bank_IFSC = ?, e_cpf_or_gpf_number = ?
            WHERE e_id = ?;
        `;

        const empBankValues = [
            data.emp_bank_details.e_name,
            data.emp_bank_details.e_bank_name,
            data.emp_bank_details.e_bank_acc_number,
            data.emp_bank_details.e_pan_number,
            data.emp_bank_details.e_bank_IFSC,
            data.emp_bank_details.e_cpf_or_gpf_number,
            data.emp_bank_details.e_id
        ];

        await pool.query(empBankQuery, empBankValues);

        // Update emp_deduction_details table
        const empDeductionQuery = `
            UPDATE emp_deduction_details 
            SET 
                e_name = ?, leave_days = ?, leave_deduction_amount = ?, deduction_CPF = ?, 
                GIS = ?, house_rent = ?, water_charges = ?, electricity_charges = ?, 
                vehicle_deduction = ?, HB_loan = ?, GPF_loan = ?, festival_loan = ?, 
                grain_charges = ?, bank_advance = ?, advance = ?, RGPV_advance = ?, 
                income_tax = ?, professional_tax = ?
            WHERE e_id = ?;
        `;

        const empDeductionValues = [
            data.emp_deduction_details.e_name,
            data.emp_deduction_details.leave_days,
            data.emp_deduction_details.leave_deduction_amount,
            data.emp_deduction_details.deduction_CPF,
            data.emp_deduction_details.GIS,
            data.emp_deduction_details.house_rent,
            data.emp_deduction_details.water_charges,
            data.emp_deduction_details.electricity_charges,
            data.emp_deduction_details.vehicle_deduction,
            data.emp_deduction_details.HB_loan,
            data.emp_deduction_details.GPF_loan,
            data.emp_deduction_details.festival_loan,
            data.emp_deduction_details.grain_charges,
            data.emp_deduction_details.bank_advance,
            data.emp_deduction_details.advance,
            data.emp_deduction_details.RGPV_advance,
            data.emp_deduction_details.income_tax,
            data.emp_deduction_details.professional_tax,
            data.emp_deduction_details.e_id
        ];

        await pool.query(empDeductionQuery, empDeductionValues);

        // Update emp_earning_details table
        const empEarningQuery = `
            UPDATE emp_earning_details 
            SET 
                e_name = ?, basic_salary = ?, special_pay = ?, dearness_allowance = ?, 
                DA = ?, ADA = ?, interim_relief = ?, HRA = ?, CCA = ?, 
                conveyance = ?, medical = ?, washing_allowance = ?, BDP = ?, arrears = ?
            WHERE e_id = ?;
        `;

        const empEarningValues = [
            data.emp_earning_details.e_name,
            data.emp_earning_details.basic_salary,
            data.emp_earning_details.special_pay,
            data.emp_earning_details.dearness_allowance,
            data.emp_earning_details.DA,
            data.emp_earning_details.ADA,
            data.emp_earning_details.interim_relief,
            data.emp_earning_details.HRA,
            data.emp_earning_details.CCA,
            data.emp_earning_details.conveyance,
            data.emp_earning_details.medical,
            data.emp_earning_details.washing_allowance,
            data.emp_earning_details.BDP,
            data.emp_earning_details.arrears,
            data.emp_earning_details.e_id
        ];

        await pool.query(empEarningQuery, empEarningValues);

      
        return res.json({ success: true, message: "Employee data updated successfully." });

    } catch (error) {
        console.error("Error updating employee data:", error);
        return res.json({ success: false, message: "Error updating employee data.", error });
    }

}

export {
  get_all_basic__emp_details,
  get_all_e_id_emp_details,
  delete_e_id,
  add_new_emp,
  update_emp,
  check_for_data,
  chk_for_update
};

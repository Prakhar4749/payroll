import { checkConnection, pool } from "../config/db.js";
import fs from "fs";

const formatDateForMySQL = (date) => {
  if (!date) {
    throw new Error("Invalid date input");
  }

  let d;
  let inputYear, inputMonth, inputDay;

  try {
    if (typeof date === "string") {
      // Extract date part (remove time)
      const dateString = date.split(/T|\s/)[0];

      // Try different date patterns
      const yyyyMatch = dateString.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
      const ddMatch = dateString.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);

      if (yyyyMatch) {
        [inputYear, inputMonth, inputDay] = yyyyMatch.slice(1).map(Number);
      } else if (ddMatch) {
        [inputDay, inputMonth, inputYear] = ddMatch.slice(1).map(Number);
      } else {
        d = new Date(dateString);
        if (isNaN(d.getTime())) throw new Error();
      }

      if (!d) {
        d = new Date(inputYear, inputMonth - 1, inputDay);
        if (
          d.getFullYear() !== inputYear ||
          d.getMonth() + 1 !== inputMonth ||
          d.getDate() !== inputDay
        ) {
          throw new Error();
        }
      }
    } else if (date instanceof Date) {
      d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Local time
    } else {
      d = new Date(date);
    }

    if (!d || isNaN(d.getTime())) throw new Error();

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    throw new Error("Invalid date input");
  }
};


//chk for the update
async function chk_for_update(req, res) {
  let result = {
    e_mobile_number: false,
    e_bank_acc_number: false,
    e_pan_number: false,
    d_id: false,
    d_name: false,
  };

  let message = "";

  const rawdata = req.body;
  const { e_id } = rawdata.emp_details;
  const data = {
    e_mobile_number: rawdata.emp_details?.e_mobile_number || null,
    e_bank_acc_number: rawdata.emp_bank_details?.e_bank_acc_number || null,
    e_pan_number: rawdata.emp_bank_details?.e_pan_number || null,
    d_id: rawdata.emp_details?.d_id || null,
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
    if (
      (SQLresult[0][0]?.e_id == e_id || !SQLresult[0][0]) &&
      data.e_mobile_number != null
    ) {
      result.e_mobile_number = true;
     
    } else {
      message += "Mobile number already exists or is invalid. \n";
    }

    // Check bank account number
    if (
      (SQLresult[1][0]?.e_id == e_id || !SQLresult[1][0]) &&
      data.e_bank_acc_number != null
    ) {
      result.e_bank_acc_number = true;
      
    } else {
      message += "Bank account number already exists or is invalid. \n";
    }

    // Check PAN number
    if (
      (SQLresult[2][0]?.e_id == e_id || !SQLresult[2][0]) &&
      data.e_pan_number != null
    ) {
      result.e_pan_number = true;
      
    } else {
      message += "PAN number already exists or is invalid. \n";
    }

    // Check if d_id exists and fetch d_name
    if (SQLresult[3].length > 0) {
      result.d_id = true;
      result.d_name = SQLresult[3][0].d_name ? SQLresult[3][0].d_name : false;
      
    } else {
      message += "Department ID is invalid or not found. \n";
    }

    if (!message) {
      message = "Every detail is correct and unique";
    }

    console.log(result);
    res.json({ success: true, result: result, message: message.trim() });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      result: err,
      message: "An unexpected error occurred while processing your request.",
    });
  }
}

// to check that (e_mobile_number ,e_bank_acc_number ,e_pan_number ,d_name )  pressent or not
async function check_for_data(req, res) {
  // console.log("I am running ----");

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
    d_id: rawdata.emp_details?.d_id || null,
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

    let message = "";

    // Check if e_mobile_number doesn't exist and data is provided
    if (SQLresult[0][0].count == 0 && data.e_mobile_number != null) {
      result.e_mobile_number = true;
      
    } else {
      message += "Mobile number already exists \n";
    }

    // Check if e_bank_acc_number doesn't exist and data is provided
    if (SQLresult[1][0].count == 0 && data.e_bank_acc_number != null) {
      result.e_bank_acc_number = true;
      
    } else {
      message += "Bank account number already exists \n";
    }

    // Check if e_pan_number doesn't exist and data is provided
    if (SQLresult[2][0].count == 0 && data.e_pan_number != null) {
      result.e_pan_number = true;
     
    } else {
      message += "PAN number already exists \n";
    }

    // Check if d_id exists and fetch d_name
    if (SQLresult[3].length > 0) {
      result.d_id = true;
      result.d_name = SQLresult[3][0].d_name ? SQLresult[3][0].d_name : false;
      
    } else {
      result.d_id = false;
      result.d_name = false;
      message += "Department ID is invalid \n";
    }

    if(!message) {
      message="Every detail is correct and unique";
    }

    res.json({
      success: true,
      result: result,
      message: message.trim(), // Trim to remove trailing space
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, result: err, message: "An unexpected error occurred while processing your request." });
  }
}

// to export all emp_details
async function get_all_basic__emp_details(req, res) {
  console.log(checkConnection());
  const sql =
    "SELECT e_id,e_name,e_mobile_number,e_email,e_address,e_designation  FROM emp_details";
  try {
    const [results, fields] = await pool.query(sql);
    // Clean the fields to include only necessary information
    const sanitizedFields = fields.map((field) => ({
      name: field.name,
      type: field.type,
    }));

    return res.json({
      success: true,
      result: results,
      message: "Employee basic details fetched successfully",
    });
  } catch (err) {
    console.error("Database query error:", err);
    res
      .status(500)
      .json({
        success: false,
        result: err,
        message: "There is some problem in fetching employee basic details",
      });
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
    const [dept_details, fi] = await pool.query(
      `SELECT * FROM dept_details WHERE d_id = '${result[0][0].d_id}'`
    );

   
    // Formating date
    // console.log("dob is -->  "+result[0][0].emp_details)
    result[0][0].e_DOB = formatDateForMySQL(result[0][0].e_DOB)
    result[0][0].e_date_of_joining = formatDateForMySQL(result[0][0].e_date_of_joining)
    

    // Convert buffer to Base64
    const photo= result[0][0].e_photo.toString('utf8');
    // console.log(photo)
    result[0][0].e_photo=null
    res.set('Content-Type', 'application/json');
    // result[0][0].e_photo=result[0][0].e_photo.toString('utf8');;

    return res.json({
      success: true,
      result: {
        e_photo:photo,
        emp_details: result[0][0],
        dept_details: dept_details[0],
        emp_bank_details: result[1][0],
        emp_deduction_details: result[2][0],
        emp_earning_details: result[3][0],
      },
      message: `Here are the details of ${req.params["e_id"]}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ 
        success: false,
        result: err,
        message: `There is some problem fetching details of - ${req.params["e_id"]}`,
      });
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
      result: err,
    });
  }
}

//  add new emp
async function add_new_emp(req, res) {
  // img processing

  console.log(req.file)
  let imgPath = req.file ? req.file.path : "NULL"; // Use the path of the uploaded file
  let imgstr64 = "NULL";
  if (imgPath !== "NULL") {
    try {
      const imgBuffer = fs.readFileSync(imgPath);
      const imgBase64 = imgBuffer.toString("base64");
      imgstr64 = `data:image/jpeg;base64,${imgBase64}`;
    } catch (err) {
      console.error("Error reading image file:", err);
      return res.status(500).send("Error reading image file");
    }
  }

  // To generate a new e_id
  let new_e_id;
  function incrementString(input) {
    const prefix = input.slice(0, -4);
    const numberPart = input.slice(-4);
    const incrementedNumber = (parseInt(numberPart, 10) + 1).toString().padStart(4, "0");
    return prefix + incrementedNumber;
  }

  const sql1 = "SELECT e_id FROM emp_details ORDER BY e_id ASC";
  try {
    const [results] = await pool.query(sql1);
    new_e_id = incrementString(results[results.length - 1]["e_id"]);
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: "Failed to fetch user data." });
  }

  // Fetching data from req.body

  const data = req.body;
  console.log(data)
  const formattedJoiningDate = await formatDateForMySQL(data.emp_details.e_date_of_joining);
  const formattedDOB = await formatDateForMySQL(data.emp_details.e_DOB);

  const connection = await pool.getConnection(); // Get a new connection
  try {
    await connection.beginTransaction(); // Begin the transaction

    // Insert into emp_details
    const empDetailsQuery = `
      INSERT INTO emp_details (
        e_id, e_name, e_mobile_number, e_gender, e_email, e_address, e_photo, d_id, 
        e_designation, e_group, e_date_of_joining, e_DOB
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(empDetailsQuery, [
      new_e_id,
      data.emp_details.e_name,
      data.emp_details.e_mobile_number,
      data.emp_details.e_gender,
      data.emp_details.e_email,
      data.emp_details.e_address,
      imgstr64,
      data.emp_details.d_id,
      data.emp_details.e_designation,
      data.emp_details.e_group,
      formattedJoiningDate,
      formattedDOB,
    ]);

    // Insert into emp_bank_details
    const empBankQuery = `
      INSERT INTO emp_bank_details (
        e_id, e_name, e_bank_name, e_bank_acc_number, e_pan_number, e_bank_IFSC, e_cpf_or_gpf_number
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(empBankQuery, [
      new_e_id,
      data.emp_bank_details.e_name,
      data.emp_bank_details.e_bank_name,
      data.emp_bank_details.e_bank_acc_number,
      data.emp_bank_details.e_pan_number,
      data.emp_bank_details.e_bank_IFSC,
      data.emp_bank_details.e_cpf_or_gpf_number || null,
    ]);

    // Insert into emp_deduction_details
    const empDeductionQuery = `
      INSERT INTO emp_deduction_details (
        e_id, e_name, leave_days, leave_deduction_amount, deduction_CPF, GIS, 
        house_rent, water_charges, electricity_charges, vehicle_deduction, 
        HB_loan, GPF_loan, festival_loan, grain_charges, bank_advance, advance, 
        RGPV_advance, income_tax, professional_tax
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(empDeductionQuery, [
      new_e_id,
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
    ]);

    // Insert into emp_earning_details
    const empEarningQuery = `
      INSERT INTO emp_earning_details (
        e_id, e_name, basic_salary, special_pay, dearness_allowance, DA, ADA, 
        interim_relief, HRA, CCA, conveyance, medical, washing_allowance, BDP, arrears
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(empEarningQuery, [
      new_e_id,
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
    ]);

    // Commit the transaction
    await connection.commit();

    return res.json({
      success: true,
      message: `Employee added successfully, ${new_e_id} is your E_id.`,
    });
  } catch (err) {
    await connection.rollback(); // Rollback if an error occurs
    console.error("Error adding employee:", err);
    return res.json({
      success: false,
      message: "Failed to add employee.",
      error: err,
    });
  } finally {
    connection.release(); // Release the connection
  }
}


//update the emp
async function update_emp(req, res) {
  console.log(req.body);
  console.log(req.file);

  let imgPath = req.file ? req.file.path : "NULL"; // Use the uploaded file path
  let imgstr64 = imgPath;
  console.log("this is imgpath ------>   "+imgstr64) // Already in base64 format, assign directly


  if (imgPath !== "NULL") {
    // Check if imgPath is already in base64 format
    const isBase64 = /^data:image\/(png|jpeg|jpg|gif);base64,/.test(imgPath);
    console.log("this is isbase64 outside if ------>   "+isBase64) // Already in base64 format, assign directly
    
    if (isBase64) {
      imgstr64 = imgPath;
      console.log("this is imgstr64 ------>   "+imgstr64) // Already in base64 format, assign directly
    } else {
      console.log("this is imgstr64 in to else------>   "+imgstr64) // Already in base64 format, assign directly

      try {
        // Read the file and convert it to base64
        const imgBuffer = fs.readFileSync(imgPath);
        imgstr64 = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;
      } catch (err) {
        console.error("Error reading image file:", err);
        imgstr64 = "NULL";
      }
    }
  }else{
    if(req.body.e_photo!=='Null'){
      imgstr64=req.body.e_photo
    }
  }

  const data = req.body;
  const formattedJoiningDate = formatDateForMySQL(data.emp_details.e_date_of_joining);
  const formattedDOB = formatDateForMySQL(data.emp_details.e_DOB);

  const connection = await pool.getConnection(); // Start a new connection for the transaction

  try {
    await connection.beginTransaction(); // Begin the transaction

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
      imgstr64,
      data.emp_details.d_id,
      data.emp_details.e_designation,
      data.emp_details.e_group,
      formattedJoiningDate,
      formattedDOB,
      data.emp_details.e_id,
    ];
    await connection.query(empDetailsQuery, empDetailsValues);

    // Update emp_bank_details table
    const empBankQuery = `
      UPDATE emp_bank_details 
      SET 
        e_name = ?, e_bank_name = ?, e_bank_acc_number = ?, 
        e_pan_number = ?, e_bank_IFSC = ?, e_cpf_or_gpf_number = ?
      WHERE e_id = ?;
    `;
    const empBankValues = [
      data.emp_details.e_name,
      data.emp_bank_details.e_bank_name,
      data.emp_bank_details.e_bank_acc_number,
      data.emp_bank_details.e_pan_number,
      data.emp_bank_details.e_bank_IFSC,
      data.emp_bank_details.e_cpf_or_gpf_number,
      data.emp_details.e_id,
    ];
    await connection.query(empBankQuery, empBankValues);

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
      data.emp_details.e_name,
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
      data.emp_details.e_id,
    ];
    await connection.query(empDeductionQuery, empDeductionValues);

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
      data.emp_details.e_name,
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
      data.emp_details.e_id,
    ];
    await connection.query(empEarningQuery, empEarningValues);

    // Commit the transaction if all queries are successful
    await connection.commit();

    return res.json({
      success: true,
      message: `Employee - ${data.emp_details.e_id} data updated successfully.`,
      result: true,
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await connection.rollback();
    console.error("Error updating employee data:", error);
    return res.json({
      success: false,
      message: "Error updating employee data.",
      result: error,
    });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}


export {
  get_all_basic__emp_details,
  get_all_e_id_emp_details,
  delete_e_id,
  add_new_emp,
  update_emp,
  check_for_data,
  chk_for_update,
};

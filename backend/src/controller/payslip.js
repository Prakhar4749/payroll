import { pool } from '../config/db.js'; // Adjust the 
// import path
import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

async function chk_that_payslip_is_generated(req, res) {
  const { e_id, salary_month, salary_year } = req.body;

  try {
    const sql = `
        SELECT * 
        FROM salary_archive 
        WHERE e_id = ? AND salary_month = ? AND salary_year = ?
      `;

    const [results] = await pool.query(sql, [e_id, salary_month, salary_year]);

    if (results.length > 0) {
      return res.json({
        success: true,
        message: `Payslip for Employee ID ${e_id} is generated for ${salary_month}, ${salary_year}.`,
        result: { payslip: true }
      });
    } else {
      return res.json({
        success: true,
        message: `Payslip for Employee ID ${e_id} is NOT generated for ${salary_month}, ${salary_year}.`,
        result: { payslip: false }
      });
    }

  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      result: err.message
    });
  }
}


async function chk_emp_id_exist(req, res) {
  const { e_id } = req.params;

  try {
    const sql = `SELECT * FROM emp_details WHERE e_id = ?`;
    const [results, fields] = await pool.query(sql, [e_id]);

    if (results.length > 0) {
      return res.json({
        success: true,
        message: `Employee ID ${e_id} is valid.`,
        result: { e_id: true }
      });
    } else {
      return res.json({
        success: true,
        message: `Employee ID ${e_id} is not valid.`,
        result: { e_id: false }
      });
    }

  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      result: err.message
    });
  }
}
async function update_in_earning_and_save_in_archive(req, res) {
  const data = req.body;

  if (!data.emp_deduction_details || !data.emp_earning_details) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
      result: null
    });
  }

  const { salary_details, emp_deduction_details, emp_earning_details } = data;

  // Get current timestamp
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

  try {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Update emp_deduction_details
    const updateDeductionSQL = `
        UPDATE emp_deduction_details SET
            leave_days = ?, leave_deduction_amount = ?, deduction_CPF = ?, GIS = ?, 
            house_rent = ?, water_charges = ?, electricity_charges = ?, vehicle_deduction = ?, HB_loan = ?, 
            GPF_loan = ?, festival_loan = ?, grain_charges = ?, bank_advance = ?, advance = ?, 
            RGPV_advance = ?, income_tax = ?, professional_tax = ?
        WHERE e_id = ?;
      `;

    const deductionParams = [
      0,
      0,
      parseInt(emp_deduction_details.deduction_CPF) || 0,
      parseInt(emp_deduction_details.GIS) || 0,
      parseInt(emp_deduction_details.house_rent) || 0,
      parseInt(emp_deduction_details.water_charges) || 0,
      parseInt(emp_deduction_details.electricity_charges) || 0,
      parseInt(emp_deduction_details.vehicle_deduction) || 0,
      parseInt(emp_deduction_details.HB_loan) || 0,
      parseInt(emp_deduction_details.GPF_loan) || 0,
      parseInt(emp_deduction_details.festival_loan) || 0,
      parseInt(emp_deduction_details.grain_charges) || 0,
      parseInt(emp_deduction_details.bank_advance) || 0,
      parseInt(emp_deduction_details.advance) || 0,
      parseInt(emp_deduction_details.RGPV_advance || 0),
      parseInt(emp_deduction_details.income_tax) || 0,
      parseInt(emp_deduction_details.professional_tax) || 0,
      emp_deduction_details.e_id
    ];

    await connection.query(updateDeductionSQL, deductionParams);

    // Update emp_earning_details
    const updateEarningSQL = `
        UPDATE emp_earning_details SET
             basic_salary = ?, special_pay = ?, dearness_allowance = ?, DA = ?, ADA = ?, 
            interim_relief = ?, HRA = ?, CCA = ?, conveyance = ?, medical = ?, washing_allowance = ?, 
            BDP = ?, arrears = ?
        WHERE e_id = ?;
      `;

    const earningParams = [
      parseInt(emp_earning_details.basic_salary) || 0,
      parseInt(emp_earning_details.special_pay) || 0,
      parseInt(emp_earning_details.dearness_allowance) || 0,
      parseInt(emp_earning_details.DA) || 0,
      parseInt(emp_earning_details.ADA) || 0,
      parseInt(emp_earning_details.interim_relief) || 0,
      parseInt(emp_earning_details.HRA) || 0,
      parseInt(emp_earning_details.CCA) || 0,
      parseInt(emp_earning_details.conveyance) || 0,
      parseInt(emp_earning_details.medical) || 0,
      parseInt(emp_earning_details.washing_allowance) || 0,
      parseInt(emp_earning_details.BDP) || 0,
      parseInt(emp_earning_details.arrears) || 0,
      emp_earning_details.e_id || "",
    ];

    await connection.query(updateEarningSQL, earningParams);

    // Calculate total earning and deduction
    const total_earning =
      parseInt(emp_earning_details.basic_salary) +
      parseInt(emp_earning_details.special_pay) +
      parseInt(emp_earning_details.dearness_allowance) +
      parseInt(emp_earning_details.DA) +
      parseInt(emp_earning_details.ADA) +
      parseInt(emp_earning_details.interim_relief) +
      parseInt(emp_earning_details.HRA) +
      parseInt(emp_earning_details.CCA) +
      parseInt(emp_earning_details.conveyance) +
      parseInt(emp_earning_details.medical) +
      parseInt(emp_earning_details.washing_allowance) +
      parseInt(emp_earning_details.BDP) +
      parseInt(emp_earning_details.arrears);


    const total_deduction =
      parseInt(emp_deduction_details.leave_deduction_amount) +
      parseInt(emp_deduction_details.deduction_CPF) +
      parseInt(emp_deduction_details.GIS) +
      parseInt(emp_deduction_details.house_rent) +
      parseInt(emp_deduction_details.water_charges) +
      parseInt(emp_deduction_details.electricity_charges) +
      parseInt(emp_deduction_details.vehicle_deduction) +
      parseInt(emp_deduction_details.HB_loan) +
      parseInt(emp_deduction_details.GPF_loan) +
      parseInt(emp_deduction_details.festival_loan) +
      parseInt(emp_deduction_details.grain_charges) +
      parseInt(emp_deduction_details.bank_advance) +
      parseInt(emp_deduction_details.advance) +
      parseInt(emp_deduction_details.RGPV_advance) +
      parseInt(emp_deduction_details.income_tax) +
      parseInt(emp_deduction_details.professional_tax);
    const net_payable = total_earning - total_deduction;

    // Insert into salary_archive
    const insertSalaryArchiveSQL = `
        INSERT INTO salary_archive (
            e_id, salary_month, salary_year, e_name, payslip_issue_date, basic_salary, special_pay, dearness_allowance, DA, ADA, 
            interim_relief, HRA, CCA, conveyance, medical, washing_allowance, BDP, arrears, 
            leave_days, leave_deduction_amount, deduction_CPF, GIS, house_rent, water_charges, 
            electricity_charges, vehicle_deduction, HB_loan, GPF_loan, festival_loan, grain_charges, 
            bank_advance, advance, RGPV_advance, income_tax, professional_tax, total_earning, 
            total_deduction, net_payable
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;

    const archiveParams = [
      salary_details.e_id, salary_details.salary_month, salary_details.salary_year, emp_earning_details.e_name, formattedDate,
      parseInt(emp_earning_details.basic_salary) || 0,
      parseInt(emp_earning_details.special_pay) || 0,
      parseInt(emp_earning_details.dearness_allowance) || 0,
      parseInt(emp_earning_details.DA) || 0,
      parseInt(emp_earning_details.ADA) || 0,
      parseInt(emp_earning_details.interim_relief) || 0,
      parseInt(emp_earning_details.HRA) || 0,
      parseInt(emp_earning_details.CCA) || 0,
      parseInt(emp_earning_details.conveyance) || 0,
      parseInt(emp_earning_details.medical) || 0,
      parseInt(emp_earning_details.washing_allowance) || 0,
      parseInt(emp_earning_details.BDP) || 0,
      parseInt(emp_earning_details.arrears) || 0,
      parseInt(emp_deduction_details.leave_days),
      parseInt(emp_deduction_details.leave_deduction_amount), parseInt(emp_deduction_details.deduction_CPF) || 0,
      parseInt(emp_deduction_details.GIS) || 0,
      parseInt(emp_deduction_details.house_rent) || 0,
      parseInt(emp_deduction_details.water_charges) || 0,
      parseInt(emp_deduction_details.electricity_charges) || 0,
      parseInt(emp_deduction_details.vehicle_deduction) || 0,
      parseInt(emp_deduction_details.HB_loan) || 0,
      parseInt(emp_deduction_details.GPF_loan) || 0,
      parseInt(emp_deduction_details.festival_loan) || 0,
      parseInt(emp_deduction_details.grain_charges) || 0,
      parseInt(emp_deduction_details.bank_advance) || 0,
      parseInt(emp_deduction_details.advance) || 0,
      parseInt(emp_deduction_details.RGPV_advance || 0),
      parseInt(emp_deduction_details.income_tax) || 0,
      parseInt(emp_deduction_details.professional_tax) || 0,
      parseInt(total_earning),
      parseInt(total_deduction),
      parseInt(net_payable)
    ];

    await connection.query(insertSalaryArchiveSQL, archiveParams);

    // Commit transaction
    await connection.commit();
    connection.release();

    return res.json({
      success: true,
      message: "Employee salary details updated and archived successfully.",
      result: {
        e_id: salary_details.e_id,
        salary_month: salary_details.salary_month,
        salary_year: salary_details.salary_year,
        total_earning,
        total_deduction,
        net_payable
      }
    });

  } catch (err) {
    console.error("Error updating salary details:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      result: err.message
    });
  }
}


const get_data_for_pdf = async (req, res) => {
  const { e_id, salary_month, salary_year } = req.body;

  try {
    // Fetching employee details
    const sql_emp_details = `SELECT * FROM emp_details WHERE e_id = ?`;
    const [emp_details, emp_fields] = await pool.query(sql_emp_details, [e_id]);

    if (emp_details.length === 0) {
      return res.json({
        success: false,
        message: "Employee not found.",
        result: null
      });
    }

    // Fetching department details
    const sql_dept_details = `SELECT * FROM dept_details WHERE d_id = ?`;
    const [dept_details, dept_fields] = await pool.query(sql_dept_details, [emp_details[0].d_id]);

    // Fetching employee bank details
    const sql_bank_details = `SELECT * FROM emp_bank_details WHERE e_id = ?`;
    const [bank_details, bank_fields] = await pool.query(sql_bank_details, [e_id]);

    // Fetching salary archive details
    const sql_archive_details = `SELECT * FROM salary_archive WHERE e_id = ? AND salary_month = ? AND salary_year = ?`;
    const [salary_details, salary_fields] = await pool.query(sql_archive_details, [e_id, salary_month, salary_year]);

    if (salary_details.length === 0) {
      return res.json({
        success: false,
        message: `No salary record found for ${salary_month}, ${salary_year}.`,
        result: null
      });
    }

    return res.json({
      success: true,
      message: "Data fetched successfully.",
      result: {
        emp_details: emp_details.length > 0 ? emp_details[0] : null,
        dept_details: dept_details.length > 0 ? dept_details[0] : null,
        bank_details: bank_details.length > 0 ? bank_details[0] : null,
        salary_details: salary_details.length > 0 ? salary_details[0] : null
      }
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      result: err.message
    });
  }
};


const send_pdf_to_email = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    // Validate required fields
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ success: false, message: "Missing required fields!" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ success: false, message: "Invalid email address format!" });
    }

    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF file is required!" });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: req.file.originalname, // Keep the original filename
          content: req.file.buffer, // Use file buffer from memoryStorage
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    const info = transporter.sendMail(mailOptions);

    // console.log("Email sent: ", info.response); 
    res.json({ success: true, message: "Email with PDF attachment sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
};

export default send_pdf_to_email;

export { chk_that_payslip_is_generated, chk_emp_id_exist, update_in_earning_and_save_in_archive, get_data_for_pdf, send_pdf_to_email };



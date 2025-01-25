import { pool } from '../config/db.js'; // Adjust the import path

async function chk_that_payslip_is_generated(req, res) {
    const { e_id, salary_month , salary_year } = req.body;
  

  try {
    const sql = `
      SELECT *
      FROM salary_archive 
      WHERE e_id = ? AND salary_month = ? AND salary_year = ?
    `;

    const [results, fields] = await pool.query(sql, [e_id, salary_month, salary_year]);

    if (results.length > 0) {
      return res.json({ message: `Payslip for ${e_id} is generated for ${salary_month}, ${salary_year}.`, payslipGenerated: true });
    } else {
      return res.json({ message: `Payslip for ${e_id} is NOT generated for ${salary_month}, ${salary_year}.`, payslipGenerated: false });
    }

  } catch (err) {
    console.error('Database query error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function update_and_change_in_the_salary_archive(req, res) {
    const data = req.body;

    if (!data.emp_deduction_details || !data.emp_earning_details) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const { salary_details , emp_deduction_details, emp_earning_details } = data;

    //  salary_details{
    // e_id,
    // salary_month,
    // salary_year
    // }

    // Get current month and year
    const now = new Date();

    // Extract components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDate);
    

    try {
        // Start a transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // SQL to update emp_deduction_details
        const updateDeductionSQL = `
            UPDATE emp_deduction_details SET
                e_name = ?, leave_days = ?, leave_deduction_amount = ?, deduction_CPF = ?, GIS = ?, 
                house_rent = ?, water_charges = ?, electricity_charges = ?, vehicle_deduction = ?, HB_loan = ?, 
                GPF_loan = ?, festival_loan = ?, grain_charges = ?, bank_advance = ?, advance = ?, 
                RGPV_advance = ?, income_tax = ?, professional_tax = ?
            WHERE e_id = ?;
        `;

        const deductionParams = [
            emp_deduction_details.leave_days, emp_deduction_details.leave_deduction_amount,
            emp_deduction_details.deduction_CPF, emp_deduction_details.GIS, emp_deduction_details.house_rent,
            emp_deduction_details.water_charges, emp_deduction_details.electricity_charges, emp_deduction_details.vehicle_deduction,
            emp_deduction_details.HB_loan, emp_deduction_details.GPF_loan, emp_deduction_details.festival_loan,
            emp_deduction_details.grain_charges, emp_deduction_details.bank_advance, emp_deduction_details.advance,
            emp_deduction_details.RGPV_advance, emp_deduction_details.income_tax, emp_deduction_details.professional_tax,
            emp_deduction_details.e_id
        ];

        await connection.query(updateDeductionSQL, deductionParams);

        // SQL to update emp_earning_details
        const updateEarningSQL = `
            UPDATE emp_earning_details SET
                 basic_salary = ?, special_pay = ?, dearness_allowance = ?, DA = ?, ADA = ?, 
                interim_relief = ?, HRA = ?, CCA = ?, conveyance = ?, medical = ?, washing_allowance = ?, 
                BDP = ?, arrears = ?
            WHERE e_id = ?;
        `;

        const earningParams = [
            emp_earning_details.basic_salary, emp_earning_details.special_pay,
            emp_earning_details.dearness_allowance, emp_earning_details.DA, emp_earning_details.ADA,
            emp_earning_details.interim_relief, emp_earning_details.HRA, emp_earning_details.CCA,
            emp_earning_details.conveyance, emp_earning_details.medical, emp_earning_details.washing_allowance,
            emp_earning_details.BDP, emp_earning_details.arrears, emp_earning_details.e_id
        ];

        await connection.query(updateEarningSQL, earningParams);

        // Calculate total earning and deduction
        const total_earning = emp_earning_details.basic_salary + emp_earning_details.special_pay +
            emp_earning_details.dearness_allowance + emp_earning_details.DA + emp_earning_details.ADA +
            emp_earning_details.interim_relief + emp_earning_details.HRA + emp_earning_details.CCA +
            emp_earning_details.conveyance + emp_earning_details.medical + emp_earning_details.washing_allowance +
            emp_earning_details.BDP + emp_earning_details.arrears;

        const total_deduction = emp_deduction_details.leave_deduction_amount + emp_deduction_details.deduction_CPF +
            emp_deduction_details.GIS + emp_deduction_details.house_rent + emp_deduction_details.water_charges +
            emp_deduction_details.electricity_charges + emp_deduction_details.vehicle_deduction +
            emp_deduction_details.HB_loan + emp_deduction_details.GPF_loan + emp_deduction_details.festival_loan +
            emp_deduction_details.grain_charges + emp_deduction_details.bank_advance + emp_deduction_details.advance +
            emp_deduction_details.RGPV_advance + emp_deduction_details.income_tax + emp_deduction_details.professional_tax;

        const net_payable = total_earning - total_deduction;
 
        // SQL to insert into salary_archive
        const insertSalaryArchiveSQL = `
            INSERT INTO salary_archive (
                e_id, salary_month, salary_year, e_name, paslip_issue_date , basic_salary, special_pay, dearness_allowance, DA, ADA, 
                interim_relief, HRA, CCA, conveyance, medical, washing_allowance, BDP, arrears, 
                leave_days, leave_deduction_amount, deduction_CPF, GIS, house_rent, water_charges, 
                electricity_charges, vehicle_deduction, HB_loan, GPF_loan, festival_loan, grain_charges, 
                bank_advance, advance, RGPV_advance, income_tax, professional_tax, total_earning, 
                total_deduction, net_payable
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const archiveParams = [
            salary_details.e_id, salary_details.salary_month, salary_details.salary_year, emp_earning_details.e_name, formattedDate,
            emp_earning_details.basic_salary, emp_earning_details.special_pay, emp_earning_details.dearness_allowance,
            emp_earning_details.DA, emp_earning_details.ADA, emp_earning_details.interim_relief, emp_earning_details.HRA,
            emp_earning_details.CCA, emp_earning_details.conveyance, emp_earning_details.medical, emp_earning_details.washing_allowance,
            emp_earning_details.BDP, emp_earning_details.arrears, emp_deduction_details.leave_days,
            emp_deduction_details.leave_deduction_amount, emp_deduction_details.deduction_CPF, emp_deduction_details.GIS,
            emp_deduction_details.house_rent, emp_deduction_details.water_charges, emp_deduction_details.electricity_charges,
            emp_deduction_details.vehicle_deduction, emp_deduction_details.HB_loan, emp_deduction_details.GPF_loan,
            emp_deduction_details.festival_loan, emp_deduction_details.grain_charges, emp_deduction_details.bank_advance,
            emp_deduction_details.advance, emp_deduction_details.RGPV_advance, emp_deduction_details.income_tax,
            emp_deduction_details.professional_tax, total_earning, total_deduction, net_payable
        ];

        await connection.query(insertSalaryArchiveSQL, archiveParams);

        // Commit transaction
        await connection.commit();
        connection.release();

        return res.json({ message: "Employee salary details updated and archived successfully." });

    } catch (err) {
        console.error("Error updating salary details:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

const get_data_for_pdf = async (req ,res) =>{
    const { e_id , salary_month , salary_year } = req.body;

    try{
        // fetching emp details 
        const sql_emp_details =`SELECT * FROM emp_details WHERE e_id = ?`;

        const [emp_details, emp_fields] = await pool.query(sql_emp_details, [e_id])


        // fetching dept details 
        const sql_dept_details =`SELECT * FROM dept_details WHERE d_id = ?`;

        const [dept_details, dept_fields] = await pool.query(sql_dept_details, [emp_details[0].d_id])


        // fetching emp bank details 
        const sql_bank_details =` SELECT * FROM emp_bank_details WHERE e_id = ?`;

        const [bank_details, bank_fields] = await pool.query(sql_bank_details, [e_id])


        // fetching salary archive details 
        const sql_archive_details =` SELECT * FROM salary_archive WHERE e_id = ? AND salary_month = ? AND salary_year = ?`;

        const [salary_details, salary_fields] = await pool.query(sql_archive_details, [e_id, salary_month, salary_year]);

        return res.json({
            emp_details: emp_details[0],
            dept_details: dept_details[0],
            bank_details: bank_details[0],
            salary_details: salary_details[0]
        })
    }
    catch{
        res.json({ err_: err });
    }

}
export { chk_that_payslip_is_generated , update_and_change_in_the_salary_archive ,get_data_for_pdf };



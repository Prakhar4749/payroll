import { checkConnection, pool } from '../config/db.js';

// to export all emp_details
async function get_all_emp_details(req,res){
    const sql = "SELECT * FROM emp_details";
    try {
        const [results, fields] = await pool.query(sql);
        // Clean the fields to include only necessary information
        const sanitizedFields = fields.map(field => ({
            name: field.name,
            type: field.type,
            
        }));

        res.json({ results});

    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch user data." });
    }
}

// for geting detail by e_id the emp_details
async function get_e_id_emp_details(req,res) {
    const  sql = `SELECT * FROM emp_details  WHERE e_id = '${req.params['e_id']}'`
    const [results, fildes] = await pool.query(sql)

    res.json(results);
}



export {
    get_all_emp_details , get_e_id_emp_details
}
import { pool } from '../config/db.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "admin";

async function get_all_dept_details(req, res) {
    
    try {
       

        const sql = `SELECT * FROM dept_details`;
        const [results,fields] = await pool.query(sql);
        const sanitizedFields = fields.map((field) => ({
          name: field.name,
          type: field.type,
        }));

        return res.json(results);
      } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch department data." });
      }
}


async function get_d_id_details(req, res) {

  const { d_id }= req.params
    
    try {
        const sql = `SELECT * FROM dept_details WHERE d_id = ?`;
        const [results,fields] = await pool.query(sql,[d_id]);
        const sanitizedFields = fields.map((field) => ({
          name: field.name,
          type: field.type,
        }));

        return res.json(results);
      } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch department data." });
      }
}


async function delete_d_id(req, res) {
  const { d_id }= req.body;
    try {
       

        const sql = `DELETE FROM dept_details WHERE d_id =?`;
        await pool.query(sql,[d_id]);

        res.json("the given department has been deleted");  
      } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch department data." });
      }
}


async function add_new_dept(req, res) {
  const { d_id, d_name} = req.body;
    
    try {
       

        const sql = `INSERT INTO  dept_details
         (d_id,d_name)
          values
          (?,?);`;
        await pool.query(sql,[d_id, d_name]);
        

        res.json("the given department has been added");
      } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch department data." });
      }
}


async function update_dept(req, res) {

  const {d_id , new_d_id, new_d_name } = req.body

  if (!new_d_id || !new_d_name) {
    return res.status(400).json({ error: "please enter valid new departmentid and  name " });
  }
    try {
        const sql = `UPDATE dept_details SET d_id = ?, d_name = ? WHERE d_id = ?`;
        await pool.query(sql,[new_d_id, new_d_name, d_id]);
      
        res.json("department details has been updated succesfully");
      } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch department data." });
      }
}



async function chk_isit_present(req, res) {
  let { d_id, d_name } = req.body;  // Destructure incoming data
  console.log("Received data:", req.body);

  // Remove spaces and convert to uppercase
  d_id = d_id.replace(/\s/g, "").toUpperCase();
  d_name = d_name.replace(/\s/g, "").toUpperCase();

  try {
    const sql = `
      SELECT COUNT(*) AS d_id_count FROM dept_details WHERE UPPER(REPLACE(d_id, ' ', '')) = ?;
      SELECT COUNT(*) AS d_name_count FROM dept_details WHERE UPPER(REPLACE(d_name, ' ', '')) = ?;
    `;

    const [results] = await pool.query(sql, [d_id, d_name]);

    // Accessing the correct structure based on query execution
    const d_id_exists = results[0][0].d_id_count > 0;
    const d_name_exists = results[1][0].d_name_count > 0;

    res.json({
      d_id: d_id_exists,
      d_name: d_name_exists,
      message: `D_ID exists: ${d_id_exists}, D_Name exists: ${d_name_exists}`
    });

  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Database query failed", details: err.message });
  }
}





export {
    get_all_dept_details , get_d_id_details , delete_d_id , add_new_dept, update_dept , chk_isit_present
}  
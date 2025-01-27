import { pool } from '../config/db.js';



const SECRET_KEY = process.env.DB_HOST;

async function get_all_dept_details(req, res) {
    
    try {
       

        const sql = `SELECT * FROM dept_details`;
        const [results,fields] = await pool.query(sql);
        const sanitizedFields = fields.map((field) => ({
          name: field.name,
          type: field.type,
        }));

        return res.json({
          success: true ,
          message:"data has been fetched successfully",
          result: results
        });
      } catch (err) {
        console.error("Database query error:", err);
        return res.json({
          success: false ,
          message:"error in fetching details",
          result: err
        });
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

        return res.json({
          success: true ,
          message:"data has been fetched successfully",
          result: results
        });
      } catch (err) {
        console.error("Database query error:", err);
        return res.json({
          success: false ,
          message:"error in fetching details",
          result: err
        });
      }
}


async function delete_d_id(req, res) {
  const { d_id }= req.params;
    try {
       

        const sql = `DELETE FROM dept_details WHERE d_id =?`;
        await pool.query(sql,[d_id]);

        return res.json({
          success: true ,
          message:"the department has been deleted",
          result: d_id
        });
      } catch (err) {
        console.error("Database query error:", err);
        return res.json({
          success: false ,
          message:"error in deleting department",
          result: err
        });
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
        

        return res.json({
          success: true ,
          message:"the given department has been added",
          result: ""
        });
      } catch (err) {
        console.error("Database query error:", err);
        return res.json({ success: false ,
          message:"the given department has been added",
          result: ""
        });
      }
}


async function update_dept(req, res) {

  const {d_id , new_d_id, new_d_name } = req.body

  if (!new_d_id || !new_d_name) {
    return res.status(400).json({
      success: false,
      message: "please enter valid new department ID and name",
      result: error
  });
  }
    try {
        const sql = `UPDATE dept_details SET d_id = ?, d_name = ? WHERE d_id = ?`;
        await pool.query(sql,[new_d_id, new_d_name, d_id]);
      
        return res.json({
          success: true ,
          message:"the department details has been updated successfully",
          result: ""
        });
      } catch (err) {
        console.error("Database query error:", err);
        return res.json({
          success: false ,
          message:"error in updating details",
          result: err
        });
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

    
    return res.json({
      success: true ,
      message:"d_id exit ",
      result: {
        d_id: d_id_exists,
        d_name: d_name_exists
      }
    });
  } catch (err) {
    console.error("Database query error:", err);
    return res.json({
      success: false ,
      message:"d_id does not exist",
      result: {
        d_id: d_id_exists,
        d_name: d_name_exists
      }
    });
  }
}





export {
    get_all_dept_details , get_d_id_details , delete_d_id , add_new_dept, update_dept , chk_isit_present
}  
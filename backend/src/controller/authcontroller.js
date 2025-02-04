import { pool } from '../config/db.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "admin";

async function register_user(req, res) {
    const { user_name, user_password } = req.body;

    // Check if username and password are provided
    if (!user_name || !user_password) {
        return res.status(400).json({
            success: false,
            message: "user_name and user_password are required",
            result: ""
        });
    }

    try {
        // Check if the username already exists in the database
        const sql1 = `SELECT COUNT(*) AS user_name FROM user_login_details WHERE user_name= '${user_name}'`;
        const [re1] = await pool.query(sql1);

        if (re1[0].user_name > 0) {
            return res.json({
                success: false,
                message: "Username already exists",
                result: false
            });
        }
    } catch (err) {
        console.error("Database query error:", err);
        return res.json({
            success: false,
            message: "Error checking username availability",
            result: err
        });
    }

    try {
        // Hash the password before storing it in the database
        const hashed_password = await bcrypt.hash(user_password, 10);

        // Insert new user into the database
        const sql = `INSERT INTO user_login_details (user_name, user_password) VALUES (?, ?)`;
        await pool.query(sql, [user_name, hashed_password]);

        return res.json({
            success: true,
            message: "User registered successfully",
            result: ""
        });
    } catch (err) {
        console.error("Database query error:", err);
        return res.json({
            success: false,
            message: "Error during registration",
            result: err
        });
    }
}



async function change_password(req, res) {
    const { user_name, current_password, new_password
    } = req.body;

    if (!new_password || !current_password) {
        return res.status(400).json({
            success: false,
            message: "please enter valid current and new password ",
            result: error
        });
    }
    if (new_password === current_password) {
        return res.status(400).json({
            success: false,
            message: "current and new password cant be same",
            result: error
        });
    }
    const sql_get_password = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {

        const [results] = await pool.query(sql_get_password, [user_name]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                result: error
            });
        }

        const user = results[0];



        const isMatch = await bcrypt.compare(current_password, user.user_password);



        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid current password",
                result: error
            });
        }

        const hashed_password = await bcrypt.hash(new_password, 10);

        const sql_change_password = `UPDATE user_login_details SET user_password = ? WHERE user_name = ?`;
        await pool.query(sql_change_password, [hashed_password, user_name]);



        return res.json({
            success: true,
            message: "Password changed succesfully",
            result: ""
        });
    } catch (err) {
        console.error("Database query error:", err);
        return res.json({
            success: false,
            message: "Error in changing password ",
            result: err
        });
    }
}

async function change_user_name(req, res) {
    const { current_user_name, new_user_name, user_password
    } = req.body;

    if (!new_user_name || !user_password) {
        return res.status(400).json({
            success: false,
            message: "please enter valid new user name and password ",
            result: error
        });
    }
    if (new_user_name === current_user_name) {
        return res.status(400).json({
            success: false,
            message: "current and new username cant be same",
            result: error
        });
    }

    // for chk that user name is present or not

    try{
        const sql1=`SELECT COUNT(*) AS user_name FROM user_login_details Where user_name= ${user_name} `;
        const [re1] = await pool.query(sql1)

        if(results[0][0].user_name > 0){
            return res.json({
                success: false,
                message: "user name alrady exist ...",
                result: false
            }); 
        }

    }catch(err){
        console.error("Database query error:", err);
        return res.json({
            success: false,
            message: "Error during changinf usename:",
            result: err
        });
    }

    const sql_get_password = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {

        const [results] = await pool.query(sql_get_password, [current_user_name]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                result: error
            });
        }

        const user = results[0];



        const isMatch = await bcrypt.compare(user_password, user.user_password);



        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: " invalid  password",
                result: error
            });
        }



        const sql_change_user_name = `UPDATE user_login_details SET user_name = ? WHERE user_name = ?`;
        await pool.query(sql_change_user_name, [new_user_name, current_user_name]);



        return res.json({
            success: true,
            message: "User name changed succesfully",
            result: ""
        });
    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
            success: false,
            message: "Error during change username ",
            result: err
        });
    }
}


async function login_user(req, res) {
    const { user_name, user_password } = req.body;

    // Validate input
    if (!user_name || !user_password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required",
        });
    }

    
    try {
        const sql = `SELECT * FROM user_login_details WHERE user_name = ?`;
        const [results] = await pool.query(sql, [user_name]);

        // If user does not exist
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const user = results[0];

        // Ensure password exists before comparing
        if (!user.user_password) {
            return res.status(500).json({
                success: false,
                message: "User password is missing in the database",
            });
        }

        // Compare passwords securely
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password! Please enter the correct password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ name: user.user_name }, SECRET_KEY, { expiresIn: "1h" });

        return res.json({
            success: true,
            message: "Login Successful!",
            result: { token, user_name },
        });

    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
            success: false,
            message: "Error during login",
            result: err.message, // Send only error message for security
        });
    }
}



async function getallusers(req,res) {
   const sql = 'select * from user_login_details '

   const [r,f]  = await pool.query(sql)

   res.json(r);

    
}

export {
    login_user, register_user, change_password, change_user_name , getallusers
}
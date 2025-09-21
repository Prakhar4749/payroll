// ./controller/authcontroller.js


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
    const { user_name, current_password, new_password } = req.body;

    // Check if passwords are provided
    if (!new_password || !current_password) {
        return res.json({
            success: false,
            message: "Please enter valid current and new passwords.",
        });
    }

    // Check if the new password is the same as the current one
    if (new_password === current_password) {
        return res.json({
            success: false,
            message: "Current and new passwords cannot be the same.",
        });
    }

    // Query to get the user from the database
    const sql_get_password = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {
        // Retrieve the user details based on the username
        const [results] = await pool.query(sql_get_password, [user_name]);

        if (results.length === 0) {
            return res.json({
                success: false,
                message: "User not found.",
            });
        }

        const user = results[0];

        // Compare the current password with the stored hashed password
        const isMatch = await bcrypt.compare(current_password, user.user_password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid current password.",
            });
        }

        // Hash the new password
        const hashed_password = await bcrypt.hash(new_password, 10);

        // Update the password in the database
        const sql_change_password = `UPDATE user_login_details SET user_password = ? WHERE user_name = ?`;
        await pool.query(sql_change_password, [hashed_password, user_name]);

        return res.json({
            success: true,
            message: "Password changed successfully.",
        });
    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
            success: false,
            message: "Error in changing password.",
            result: err,  // Provide the error message instead of 'error'
        });
    }
}


async function change_user_name(req, res) {
    const { current_user_name, new_user_name, user_password } = req.body;

    // Check if required fields are provided
    if (!new_user_name || !user_password) {
        return res.json({
            success: false,
            message: "Please enter a valid new username and password.",
        });
    }

    // Check if the current username is the same as the new username
    if (new_user_name === current_user_name) {
        return res.json({
            success: false,
            message: "Current and new usernames cannot be the same.",
        });
    }

    // Check if the new username already exists in the database
    try {
        const sql_check_user_name = `SELECT COUNT(*) AS user_count FROM user_login_details WHERE user_name = ?`;
        const [checkResult] = await pool.query(sql_check_user_name, [new_user_name]);

        if (checkResult[0].user_count > 0) {
            return res.json({
                success: false,
                message: "Username already exists.",
            });
        }
    } catch (err) {
        console.error("Database query error:", err);
        return res.json({
            success: false,
            message: "Error checking username availability.",
            result: err,
        });
    }

    // Get user details based on current username
    const sql_get_user = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {
        const [userResults] = await pool.query(sql_get_user, [current_user_name]);

        if (userResults.length === 0) {
            return res.json({
                success: false,
                message: "User not found.",
            });
        }

        const user = userResults[0];

        // Compare the provided password with the stored password
        const isMatch = await bcrypt.compare(user_password, user.user_password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password.",
            });
        }

        // Update the username in the database
        const sql_update_user_name = `UPDATE user_login_details SET user_name = ? WHERE user_name = ?`;
        await pool.query(sql_update_user_name, [new_user_name, current_user_name]);

        return res.json({
            success: true,
            message: "Username changed successfully.",
        });
    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
            success: false,
            message: "Error during username change.",
            result: err,
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


async function delete_user(req, res) {
    const { user_name, password } = req.params;
    // console.log(user_name )
    // console.log(password )

    // console.log("Attempting to delete user:", user_name);

    try {
        // Check if user exists and get stored hashed password
        const userQuery = "SELECT user_password FROM user_login_details WHERE user_name = ?";
        const [rows] = await pool.query(userQuery, [user_name]);

        if (rows.length === 0) {
            return res.json({
                success: false,
                message: "User not found",
            }); 
        }

        const storedPassword = rows[0].user_password;

        // Compare passwords (assuming stored passwords are hashed)
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);

        if (!isPasswordMatch) {
            return res.json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Delete the user if password matches
        const deleteQuery = "DELETE FROM user_login_details WHERE user_name = ?";
        await pool.query(deleteQuery, [user_name]);

        return res.json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


export {
    login_user, register_user, change_password, change_user_name , getallusers , delete_user
}
import { pool } from '../config/db.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "admin";

async function register_user(req, res) {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
        return res.status(400).json({ error: "user_name and user_password are required" });
    }
    try {
        // Hash the password
        const hashed_password = await bcrypt.hash(user_password, 10);

        const sql = `INSERT INTO user_login_details (user_name, user_password) VALUES (?, ?)`;
        await pool.query(sql, [user_name, hashed_password]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
}


async function change_password(req, res) {
    const { user_name, current_password, new_password
     } = req.body;

    if (!new_password || !current_password) {
        return res.status(400).json({ error: "please enter valid current and new password" });
    }
    if (new_password === current_password) {
        return res.status(400).json({ error: "current and new password can't be same " });
    }

    const sql_get_password = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {
        
        const [results] = await pool.query(sql_get_password, [user_name]);

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
     
        
     
        const isMatch = await bcrypt.compare(current_password, user.user_password);
    
        
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid current password" });
        }

        const hashed_password = await bcrypt.hash(new_password, 10);

        const sql_change_password = `UPDATE user_login_details SET user_password = ? WHERE user_name = ?`;
        await pool.query(sql_change_password, [ hashed_password, user_name]);



        res.json({ message: "password changed succesfully" });
    } catch (error) {
        console.error("Error during changing password:", error);
        res.status(500).json({ error: "Server error" });
    }
}

async function change_user_name(req, res) {
    const { current_user_name,new_user_name, user_password
     } = req.body;

    if (!new_user_name || !user_password) {
        return res.status(400).json({ error: "please enter valid new user name and password" });
    }
    if (new_user_name === current_user_name) {
        return res.status(400).json({ error: "current and new user name can't be same " });
    }

    const sql_get_password = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {
        
        const [results] = await pool.query(sql_get_password, [current_user_name]);

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
     
        
     
        const isMatch = await bcrypt.compare(user_password, user.user_password);
    
        
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

       

        const sql_change_user_name = `UPDATE user_login_details SET user_name = ? WHERE user_name = ?`;
        await pool.query(sql_change_user_name, [ new_user_name, current_user_name]);



        res.json({ message: "user name changed succesfully" });
    } catch (error) {
        console.error("Error during changing user name:", error);
        res.status(500).json({ error: "Server error" });
    }
}



async function login_user(req, res) {
    const { user_name, user_password } = req.body;

    // Validate input
    if (!user_name || !user_password) {
        return res.status(400).json({ error: "user_name and user_password are required" });
    }

    const sql = `SELECT * FROM user_login_details WHERE user_name = ?`;

    try {
        
        const [results] = await pool.query(sql, [user_name]);

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
     
        
     
        const isMatch = await bcrypt.compare(user_password, user.user_password);
    
        
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

   
        const token = jwt.sign(
            { name: user.user_name, }, // Include necessary fields
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export {
    login_user, register_user, change_password, change_user_name
}
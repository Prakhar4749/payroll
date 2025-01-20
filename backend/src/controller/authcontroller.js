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
    login_user, register_user 
}
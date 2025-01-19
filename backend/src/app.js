import express, { json } from'express'; 
import { checkConnection, pool } from './config/db.js';

const app = express();
app.listen(3003, async()=>{
    try {
        await checkConnection();
        console.log('Server is running on port 3000 and database connection is established.');
    } catch (error) {
        console.log("failed to initialize connection", error);
        
    }

});

app.get("/getuser", async (req, res) => {
    const sql = "SELECT * FROM emp_details";
    try {

        const data = await pool.query(sql);

        
        res.json(data);
        console.log(data);
        
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch user data." });
        
    }
    
    
});

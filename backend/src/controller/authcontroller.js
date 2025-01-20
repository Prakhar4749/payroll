import { checkConnection, pool } from '../config/db.js';


async function get_by_user_name(req,res) {
    const  sql = `SELECT * FROM user_login_details  WHERE user_name = '${req.params['user_name']}'`
    try {
        const [results, fildes] = await pool.query(sql)

        res.json(results);
    } catch (error) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "Failed to fetch user data." });
        
    }
    ;
}
export {
    get_by_user_name
}
import pool from "../config/db.js";

const findUserByUsername = (user_name, callback) => {
  const query = "SELECT * FROM user_login_details WHERE user_name = ?";
  pool.query(query, [user_name], callback);
};

export {findUserByUsername}
// src/middleware/CheckDbMiddleware.js


import { checkConnection } from "../config/db.js";

// Middleware to check database connection
let lastChecked = null;
let isDbConnected = false;

const checkDbMiddleware = async (req, res, next) => {
  const now = Date.now();

  // Only re-check the database every 30 seconds
  if (!lastChecked || now - lastChecked > 30000) {
    try {
      await checkConnection();
      isDbConnected = true;
      console.log('Database connection is healthy.');
    } catch (error) {
      isDbConnected = false;
      console.error('Database connection failed:', error);
    }
    lastChecked = now;
  }

  if (!isDbConnected) {
    return res.status(500).json({ error: 'Database connection failed.' });
  }

  next(); // Proceed to the next middleware or route handler
};

export{
    checkDbMiddleware
}
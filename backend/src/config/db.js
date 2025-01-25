import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool=mysql2.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true,
    multipleStatements: true,   // Enable multiple statements
    port:3306
});

const checkConnection=async() => {
    try{
        const connection=await pool.getConnection();
        console.log("we are connected to database");
        connection.release();

    }
    catch(error){
        console.log("not connected ");
        throw error;


    }
    
}

export {pool,checkConnection};
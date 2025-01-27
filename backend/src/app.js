import express from'express'; 
import { checkConnection, pool } from './config/db.js';
import emproute from "./routes/emp.js"
import authroute from "./routes/authroutes.js"
import deptroute from "./routes/dept.js"
import payslipRoute from "./routes/payslip.js"
import cors from"cors";





const PORT  = process.env.BACKEND_PORT
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use('/auth' , authroute)
app.use('/emp' , emproute)
app.use('/dept' , deptroute)
app.use('/payslip' , payslipRoute)





app.listen(PORT, async()=>{
    try {
        await checkConnection().then(()=>{
            console.log(`database connection is established.`)
        })

        console.log(`Server is running on port ${PORT} ...`);
    } catch (error) {
        console.log("failed to initialize connection", error);
        
    }

});


 
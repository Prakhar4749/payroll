import express from'express'; 
import { checkDbMiddleware } from './middleware/CheckDbMiddleware.js';
import emproute from "./routes/emp.js"
import authroute from "./routes/authroutes.js"
import deptroute from "./routes/dept.js"
import payslipRoute from "./routes/payslip.js"
import cors from"cors";





const app = express();
const PORT  = process.env.BACKEND_PORT 


//using middlewares globally 
app.use(checkDbMiddleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use('/auth' , authroute)
app.use('/emp' , emproute)
app.use('/dept' , deptroute)
app.use('/payslip' , payslipRoute)





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });


 
import express from "express";
import {chk_that_payslip_is_generated , get_data_for_pdf, update_and_change_in_the_salary_archive} from "../controller/payslip.js"
const route=express.Router()




route.post("/isit" , chk_that_payslip_is_generated)

route.put('/create_payslip' , update_and_change_in_the_salary_archive )

route.post("/get_pdf", get_data_for_pdf)






export default route; 
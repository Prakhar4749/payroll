import express from "express";
import {chk_that_payslip_is_generated , update_and_change_in_the_salary_archive} from "../controller/payslip.js"
const route=express.Router()




route.post("/isit/" , chk_that_payslip_is_generated)

route.put('/' , update_and_change_in_the_salary_archive )






export default route; 
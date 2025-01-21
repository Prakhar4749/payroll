import express from "express";
import {chk_that_payslip_is_generated , update_and_change_in_the_salary_archive} from "../controller/payslip.js"
const route=express.Router()



// if this give true then fatch the "emp all data" otherwise call  "emp all data" and then call the  "put " to first time ganaration of data
route.get("/isit/:e_id" , chk_that_payslip_is_generated)

route.put('/' , update_and_change_in_the_salary_archive )






export default route; 
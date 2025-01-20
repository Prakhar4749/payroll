import express from 'express'
import {get_all_basic__emp_details ,get_all_e_id_emp_details , delete_e_id ,add_new_emp, update_emp ,check_for_data } from '../controller/emp.js'


const route = express.Router();


//  for geting all the emp_details
// route.get("/",get_all_basic__emp_details);


//  for geting detail by e_id the emp_details
route.get("/:e_id",get_all_e_id_emp_details);


// to delete the emp by the e_id from tables (emp_details, emp_bank_details,emp_deduction_details ,emp_earning_details)
route.delete("/:e_id" , delete_e_id)

// to add new emp to database ini tables (emp_details, emp_bank_details,emp_deduction_details ,emp_earning_details) 
// post should be in formate { "emp_details": {...} , "emp_deduction_details": {...} ..... }
route.post('/' , add_new_emp)

// for updating the data of emp
route.put('/:e_id',update_emp)


route.get("/", check_for_data )


export default route;

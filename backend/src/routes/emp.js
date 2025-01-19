import express from 'express'
import {get_all_emp_details ,get_e_id_emp_details} from '../controller/emp.js'


const route = express.Router();


//  for geting all the emp_details
route.get("/",get_all_emp_details);


//  for geting detail by e_id the emp_details
route.get("/:e_id",get_e_id_emp_details);


export default route;

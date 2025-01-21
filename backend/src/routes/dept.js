import express from 'express'
import {get_all_dept_details ,get_d_id_details , delete_d_id ,add_new_dept, update_dept } from '../controller/dept.js'


const route = express.Router();



route.get("/",get_all_dept_details);


route.get("/d_id",get_d_id_details);


route.delete("/delete_d_id" , delete_d_id)


route.post('/add_dept' , add_new_dept)


route.put('/update_d_id',update_dept)


export default route;

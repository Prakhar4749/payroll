import express from "express";
import path from "path";
import {chk_that_payslip_is_generated , chk_emp_id_exist , get_data_for_pdf, update_in_earning_and_save_in_archive,send_pdf_to_email} from "../controller/payslip.js"
import multer from "multer";

const route = express.Router();

const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage });




route.post("/isit" , chk_that_payslip_is_generated)

route.get("/isit/:e_id" , chk_emp_id_exist)

route.put('/create_payslip' , update_in_earning_and_save_in_archive );

route.post("/get_pdf", get_data_for_pdf)

route.post("/send_email", upload.single("file"), send_pdf_to_email)






export default route; 
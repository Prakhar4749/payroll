// src/routes/emp.js
import express from 'express'
import {get_all_basic__emp_details ,get_all_e_id_emp_details , delete_e_id ,add_new_emp, update_emp ,check_for_data , chk_for_update } from '../controller/emp.js'
import path from 'path'
import multer from "multer";

const route = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "src/upload");  // Make sure 'src/upload' folder exists or create it
    },
    filename: function (req, file, cb){
        // Save file with unique name (timestamp + original name)
        const fileExtension = path.extname(file.originalname);
        // console.log(fileExtension)
        return cb(null, 'uploaded_file' + ".jpg");  
    }
});

const upload = multer({ storage: storage });


//  for geting all the emp_details
route.get("/",get_all_basic__emp_details);


//  for geting detail by e_id the emp_details
route.get("/:e_id",get_all_e_id_emp_details); 


// to delete the emp by the e_id from tables (emp_details, emp_bank_details,emp_deduction_details ,emp_earning_details)
route.delete("/delete/:e_id" , delete_e_id);

// to add new emp to database ini tables (emp_details, emp_bank_details,emp_deduction_details ,emp_earning_details) 
// post should be in formate { "emp_details": {...} , "emp_deduction_details": {...} ..... }
route.post('/add_emp' ,upload.single('e_photo'), add_new_emp);

// for updating the data of emp
route.put('/update_emp',upload.single('e_photo'),update_emp);

// chk for update input 
route.put("/chk_for_update" , chk_for_update)


// route.get('/chk/1', (req, res) => {
//     console.log("CHK route hit");
//     res.send("CHK endpoint is working!");
// });

// this it for checking that the data is unique of not in the DB (if it gives false it means that its data is already present , you have to change the values)
route.put("/chk/1", check_for_data )


export default route;

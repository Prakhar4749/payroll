import { checkConnection, pool } from "../config/db.js";

async function check_for_data(e_mobile_number=-1,e_bank_acc_number=-1,e_pan_number=-1,d_name=-1 ){

    // false -means that you can not use this
    // true -means that you can use this
    let result = {
        e_mobile_number:false,
        e_bank_acc_number:false,
        e_pan_number:false,
        d_name:false

    } 
    if(e_mobile_number==-1){

    }else{
        try{
            const sql=`SELECT COUNT(1)
            FROM ${emp_details}
            WHERE e_mobile_number = '${e_mobile_number}';`

            const [result] = await pool.query(sql);
            console.log(result)
            
        }catch(err){
            // console.log(err)
        }

            
    }



}


checkConnection(9876543210)
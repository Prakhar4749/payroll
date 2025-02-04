import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

async function fadd_new_user(new_uid,new_password){
    const data={
        "user_name": new_uid,
        "user_password": new_password
      }

      try{

        const response = await axios.post(`${base_url}/auth/register`,data)
        return response;

      }catch(err){
        console.log(err)
      }
}


async function update_userName(current_user_name,new_user_name,user_password){

    const data ={
        "current_user_name": current_user_name,
        "new_user_name": new_user_name,
        "user_password": user_password
      }

      try{
        const response = await axios.put(`${base_url}/auth/change_user_name`,data)
        return response.data;
      }catch(err){
        console.log(err)
      }

   

}



async function update_password(user_name,current_password,new_password){
    const data={
        "user_name": user_name,
        "current_password": current_password,
        "new_password": new_password
      }

      try{
        const response = await axios.put(`${base_url}/auth/change_password`,data)
        return response.data;
      }catch(err){
        console.log(err)
      }


}


async function  delete_user(){

 return ;
}

export {
    fadd_new_user,update_password,update_userName,delete_user
}


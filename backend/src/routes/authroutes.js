import express from "express";
import {login_user,register_user,change_password,change_user_name} from '../controller/authcontroller.js'
const route = express.Router();

route.get("/login",login_user);


route.post("/register",register_user);


route.put("/change_password",change_password);


route.put("/change_user_name",change_user_name);

export default route;
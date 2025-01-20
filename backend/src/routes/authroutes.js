import express from "express";
import {login_user,register_user} from '../controller/authcontroller.js'
const route = express.Router();

route.get("/login",login_user);


route.get("/register",register_user);

export default route;
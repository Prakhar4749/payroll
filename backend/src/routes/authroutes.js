import express from "express";
import {get_by_user_name} from '../controller/authcontroller.js'
const route = express.Router();

route.get("/:user_name",get_by_user_name);

export default route;
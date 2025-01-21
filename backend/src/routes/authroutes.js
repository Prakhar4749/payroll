import express from "express";
import {login_user,register_user,change_password,change_user_name} from '../controller/authcontroller.js'
const route = express.Router();



/**
 * Route: GET /login
 * Description: Logs in a user.
 * Input (Request Body - JSON):
 *  - user_name: The username of the user.
 *  - user_password: The password of the user.
 * Example:
 *  {
 *    "user_name": "johndoe",
 *    "user_password": "123456"
 *  }
 */
route.get("/login",login_user);


/**
 * Route: POST /register
 * Description: Registers a new user.
 * Input (Request Body - JSON):
 *  - user_name: The desired username for the user.
 *  - user_password: The password for the user.
 * Example:
 *  {
 *    "user_name": "johndoe",
 *    "user_password": "123456"
 *  }
 */
route.post("/register",register_user);

/**
 * Route: PUT /change_password
 * Description: Changes the password for a user.
 * Input (Request Body - JSON):
 *  - user_name: The username of the user.
 *  - current_password: The current password of the user.
 *  - new_password: The new password to set.
 * Example:
 *  {
 *    "user_name": "johndoe",
 *    "current_password": "oldPassword123",
 *    "new_password": "newPassword456"
 *  }
 */
route.put("/change_password",change_password);




/**
 * Route: PUT /change_user_name
 * Description: Updates the username of a user.
 * Input (Request Body - JSON):
 *  - current_user_name: The current username of the user.
 *  - new_user_name: The new username to set.
 * Example:
 *  {
 *    "current_user_name": "johndoe",
 *    "new_user_name": "john_doe_updated"
 *  }
 */
route.put("/change_user_name",change_user_name);

export default route;
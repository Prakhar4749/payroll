import express from 'express'
import {get_all_dept_details ,get_d_id_details , delete_d_id ,add_new_dept, update_dept } from '../controller/dept.js'


const route = express.Router();


/**
 * Route: GET /
 * Description: Fetches details of all departments.
 * Input: None.
 * Example:
 *  No input required.
 */
route.get("/",get_all_dept_details);


/**
 * Route: GET /d_id
 * Description: Fetches details of a specific department by its ID.
 * Input (Request Body - JSON):
 *  - d_id: The ID of the department to retrieve.
 * Example:
 *  {
 *    "d_id": "D001"
 *  }
 */
route.get("/:d_id",get_d_id_details);


/**
 * Route: DELETE /delete_d_id
 * Description: Deletes a department by its ID.
 * Input (Request Body - JSON):
 *  - d_id: The ID of the department to delete.
 * Example:
 *  {
 *    "d_id": "D001"
 *  }
 */
route.delete("/delete_d_id" , delete_d_id);


/**
 * Route: POST /add_dept
 * Description: Adds a new department.
 * Input (Request Body - JSON):
 *  - d_id: The unique ID for the department.
 *  - d_name: The name of the department.
 * Example:
 *  {
 *    "d_id": "D002",
 *    "d_name": "Mechanical Engineering"
 *  }
 */
route.post('/add_dept' , add_new_dept);



/**
 * Route: PUT /update_d_id
 * Description: Updates details of a specific department by its ID.
 * Input (Request Body - JSON):
 *  - d_id: The ID of the department to update.
 *  - new_d_id: The new ID for the department (if updating ID).
 *  - new_d_name: The new name for the department. (if updating name)
 * Example:
 *  {
 *    "d_id": "D002",
 *    "new_d_id": "D003",
 *    "new_d_name": "Civil Engineering"
 *  }
 */
route.put('/update_d_id',update_dept);


export default route;

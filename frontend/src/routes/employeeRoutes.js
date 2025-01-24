import React from 'react';
import { Route } from 'react-router-dom';
import Employee from '../views/Employee';
import { ViewEmployee } from '../components/page_specific/view_emp';
import UpdateForm from '../components/page_specific/EMP_update_form';

const employeeRoutes = [
  <Route key="employee" path="/employee" element={<Employee />} />,
  <Route key="viewEmployee" path="/employee/viewEmployee" element={<ViewEmployee />} />,
  <Route key="updateEmployee" path="/employee/updateEmployee" element={<UpdateForm />} />,
  <Route key="updateEmployee" path="/employee/addEmployee" element={<addForm />} />,
];

export default employeeRoutes;

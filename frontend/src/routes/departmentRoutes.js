import React from 'react';
import { Route } from 'react-router-dom';
import Department from '../views/Department';
import dept_update_form from '../components/page_specific/dept_update_form.js';

const departmentRoutes = [
  <Route key="department" path="/department" element={<Department />} />,
  <Route key="department_update_form" path="/department/update_form" element={<dept_update_form/>} />,
];

export default departmentRoutes;

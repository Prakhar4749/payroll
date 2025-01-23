import React from 'react';
import { Route } from 'react-router-dom';
import Department from '../views/Department';
import Dept_update_form from '../components/page_specific/Dept_update_form.js';

const departmentRoutes = [
  <Route key="department" path="/department" element={<Department />} />,
  <Route key="department_update_form" path="/department/update_form" element={<Dept_update_form d_id={'d001'} d_name={'it'} />} />,
];

export default departmentRoutes;

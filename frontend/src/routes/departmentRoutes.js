import React from 'react';
import { Route } from 'react-router-dom';
import Department from '../views/Department';
import DeptUpdateForm from '../components/page_specific/Dept_update_form';
import DeptAddForm from '../components/page_specific/Dept_add_form';

const departmentRoutes = [
  <Route key="department" path="/department" element={<Department />} />,
  <Route key="department_update_form" path="/department/update_form" element={<DeptUpdateForm />} />,
  <Route key="department_add_form" path="/department/add_form" element={<DeptAddForm />} />,
];

export default departmentRoutes;

import React from 'react';
import { Route } from 'react-router-dom';
import Department from '../views/Department';

const departmentRoutes = [
  <Route key="department" path="/department" element={<Department />} />,
];

export default departmentRoutes;

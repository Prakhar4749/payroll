import React from 'react';
import { Route } from 'react-router-dom';
import Employee from '../views/Employee';

const employeeRoutes = [
  <Route key="employee" path="/employee" element={<Employee />} />,
];

export default employeeRoutes;

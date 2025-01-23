import React from 'react';
import { Route } from 'react-router-dom';
import Employee from '../views/Employee';
import { ViewEmployee } from '../components/page_specific/view_emp';

const employeeRoutes = [
  <Route key="employee" path="/employee" element={<Employee />} />,
  <Route key="viewEmployee" path="/employee/viewEmployee" element={<ViewEmployee />} />,
];

export default employeeRoutes;

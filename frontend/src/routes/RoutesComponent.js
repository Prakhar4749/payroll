import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import ProtectedRoute from '../routes/ProtectedRoute';
import payslipRoutes from './payslipRoutes';
import employeeRoutes from './employeeRoutes';
import departmentRoutes from './departmentRoutes';
import userRoutes from './userRoutes';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {payslipRoutes}
        {employeeRoutes}
        {departmentRoutes}
        {userRoutes}
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RoutesComponent;
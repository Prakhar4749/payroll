import React from 'react';
import Login from '../Login';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(){
  return Login.isLogedIN==="true"?<Outlet/>:<Navigate to="/"/>;
}

export default ProtectedRoute

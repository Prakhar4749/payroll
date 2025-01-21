import React from 'react';
import { Route } from 'react-router-dom';
import User from '../views/User';

const userRoutes = [
  <Route key="user" path="/user/:x" element={<User />} />,
];

export default userRoutes;

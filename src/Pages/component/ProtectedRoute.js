import React,{useEffect} from 'react';
import Login from '../Login';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute(){
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem('login');
    if (!login){
      navigate('/');

    }
    });
  
  return( 
    <div>
      <h1></h1>
      <Outlet/>
    </div>
  );
}

export default ProtectedRoute;

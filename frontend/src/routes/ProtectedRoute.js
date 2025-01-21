import React,{useEffect} from 'react';
import Login from '../Pages/Login';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function ProtectedRoute(){
  const navigate = useNavigate();
  useEffect(() => {
    let login = sessionStorage.getItem('login');
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

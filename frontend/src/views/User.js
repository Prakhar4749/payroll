import React from 'react';
import Navbar from '../components/layout/Navbar';
import { useParams, Link } from 'react-router-dom';

export default function User() {
    const {x} = useParams();
  return (
    <div>
        <Navbar/>
      <h1>user {x}</h1>
      <Link to="/payslip/form">Payslip_Form</Link>
      
    </div>
  )
}

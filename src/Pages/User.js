import React from 'react';
import Navbar from './component/Navbar';
import { useParams } from 'react-router-dom';

export default function User() {
    const {x} = useParams();
  return (
    <div>
        <Navbar/>
      <h1>user {x}</h1>
    </div>
  )
}

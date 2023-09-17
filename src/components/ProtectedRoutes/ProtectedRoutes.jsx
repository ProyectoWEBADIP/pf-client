/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import jwtDecode from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {

  const token = localStorage?.access_token;
  let role;
  if(token){
    role = jwtDecode(token).role;
  }

  if(token && (role==='admin' || role ==='super_admin')){
return <Outlet/>;
  }

  return <Navigate to='/'/>
}

export default ProtectedRoutes
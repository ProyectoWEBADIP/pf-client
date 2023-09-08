/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './adminDashboard.css';
import Sidebar from '../components/sideBar/sideBar';
import MainDash from '../components/MainDash/MainDash';
import RigthSide from '../components/RightSide/RigthSide';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/usersActions/usersActions';

const AdminDashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers());
  });
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />
        <RigthSide />
      </div>
    </div>
  );
};

export default AdminDashboard;

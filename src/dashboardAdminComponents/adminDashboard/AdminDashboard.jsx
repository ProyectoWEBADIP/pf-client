/* eslint-disable no-unused-vars */
import React from 'react';
import './adminDashboard.css';
import Sidebar from '../components/sideBar/sideBar';
import MainDash from '../components/MainDash/MainDash';
import RigthSide from '../components/RightSide/RigthSide';

const AdminDashboard = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash/>
        <RigthSide/>
      </div>
    </div>
  );
};

export default AdminDashboard;

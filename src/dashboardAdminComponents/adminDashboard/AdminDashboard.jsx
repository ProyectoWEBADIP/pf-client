/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './adminDashboard.css';
import Sidebar from '../components/SideBar/Sidebar';
import MainDash from '../components/MainDash/MainDash';
import RigthSide from '../components/RightSide/RigthSide';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  getUserById,
  getUserLoggedById,
} from '../../redux/usersActions/usersActions';
import { SwichtThemes } from '../../components/ModeThemes/SwichtThemes';
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions';

const AdminDashboard = ({ themeMode, toggleThemeMode }) => {
  const actualDash = useSelector((state) => state.actualDash);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllNoticias());
    dispatch(getUserLoggedById(localStorage.userId));
  });
  return (
    <div className="App">
      <div className="AppGlass">
        <div className="switchTheme">
          <SwichtThemes
            themeMode={themeMode}
            toggleThemeMode={toggleThemeMode}
          />
        </div>
        <Sidebar />
        <MainDash />
        {actualDash === 0 ? (
          <RigthSide />
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboard;

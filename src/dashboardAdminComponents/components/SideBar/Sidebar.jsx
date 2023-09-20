/* eslint-disable no-unused-vars */
import React from 'react';
import './Sidebar.css';
import foto from '../../../assets/Escudo ADIP sin fondo.png';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { SidebarData } from '../../Data/Data';
import { useDispatch, useSelector } from 'react-redux';
import { changeDash } from '../../../redux/dashboardAdminActions/dashboardActions';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [selected, setSelected] = React.useState(0);
  const dispatch = useDispatch();
  const userProfile = useSelector((state)=>state.perfilUsuario)
const actualDash = useSelector(state=> state.actualDash)
  function selectedAndRender(i) {
    setSelected(i);
    dispatch(changeDash(i));
  }
  return (
    <div className="Sidebar">
      <div className="logoAndMenu">
        <div className="logo">
          <img src={userProfile.profile?.image} />
          <span>
            <span>A</span>
            <span>D</span>M<span>I</span>N
          </span>
        </div>
        <div className="menu">
          {SidebarData.map((item, i) => {
            return (
              <div
                key={i}
                className={selected === i ? 'menuItem active' : 'menuItem'}
                onClick={() => selectedAndRender(i)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
              
            );
          })}
          <div>
            <Link to={`/${userProfile.id}/profile`}>
              <UilSignOutAlt  className="outButton" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

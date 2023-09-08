/* eslint-disable no-unused-vars */
import React from 'react';
import './Sidebar.css';
import foto from '../../../assets/Escudo ADIP sin fondo.png';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { SidebarData } from '../../Data/Data';
import { useDispatch } from 'react-redux';
import { changeDash } from '../../../redux/dashboardAdminActions/dashboardActions';
const Sidebar = () => {
  const [selected, setSelected] = React.useState(0);
const dispatch= useDispatch()
function selectedAndRender(i){
  setSelected(i)
dispatch(changeDash(i))

}
  return (
    <div className="Sidebar">
      <div className="logoAndMenu">
        <div className="logo">
          <img src={foto} />
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
        <UilSignOutAlt className='outButton'/>
      </div>
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;

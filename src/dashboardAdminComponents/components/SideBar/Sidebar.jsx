/* eslint-disable no-unused-vars */
import React from 'react'
import './Sidebar.css'
import foto from '../../../assets/Escudo ADIP sin fondo.png'
import {UilSignOutAlt} from  '@iconscout/react-unicons'
import { SidebarData } from '../../Data/Data'
const Sidebar = () => {

  const [selected, setSelected] = React.useState(0);

  return (
    
  <div className='Sidebar'>
    {/* foto */}
    <div className='logo'>
      <img src={foto} />
      <span>
        <span>A</span><span>D</span>M<span>I</span>N 
      </span>
    </div>
    {/* MENU*/}
    <div className='menu'>
    {SidebarData.map((item,i)=>{
      return (
        <div key={i} className={selected===i?'menuItem active':'menuItem'}
        onClick={()=>setSelected(i)}
        >
          <item.icon/>
          <span>
            {item.heading}
          </span>
        </div>
      )
    })}
    <div className="menuItem">
      <UilSignOutAlt/>
    </div>
    </div>
  </div>
  )
}

export default Sidebar
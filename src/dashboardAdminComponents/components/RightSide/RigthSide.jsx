/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './RigthSide.css'
import Updates from '../Updates/Updates'
import Comentarios from '../Comentarios/Comentarios'
import { SwichtThemes } from '../../../components/ModeThemes/SwichtThemes'
const RigthSide = ({ themeMode, toggleThemeMode }) => {
  return (
<div className="RightSide">
<div className='switchTheme' >
<SwichtThemes 
                themeMode={themeMode}
                  toggleThemeMode={toggleThemeMode}
               />
</div>
  <div>
    <h3>Actualizaciones</h3>
    <Updates/>
  </div>
  <div>
    <h3>
      Comentarios recientes
    </h3>
    <Comentarios/>
  </div>
</div>
    )
}

export default RigthSide
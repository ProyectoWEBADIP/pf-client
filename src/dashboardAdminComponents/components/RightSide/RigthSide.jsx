/* eslint-disable no-unused-vars */
import React from 'react'
import './RigthSide.css'
import Updates from '../Updates/Updates'
import Comentarios from '../Comentarios/Comentarios'
const RigthSide = () => {
  return (
<div className="RightSide">
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
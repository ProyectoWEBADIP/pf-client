/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './MainDash.css'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../../redux/usersActions/usersActions'
const MainDash = () => {
const dispatch = useDispatch()

  useEffect(()=>{
    
    dispatch(getAllUsers())
  })
  return (
<div className="MainDash">
  <h1><span>P</span>anel principal</h1>
  <Cards/>
  <h2>Usuarios registrados</h2>
  <Table/>
</div>  )
}

export default MainDash
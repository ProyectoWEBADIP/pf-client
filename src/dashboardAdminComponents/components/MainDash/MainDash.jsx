/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './MainDash.css';
import Cards from '../Cards/Cards';
import Table from '../Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/usersActions/usersActions';
import { none } from '@cloudinary/url-gen/qualifiers/fontHinting';
const MainDash = () => {
  const actualDash = useSelector((state) => state.actualDash);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  });

  return (
    <div>
      {actualDash===0?<div className="MainDash">
      <div>
        <h1>
          <span>P</span>anel principal
        </h1>
        <Cards />
      </div>
      <div>
        <h2>Usuarios registrados</h2>
        <Table />
      </div>
    </div>:
  <div className="MainDash">

  </div>
  }
    </div>
  );
};

export default MainDash;

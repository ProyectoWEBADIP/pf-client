/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getHistory } from '../../redux/login-registerActions/loginActions';
import { cleanNoticiaDetail, getNoticiaDetail } from '../../redux/noticiasActions/noticiasActions';

export default function NoticiaDetail() {
  //!HOOKS
  const { id } = useParams();
  const dispatch = useDispatch();
  //!HOOKS

  useEffect(() => {
    dispatch(getNoticiaDetail(id));
    return()=>{
      dispatch(cleanNoticiaDetail())
    }

  }, [dispatch]);

  const detalleNoticia = useSelector((state) => state.detalleNoticia);
  return (
    <div>
      
      <h1>{detalleNoticia?.title}</h1>
      <p>{detalleNoticia?.resume}</p>
      <img src={detalleNoticia?.image} alt={detalleNoticia?.image}/>
      <p>{detalleNoticia?.content}</p>
      <p>{detalleNoticia?.date}</p>
    </div>
  );
}

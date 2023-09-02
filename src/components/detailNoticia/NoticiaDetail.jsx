/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getHistory } from '../../redux/login-registerActions/loginActions';
import { getNoticiaDetail } from '../../redux/noticiasActions/noticiasActions';

export default function NoticiaDetail() {
  //!HOOKS
  const { id } = useParams();
  const dispatch = useDispatch();
  let path = useLocation();
  //!HOOKS

  useEffect(() => {
    dispatch(getNoticiaDetail(id));
  }, [dispatch]);

  const detalleNoticia = useSelector((state) => state.detalleNoticia);
  return (
    <div>
      <h1>{detalleNoticia[0]?.title}</h1>
      <p>{detalleNoticia[0]?.resume}</p>
      <img src={detalleNoticia[0]?.image} alt={detalleNoticia[0]?.image}/>
      <p>{detalleNoticia[0]?.content}</p>
      <p>{detalleNoticia[0]?.date}</p>
    </div>
  );
}

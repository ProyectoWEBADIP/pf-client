/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getHistory } from '../../redux/login-registerActions/loginActions';
import { cleanNoticiaDetail, getNoticiaDetail } from '../../redux/noticiasActions/noticiasActions';
import Sponsor3 from '../Sponsor/sponsor3/Sponsor3';
import { getAllSponsor } from '../../redux/sponsorActions/sponsorActions';
import Sponsor4 from '../Sponsor/sponsor4/Sponsor4';
import './noticiaDetail.css';
export default function NoticiaDetail() {
  //!HOOKS
  const { id } = useParams();
  const dispatch = useDispatch();
  //!HOOKS

  useEffect(() => {
    dispatch(getNoticiaDetail(id));
    dispatch(getAllSponsor())
    return()=>{
      dispatch(cleanNoticiaDetail())
    }

  }, [dispatch]);

  const detalleNoticia = useSelector((state) => state.detalleNoticia);
 
  return (
    <div className='contiene'>
      <div className='izq'>
      <Sponsor3/>
      </div>
      <div className='noticia'>
        <h1>{detalleNoticia?.title}</h1>
        <p>{detalleNoticia?.resume}</p>
        <img src={detalleNoticia?.image} alt={detalleNoticia?.image}/>
        <p>{detalleNoticia?.content}</p>
        <p>{detalleNoticia?.date}</p>
      </div>
      <div className='der'>
      <Sponsor4/>
      </div>
    </div>
  );
}

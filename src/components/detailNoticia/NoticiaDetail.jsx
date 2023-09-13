/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getHistory } from '../../redux/login-registerActions/loginActions';
import {
  cleanNoticiaDetail,
  getNoticiaDetail,
} from '../../redux/noticiasActions/noticiasActions';
import { Box, Container, Typography } from '@mui/material';
import './detailNoticia.css';
import { setIsLoading } from '../../utils/setIsLoading';
export default function NoticiaDetail() {
  //!HOOKS
  const { id } = useParams();
  const dispatch = useDispatch();

  //!HOOKS
  useEffect(() => {
dispatch(setIsLoading())
    dispatch(getNoticiaDetail(id));
    return () => {
      dispatch(cleanNoticiaDetail());
    };
  }, [dispatch]);
const isLoading = useSelector(state=>state.isLoading)
  const detalleNoticia = useSelector((state) => state.detalleNoticia);
  let date = detalleNoticia.date?.split('T')[0] + " a las "+detalleNoticia.date?.split('T')[1].split('.')[0];
  return (
    <div >
      {!isLoading?<div className="NoticiaDetailContainer">
        <div className="sponsorContainer">{/* SPONSOR */}</div>
      <div className="noticiaContainer">
        <div className="imgCont">
          <img src={detalleNoticia.image} alt="" />
          <div className="fechaPublicacion"><span className='dateSpan'>{date}</span></div>
          </div>
          <div className="NoticiaTitle"><span>{detalleNoticia?.title}</span><br />
          <span className='resumeSpan'>{detalleNoticia.resume
          }</span>
        </div>
        <div className="contentNoticia">
          <span>{detalleNoticia.content}</span>
        </div>
      </div>
      <div className="sponsorContainer">
      </div>{/* SPONSOR */}</div>:(<div className="loaderLoginContainer">
              <Box className="box">
                <Box className="shadow"></Box>
                <Box className="gravity">
                  <Box className="ball"></Box>
                </Box>
              </Box>
            </div>
              
            )}
    </div>
  );
}

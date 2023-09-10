/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getHistory } from '../../redux/login-registerActions/loginActions';
import { cleanNoticiaDetail, getNoticiaDetail } from '../../redux/noticiasActions/noticiasActions';
import { Box, Container, Typography } from '@mui/material';

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
  console.log("==> detalle",detalleNoticia)
  return (

    <Container sx={{
    justifyContent: "center", 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // width: 'fit-content',
    fullwidth: true,
    }}>

      <Typography variant='h2' fontWeight={"bold"}>{detalleNoticia?.title}</Typography>
      <Typography variant='h5' m={3}>{detalleNoticia?.resume}</Typography>
      
      <Box sx={{width: '100%',}}><img src={detalleNoticia?.image} alt={detalleNoticia?.image} style={{ maxWidth: '100%', maxHeight: '100%' }}/></Box>
      

      <Typography variant='body1' m={3}>{detalleNoticia?.content}</Typography>
      <p>{detalleNoticia?.date}</p>
    
    </Container>
  );
}

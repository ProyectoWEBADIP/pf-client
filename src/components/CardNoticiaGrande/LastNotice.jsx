/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './lastNotice.css';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

const LastNotice = ({ title, id, image, date }) => {
  return (
    <>
      <Card
        className="noticesCards"
        sx={{ minWidth: 520, minHeight: 300, maxHeight: 350, maxWidth: 520 }}
      >
        <CardActionArea>
          <CardMedia
            className="imageCard"
            component="img"
            image={image}
            height="350px"
          />
          <CardContent className="cardContent">
            <Typography textAlign='left'variant="body2">{date?.split('T')[0]}</Typography>

            <Typography variant="h6">{title}</Typography>

            <Button href={`/detalle/${id}`}>Ver más</Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default LastNotice;

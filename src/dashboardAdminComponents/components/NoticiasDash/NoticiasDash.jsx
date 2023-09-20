/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import NoticiaDetail from '../../../components/detailNoticia/NoticiaDetail';
import {
  deleteNotice,
  getAllNoticias,
  getNoticiaDetail,
  getNoticiaDetailAdmin,
} from '../../../redux/noticiasActions/noticiasActions';
import './noticiasDash.css';
import { Clear, Close, Delete, RemoveCircle } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
export default function FullFeaturedCrudGrid() {
  const noticias = useSelector((state) => state.noticias);
  const dispatch = useDispatch();

  const noticiasRows = noticias.map((not) => {
    let dateOk =
      not.date.split('T')[0] + '/' + not.date.split('T')[1].split('.')[0];

    return {
      id: not.id,
      title: not.title,
      content: not.content,
      date: dateOk,
      image: not.image,
      resume: not.resume,
      active: not.active,
    };
  });
  const [rows, setRows] = React.useState(noticiasRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [noticiaDetail, setNoticiaDetail] = React.useState({});

  const detalleNoticia = useSelector((state) => state.detalleNoticia);

  const showNoticeDetail = async (id) => {
    setIsLoading(true);
    const noticeFound = await dispatch(getNoticiaDetailAdmin(id));
    setIsLoading(false);
    setNoticiaDetail(noticeFound);
    setShowStatus(true);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90, align: 'center', hide:true },
    {
      field: 'title',
      headerAlign: 'center',
      headerName: 'Título',
      width: 180,
      editable: true,
    },
    {
      field: 'content',
      headerAlign: 'center',
      headerName: 'Contenido',
      width: 160,
      editable: true,
    },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 130,
      editable: true,
      headerAlign: 'center',
    },
    {
      field: 'date',
      headerAlign: 'center',
      headerName: 'Fecha',
      width: 160,
    },

    {
      field: 'resume',
      headerAlign: 'center',
      headerName: 'Resumen',
      editable: true,
      width: 180,
    },

    {
      field: 'active',
      headerAlign: 'center',
      headerName: 'Activa',
      editable: true,
      width: 120,
    },

    {
      field: 'actions',
      type: 'actions',
      headerAlign: 'center',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleUpdateNotice(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Info"
            color="inherit"
            onClick={() => {
              handleDeleteNotice(id);
            }}
          />,
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="Info"
            color="inherit"
            onClick={() => {
              showNoticeDetail(id);
            }}
          />,
        ];
      },
    },
  ];
  const navigate = useNavigate();
  const handleUpdateNotice = (id) => {
    navigate(`/editarNoticia/${id}`);
  };
  const handleDeleteNotice = (id) => {
    const body = { active: false };
    dispatch(deleteNotice(id, body));
    alert('Eliminando noticia...');
    dispatch(getAllNoticias());
  };
  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {isLoading ? (
        <div className="overlay">
          <div className="loaderCont">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : null}
      {!showStatus ? null : (
        <div className="overlay">
          <div className="noticeModalCont">
            <div className="buttCont">
              <Close
              fontSize='large'
                className="closeButtonNotice"
                onClick={() => {
                  setShowStatus(false);
                }}
              />
            </div>
            <div className="titleNoticeCont">
              <span>{noticiaDetail[0].title}</span>
            </div>
            <div className="noticeDataContainer">
             <div className="imgNoticeContModal">
              <img src={noticiaDetail[0].image} alt="" />
              <div className="resume-date-container">
                <span>{noticiaDetail[0].date.split('T')[0]+ ' / '+ noticiaDetail[0].date.split('T')[1].split('.')[0]}</span>
                <span>{noticiaDetail[0].resume}</span>
              </div>
             </div>
             <div className="contentContainer">
              <span>{noticiaDetail[0].content}</span>
              <span>Categorías: categorías de la noticia.</span>
             </div>
            </div>
          </div>
        </div>
      )}
      <DataGrid
        sx={{ textAlign: 'justify' }}
        rows={noticiasRows}
        columns={columns}
        rowHeight={30}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        checkboxSelection={true}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}

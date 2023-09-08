/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsers,
  updateUserFromAdmin,
} from '../../../redux/usersActions/usersActions';
import './Table.css';
function calcularEdad(birthday) {
  if (birthday) {
    const birthday_arr = birthday.split('/');
    const birthday_date = new Date(
      birthday_arr[2],
      birthday_arr[1] - 1,
      birthday_arr[0]
    );
    const ageDifMs = Date.now() - birthday_date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  return 'Sin perfil';
}

//!FUNCION QUE AGREGA USUARIOS DESDE LA TABLA, INHABILITADA POR AHORA
// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const newRow = { id: 150, username: '', email: '' };

//     setRows((oldRows) => [...oldRows, newRow]);

//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Agregar usuario
//       </Button>
//     </GridToolbarContainer>
//   );
// }

export default function FullFeaturedCrudGrid() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  const users = allUsers.map((u) => {
    let edad = null;
    let firstName = null;
    let lastName = null;
    let dni = null;
    let profile_id = null;
    let image = null;
    let fechaRegistro = (
      u.createdAt.split('T')[0] +
      '-' +
      u.createdAt.split('T')[1]
    ).split('.')[0];
    if (u.profile) {
      edad = dayjs(u.profile.birthDate).format('DD/MM/YYYY');
      firstName = u.profile.firstName;
      lastName = u.profile.lastName;
      dni = u.profile.dni;
      profile_id = u.profile.id;
      image = u.profile.image;
    }
    return {
      id: u.id,
      username: u.username,
      nombre: firstName !== null ? firstName : u.username,
      apellido: u.active ? lastName : 'Sin perfil',
      edad: calcularEdad(edad),
      dni: u.active ? dni : 'Sin perfil',
      email: u.email,
      activo: u.active ? 'Si' : 'No',
      image: u.active ? image : 'Sin perfil',
      role: u.role,
      profile_id: u.active ? profile_id : 'Sin perfil',
      fechaRegistro,
    };
  });
  const [rows, setRows] = React.useState(users);
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

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const confirm = window.confirm(
      'Esta accion información importante del usuario, ¿estás seguro?'
    );
    if (confirm) {
      if (newRow.role && newRow.activo) {
        const action = {
          userFields: {
            role: newRow.role,
            active: newRow.activo === 'Si' ? true : false,
          },
        };
        const response = await dispatch(updateUserFromAdmin(newRow.id, action));
        alert(response);
      } else if (newRow.role && !newRow.activo) {
        const action = {
          userFields: {
            role: newRow.role,
            active: newRow.activo === 'Si' ? true : false,
          },
        };
        const response = await dispatch(updateUserFromAdmin(newRow.id, action));
        alert(response);
      } else {
        const action = {
          userFields: {
            active: newRow.activo === 'Si' ? true : false,
          },
        };
        const response = await dispatch(updateUserFromAdmin(newRow.id, action));
        alert(response);
      }
      dispatch(getAllUsers());
    } else {
      alert('Acción cancelada.');
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const customColumnsActivo = (params) =>
    params.value === 'No' ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
          width: '100%',
          height: '100%',
        }}
      >
        ❌{params.value}
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
          width: '100%',
          height: '100%',
        }}
      >
        ✅{params.value}
      </div>
    );
  const customColumnsRol = (params) =>
    params.value === 'admin' ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
          backgroundColor: '#FFCA71',
          width: '100%',
          height: '100%',
        }}
      >
        {params.value}
      </div>
    ) : params.value === 'super_admin' ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
          backgroundColor: '#FE919D',
          width: '100%',
          height: '100%',
        }}
      >
        {params.value}
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
          width: '100%',
          height: '100%',
        }}
      >
        {params.value}
      </div>
    );
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Usuario', width: 130 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },

    { field: 'apellido', headerName: 'Apellido', width: 130 },
    {
      field: 'edad',
      headerName: 'Edad(años)',
      width: 90,
    },
    {
      field: 'dni',
      headerName: 'DNI',
      type: 'number',
      width: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
    },
    {
      field: 'activo',
      headerName: 'Activo',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Si', 'No'],
      renderCell: customColumnsActivo,
    },
    {
      field: 'role',
      headerName: 'Rol',
      editable: true,
      width: 120,
      type: 'singleSelect',
      valueOptions: ['user', 'admin', 'super_admin'],
      renderCell: customColumnsRol,
    },
    {
      field: 'image',
      headerName: 'Imagen',
      width: 120,
    },
    {
      field: 'profile_id',
      headerName: 'Id del perfil',
      width: 110,
    },
    {
      field: 'fechaRegistro',
      headerName: 'Fecha de Registro',
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
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
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        rowHeight={30}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

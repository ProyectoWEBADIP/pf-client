/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
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
  getUserById,
  updateUserFromAdmin,
} from '../../../redux/usersActions/usersActions';
import logo from '../../../assets/Escudo ADIP sin fondo.png';
import './Table.css';
import { Add, Close, Warning } from '@mui/icons-material';
import defaultPhoto from '../../../assets/Escudo ADIP sin fondo.png';
import { format } from 'date-fns';
import AlertError from '../../../assets/AlertError/AlertError';
import SucessAlert from '../../../assets/AlertSuccess/AlertSuccess';
import { registerUser } from '../../../redux/login-registerActions/loginActions';
import { Alert, FormControl, TextField } from '@mui/material';

export function calcularEdad(birthday) {
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
  return '*';
}
export default function FullFeaturedCrudGrid() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const perfilUsuario = useSelector((state) => state.perfilUsuario);
  const users = allUsers?.map((u) => {
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
      nombre: firstName !== null ? firstName + ' ' + lastName : u.username,
      apellido: u.active ? lastName : '*',
      edad: calcularEdad(edad),
      dni: u.active ? dni : '*',
      email: u.email,
      activo: u.active ? 'Si' : 'No',
      image: u.active ? image : '*',
      role: u.role,
      profile_id: u.active ? profile_id : '*',
      fechaRegistro,
      razonBan: u.razonBan ? u.razonBan : '*',
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
  const [errorAlert, setErrorAlert] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [acept, setAcept] = React.useState(false);
  const [showAcept, setShowAcept] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const handleSaveClick = (id) => () => {
    setShowAcept(true);
    setUserId(id);
  };

  const processRowUpdate = async (newRow, id) => {
    const updatedRow = { ...newRow, isNew: false };

    if (acept) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      setAcept(false);
      setLoading(true);
      const userFound = await dispatch(getUserById(newRow.id));
      if (newRow) {
        const date = format(new Date(), 'dd-MM-yyyy HH:mm:ss');

        const action = {
          userFields: {
            role: newRow.role ? newRow.role : userFound.role,
            active: newRow.activo
              ? newRow.activo === 'Si'
                ? true
                : false
              : userFound.active,
            razonBan:
              newRow.razonBan && newRow.razonBan !== '*'
                ? `${newRow.razonBan}. Infracción aplicada por: ${perfilUsuario.email} el día ${date}`
                : '*',
          },
        };
        const response = await dispatch(updateUserFromAdmin(newRow.id, action));
        setSuccessAlert(response);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }

      dispatch(getAllUsers());
      setIsLoading(false)
      setLoading(false);
    } else {
      setErrorAlert('Error al actualizar los datos del usuario.');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      setLoading(false);
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const [showStatus, setShowStatus] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const getUserStatus = async (id) => {
    setIsLoading(true);
    const userFound = await dispatch(getUserById(id));
    setIsLoading(false);
    setUserStatus(userFound);
    setShowStatus(true);
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
          color: 'orange',
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
          color: 'green',
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
    {
      field: 'username',
      headerAlign: 'center',
      headerName: 'Usuario',
      width: 130,
    },
    {
      field: 'nombre',
      headerAlign: 'center',
      headerName: 'Nombre completo',
      width: 210,
    },
    {
      field: 'edad',
      headerName: 'Edad',
      width: 120,
      headerAlign: 'center',
    },
    {
      field: 'role',
      headerAlign: 'center',
      headerName: 'Rol',
      editable: true,
      width: 120,
      type: 'singleSelect',
      valueOptions: ['user', 'admin', 'super_admin'],
      renderCell: customColumnsRol,
    },

    {
      field: 'activo',
      headerAlign: 'center',
      headerName: 'Activo',
      editable: true,
      width: 120,

      type: 'singleSelect',
      valueOptions: ['Si', 'No'],
      renderCell: customColumnsActivo,
    },
    {
      field: 'razonBan',
      headerAlign: 'center',
      headerName: 'Razón de ban',
      editable: true,
      width: 180,
      renderCell: customColumnsRol,
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
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="Info"
            color="inherit"
            onClick={() => {
              getUserStatus(id);
            }}
          />,
        ];
      },
    },
  ];
  const noRows = [{ id: '123', email: 'No se cargaron los usuarios' }];
  const [showAddUser, setShowAddUser] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  function handleAddUserChange(e) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }
  async function addNewUser(e) {
    e.preventDefault();
    setIsLoading(true)

    const registered = await dispatch(registerUser(newUser));
    setIsLoading(false)

    if (registered?.registered) {
      await dispatch(getAllUsers());
      setSuccessAlert(registered.message);
      setShowError(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } else {
      setShowSuccess(false);
      setErrorAlert(
        'Error al registrar el usuario. Verifique no repetir email ni nombre de  usuario.'
      );
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }
  return (
    <Box
    className='boxTable'
      sx={{
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      {showAcept ? (
        <div className="overlay">
          <div className="acept-container">
            <span>
              <Warning fontSize="large" />
              Esta acción modificará información importante del usuario, ¿seguro
              que quieres continuar?
              <Warning fontSize="large" />
            </span>
            <div className="continuar-cancelar-container">
              <button
                className="acept-button"
                onClick={() => {
                  setAcept(true);
                  setRowModesModel({
                    ...rowModesModel,
                    [userId]: { mode: GridRowModes.View },
                  });
                  setShowAcept(false);
                }}
              >
                Continuar
              </button>
              <button
                onClick={() => {
                  setShowAcept(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {showAddUser ? (
        <div className="overlay">
          <div className="addUser-container">
         {isLoading?<div className="loaderCont">
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
          </div>:null}
            <div className="adduser-closebutton-container">
              {' '}
              <Close
                fontSize="medium"
                className="closeButton"
                onClick={() => {
                  setShowAddUser(false);
                }}
              />
            </div>
            <h1>Ingresa los datos del usuario a registrar</h1>
            <form onSubmit={addNewUser} action="">
              <label htmlFor="">Nombre de usuario:</label>
              <div className="input-email-container">
                <TextField
                  onChange={handleAddUserChange}
                  required
                  type="text"
                  name="username"
                />
              </div>
              <label htmlFor="">Email:</label>

              <div className="input-email-container">
                <TextField
                  type="email"
                  onChange={handleAddUserChange}
                  required
                  name="email"
                />
              </div>
              <label htmlFor="">Contraseña:</label>

              <div className="input-email-container">
                <TextField
                  onChange={handleAddUserChange}
                  required
                  type="text"
                  name="password"
                />
              </div>
              <input
                className="add-user-input"
                type="submit"
                value={'Registrar usuario'}
              />
            </form>
          </div>
        </div>
      ) : null}
      {showError ? (
        <div className="alerts">
          <AlertError error={errorAlert} />
        </div>
      ) : null}
      {showSuccess ? (
        <div className="alerts">
          <SucessAlert success={successAlert} />
        </div>
      ) : null}
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
          <div className={localStorage.themeMode==='dark'?"statusCont dark":"statusCont"}>
            <div className="statusTextCont">
              <div className="buttCont">
                {' '}
                <Close
                  fontSize="large"
                  className="closeButton"
                  onClick={() => {
                    setShowStatus(false);
                  }}
                />
              </div>
              <div>
                <span className="title-status">ESTADO DE USUARIO </span>
              </div>
              <span className="mainSpan">
                Nombre completo:{' '}
                <span className="infoSpan">
                  {userStatus.profile
                    ? userStatus.profile.firstName +
                      ' ' +
                      userStatus.profile.lastName
                    : userStatus.username}
                </span>
              </span>

              <span className="mainSpan">
                Correo electrónico:{' '}
                <span className="infoSpan">{userStatus.email}</span>
              </span>

              <span className="mainSpan">
                Fecha de registro:{' '}
                <span className="infoSpan">
                  {userStatus.createdAt.split('T')[0] +
                    ' a las ' +
                    userStatus.createdAt.split('T')[1].split('.')[0]}{' '}
                  hs
                </span>
              </span>
              <span className="mainSpan">
                DNI:{' '}
                <span className="infoSpan">
                  {userStatus.profile
                    ? userStatus.profile.dni
                    : 'DNI no registrado.'}
                </span>
              </span>

              <span className="mainSpan">
                Edad:{' '}
                <span className="infoSpan">
                  {userStatus.profile
                    ? `${calcularEdad(
                        dayjs(userStatus.profile.birthDate).format('DD/MM/YYYY')
                      )} años.`
                    : 'Edad no registrada.'}{' '}
                </span>
              </span>

              <span className="mainSpan">
                Categorías:{' '}
                <span className="infoSpan">No registra categorías.</span>
              </span>

              <span className="mainSpan">
                Información de infracciones:{' '}
                <span className="infoSpan">
                  {userStatus.razonBan
                    ? userStatus.razonBan
                    : 'El usuario no tiene infracciones.'}
                </span>
              </span>
            </div>
            <div className="fotoModanCont">
              <img
                src={
                  userStatus.profile ? userStatus.profile?.image : defaultPhoto
                }
                alt=""
              />
              <span className="mainSpan">
                Estado actual:{' '}
                <span className={userStatus.active ? 'activo' : 'inactivo'}>
                  {userStatus.active ? 'Activo' : 'Inactivo'}
                </span>
              </span>
              <span className="mainSpan">
                Rol: <span className="infoSpan"> {userStatus.role}</span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="dataGrid-container">
        <div
          onClick={() => {
            setShowAddUser(true);
          }}
          className="add-user-container"
        >
          <span>
            <Add fontSize="small" />
            Agregar usuario
          </span>
        </div>
        <DataGrid
          className="tablaDataGrid"
          localeText={{
            noRowsLabel: 'No se ha encontrado datos.',
            noResultsOverlayLabel: 'No se ha encontrado ningún resultado',
            toolbarColumns: 'Columnas',
            toolbarColumnsLabel: 'Seleccionar columnas',
            toolbarFilters: 'Filtros',
            toolbarFiltersLabel: 'Ver filtros',
            toolbarFiltersTooltipHide: 'Quitar filtros',
            toolbarFiltersTooltipShow: 'Ver filtros',
            columnMenuLabel: 'Menú',
            columnMenuShowColumns: 'Mostrar columnas',
            columnMenuManageColumns: 'Administrar columnas',
            columnMenuFilter: 'Filtro',
            columnMenuHideColumn: 'Ocultar',
            columnMenuUnsort: 'Desordenar',
            columnMenuSortAsc: 'Ordenar ASC',
            columnMenuSortDesc: 'Ordenar DESC',
            toolbarDensity: 'Densidad',
            toolbarDensityLabel: 'Densidad',
            toolbarDensityCompact: 'Compacta',
            toolbarDensityStandard: 'Estándar',
            toolbarDensityComfortable: 'Cómoda',
            toolbarExport: 'Exportar',
            toolbarExportLabel: 'Exportar',
            toolbarExportCSV: 'Descargar como CSV',
            toolbarExportPrint: 'Imprimir',
            toolbarExportExcel: 'Descargar como Excel',
            columnsPanelTextFieldLabel: 'Columna de búsqueda',
            columnsPanelTextFieldPlaceholder: 'Título de columna',
            columnsPanelDragIconLabel: 'Reordenar columna',
            columnsPanelShowAllButton: 'Mostrar todo',
            columnsPanelHideAllButton: 'Ocultar todo',
            filterPanelAddFilter: 'Agregar filtro',
            filterPanelRemoveAll: 'Remover todos',
            filterPanelDeleteIconLabel: 'Borrar',
            filterPanelLogicOperator: 'Operador lógico',
            filterPanelOperator: 'Operadores',
            filterPanelOperatorAnd: 'Y',
            filterPanelOperatorOr: 'O',
            filterPanelColumns: 'Columnas',
            filterPanelInputLabel: 'Valor',
            filterPanelInputPlaceholder: 'Valor de filtro',
            filterOperatorContains: 'contiene',
            filterOperatorEquals: 'es igual',
            filterOperatorStartsWith: 'comienza con',
            filterOperatorEndsWith: 'termina con',
            filterOperatorIs: 'es',
            filterOperatorNot: 'no es',
            filterOperatorAfter: 'es posterior',
            filterOperatorOnOrAfter: 'es en o posterior',
            filterOperatorBefore: 'es anterior',
            filterOperatorOnOrBefore: 'es en o anterior',
            filterOperatorIsEmpty: 'esta vacío',
            filterOperatorIsNotEmpty: 'no esta vacío',
            filterOperatorIsAnyOf: 'es cualquiera de',
            'filterOperator=': '=',
            'filterOperator!=': '!=',
            'filterOperator>': '>',
            'filterOperator>=': '>=',
            'filterOperator<': '<',
            'filterOperator<=': '<=',
          }}
          sx={{ textAlign: 'justify'}}
          rows={users ? users : noRows}
          columns={columns}
          rowHeight={30}
          editMode="row"
          loading={loading}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          checkboxSelection={true}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Box>
  );
}

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHistory,
  loading,
  localLogin,
} from '../../redux/login-registerActions/loginActions';
export default function Login() {
  const [error, setError] = useState({});
  const [users, setUsers] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRegisterErrors = useSelector((state) => state.loginRegisterErrors);
  const logginIn = useSelector((state) => state.logginIn);
  const actualPath = useSelector((state) => state.actualPath);
  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };

  function login(event) {
    event.preventDefault();
    dispatch(localLogin(users));
    dispatch(loading());
  }

  return (
    <div>
      {!localStorage.userLogin === true ? (
        <div className="bg-slate-300 p-4 h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
          {!logginIn ? (
            <div>
              <form onSubmit={login} className="text-center">
                <label htmlFor="Usuario" className="block mb-1">
                  Usuario:
                </label>
                {error.email ? <p>{error.email}</p> : null}
                <input
                  className="w-full px-4 py-2 border rounded mb-2"
                  name="email"
                  onChange={handleChange}
                  value={users.email}
                  type="email"
                  placeholder="Email..."
                />
                <label htmlFor="Contraseña" className="block mb-1">
                  Contraseña:
                </label>
                <input
                  className="w-full px-4 py-2 border rounded mb-4"
                  name="password"
                  onChange={handleChange}
                  value={users.password}
                  type="password"
                  placeholder="password..."
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-2">
                  Iniciar sesión
                </button>
              </form>
              <div>
                <Link to="/login/SignUp">
                  <p className="text-gray-600 hover:underline">
                    ¿No estás registrado? Regístrate aquí
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            <p>Cargando</p>
          )}
          {loginRegisterErrors ? <p>{loginRegisterErrors.message}</p> : null}
        </div>
      ) : actualPath?(
        navigate(`${actualPath}`)
      ):navigate('/')}
    </div>
  );
}

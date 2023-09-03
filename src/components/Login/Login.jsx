/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHistory,
  googleRegisterUser,
  loading,
  localLogin,
} from '../../redux/login-registerActions/loginActions';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import style from './login.module.css';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export default function Login() {
  const [error, setError] = useState({});
  const [users, setUsers] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRegisterErrors = useSelector((state) => state.loginRegisterErrors);

  const successLogin = useSelector((state) => state.successLogin);

  const logginIn = useSelector((state) => state.logginIn);
  const actualPath = useSelector((state) => state.actualPath);
  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };
  function handleError() {}

  function handleSuccess(credentials) {
    if (credentials.credential) {
      dispatch(googleRegisterUser(credentials));
      navigate('/');
    }
  }

  //LOGIN LOCAL CON PASS Y EMAIL
  function login(event) {
    event.preventDefault();
    dispatch(localLogin(users));
    dispatch(loading());
  }
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
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
              <div className={style.box}>
                <div className={style.shadow}></div>
                <div className={style.gravity}>
                  <div className={style.ball}></div>
                </div>
              </div>
            )}
            {loginRegisterErrors ? <p>{loginRegisterErrors.message}</p> : null}
          </div>
        ) : actualPath ? (
          navigate(`${actualPath}`)
        ) : (
          navigate('/')
        )}
        <div>
          <GoogleLogin
            useOneTap
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </div>
        <p>{successLogin}</p>
      </div>
    </GoogleOAuthProvider>
  );
}

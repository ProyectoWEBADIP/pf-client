/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import './SignIn.css';
import {
  clearError,
  googleRegisterUser,
  localLogin,
} from '../../../redux/login-registerActions/loginActions';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertError from '../../../assets/AlertError/AlertError';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import AlertSuccess from '../../../assets/AlertSuccess/AlertSuccess';
import { Alert } from '@mui/material';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const errors = useSelector((state) => state.errors);

  const [showPass, setPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };
  function handleError() {
    setFailed(
      <AlertError error={'Hubo un error iniciando sesión con Google.'} />
    );
    setTimeout(() => {
      setFailed(false);
    }, 3000);
  }

  async function handleSuccess(credentials) {
    setLoading(true);
    if (credentials.credential) {
      const userData = await dispatch(googleRegisterUser(credentials));
      setLoading(false);

      setSuccess(<AlertSuccess success={userData.message} />);
      setTimeout(() => {
        setSuccess(false);
        navigate('/');
      }, 3000);
    }
  }
  async function login(event) {
    event.preventDefault();
    setLoading(true);
    await dispatch(localLogin(users));
    const data = localStorage.access_token;
    setLoading(false);
    if (data) {
      setSuccess(<AlertSuccess success={'Iniciando sesión...'} />);
      setTimeout(() => {
        setSuccess(false);
        navigate('/');
      }, 3000);
    } else {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }

  return (
    <div className="conteiner-father-signIn">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        {loading ? (
          <div className="loaderLoginContainer">
            <div className="box-login">
              <div className="shadow-login"></div>
              <div className="gravity-login">
                <div className="ball-login"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-signIn">
            {success ? (
              <div className="overlay-login">
                <div className="login-success">{success}</div>
              </div>
            ) : null}
            {failed ? (
              <div className="overlay-login">
                <div className="login-success">{failed}</div>
              </div>
            ) : null}
            {errors ? (
                <div className="login-errors">
                  <AlertError />{' '}
                </div>
            ) : null}
            <div className="heading">Iniciar sesión</div>
            <div>
              <form action="" className="form-signIn" onSubmit={login}>
                <div>
                  <input
                    required
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                  />
                </div>
                <div className="password-conteiner">
                  <input
                    required
                    className="input"
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                  <span onClick={() => setPass(!showPass)}>
                    {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                </div>
                <div className="link-reg-log">
                  <div>
                    <Link to="/login/recuperacion">
                      <span className="forgot-password">
                        Olvidé mi contraseña
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link to="/login/SignUp">
                      <span className="forgot-password">Registrarme</span>
                    </Link>
                  </div>
                </div>
                <input
                  className="login-button"
                  type="submit"
                  value="Iniciar sesión"
                />
              </form>
            </div>
            <div className="social-account-container">
              <span className="title-signIn">Iniciar sesión con</span>
              <div className="social-accounts">
                <GoogleLogin onError={handleError} onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

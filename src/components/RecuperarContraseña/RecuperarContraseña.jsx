import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./RecuperarContraseña.css"; // Asegúrate de importar tu archivo CSS
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getUserByEmail,
  updateUser,
} from "../../redux/usersActions/usersActions";
import AlertError from "../../assets/AlertError/AlertError";
import AlertSuccess from "../../assets/AlertSuccess/AlertSuccess";

const RecuperarContraseña = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [emailRecuperacion, setEmailRecuperacion] = useState("");
  const [forgotPassword, setForgotPassword] = useState(1);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoVerificacionGenerado, setCodigoVerificacionGenerado] =
    useState("");
  const [password, setPassword] = useState({ value1: "", value2: "" });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const user = useSelector((state) => state.verificacionDeUsuario);

  //! Manejo de boton de cambio de contraseña
  const handleChange = (e) => {
    setEmailRecuperacion(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleChangeVerificationCode = (e) => {
    setCodigoVerificacion(e.target.value);
  };

  const handlerSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await dispatch(getUserByEmail(emailRecuperacion));
    setLoading(false);

    if (typeof response === "string") {
      setShowError(<AlertError error={response} />);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } else {
      const codigoRecuperacion =
        Math.floor(Math.random() * (9999 - 1000) + 1000) + "";

      setCodigoVerificacionGenerado(codigoRecuperacion);

      emailjs.send(
        "service_ckm9srh",
        "template_z7oue8n",
        {
          asunto: " Recuperación de Contraseña - Código de Verificación",
          to_email: emailRecuperacion,
          contexto: "Código de Verificación de A.D.I.P",
          mensaje:
            "Hemos recibido tu solicitud para restablecer la contraseña de tu cuenta en A.D.I.P. Para que puedas recuperar el acceso, te proporcionamos el código de verificación:",
          verification_code: codigoRecuperacion,
          footer: `Utiliza este código en nuestra página de recuperación de contraseña para crear una nueva contraseña segura y acceder nuevamente a tu cuenta. Recuerda que este código de verificación es válido por un tiempo limitado, así que te recomendamos utilizarlo cuanto antes. Si no solicitaste esta acción o tienes alguna pregunta, por favor, contáctanos a través de Correo de Soporte.`,
        },
        "Vfm3hxnSN68eRyMYf"
      );
      setForgotPassword(2);
    }
  };

  const verificationCode = (e) => {
    e.preventDefault();

    if (user.email == emailRecuperacion) {
      if (codigoVerificacion == codigoVerificacionGenerado) {
        setForgotPassword(3);
      } else {
        alert("Datos incorrectos");
      }
    } else {
      alert("Usuario no registrado");
      navigate("/login");
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (password.value1 === password.value2) {
      setLoading(true);
      await dispatch(updateUser(user.id, { password: password.value1 }));
      setLoading(false);
      setShowSuccess(
        <AlertSuccess
          success={
            "Su contraseña ha sido cambiada con éxito. Será redireccionado."
          }
        />
      );
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 3000);
    } else {
      setShowError(<AlertError error={"Las contraseñas no coinciden."} />);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="form-container-recuperacion-father">
      <div className="form-container-recuperacion">
        {showError ? (
          <div className="error-recuperarContra"> {showError}</div>
        ) : null}{" "}
        {showSuccess ? (
          <div className="error-recuperarContra"> {showSuccess}</div>
        ) : null}
        {loading ? (
          <div className="loading-recuperar">
            <div className="lds-roller">
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
        ) : null}
        <div className="logo-container-recuperacion">
          ¿Olvidaste tu contraseña?
        </div>
        <form className="form-recuperacion">
          {forgotPassword === 1 ? (
            <div>
              <div className="input-container-recuperacion ic2-recuperacion">
                <input
                  placeholder=""
                  type="email"
                  name="emailRecuperacion"
                  className="input-signUp"
                  id="email"
                  onChange={handleChange}
                />
                <div className="cut cut-short">
                  <label className="iLabel" htmlFor="email">
                    Email
                  </label>
                </div>
              </div>

              <button
                className="form-submit-btn-recuperacion"
                type="submit"
                onClick={handlerSendEmail}
              >
                Recuperar contraseña
              </button>

              <div>
                <Link to="/login/SignUp">
                  <span className="forgot-password">
                    ¿Aún no eres +Naranja?
                  </span>
                </Link>
              </div>
            </div>
          ) : forgotPassword === 2 ? (
            <div>
              <div>
                <div>
                  <div className="input-container-recuperacion ic2-recuperacion">
                    <input
                      placeholder=""
                      type="text"
                      className="input-signUp"
                      onChange={handleChangeVerificationCode}
                    />
                    <div className="cut cut-short">
                      <label className="iLabel" htmlFor="email">
                        Ingresa el código
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      className="form-submit-btn-recuperacion"
                      onClick={verificationCode}
                    >
                      Verificar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div>
                  <div className="input-container-recuperacion ic2-recuperacion">
                    <input
                      placeholder=""
                      type="text"
                      name="value1"
                      className="input-signUp"
                      onChange={handleChangePassword}
                    />
                    <div className="cut cut-short">
                      <label className="iLabel" htmlFor="email">
                        Nueva contraseña
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="input-container-recuperacion ic2-recuperacion">
                    <input
                      placeholder=""
                      type="text"
                      name="value2"
                      className="input-signUp"
                      onChange={handleChangePassword}
                    />
                    <div className="cut cut-short">
                      <label className="iLabel" htmlFor="email">
                        Repetir contraseña
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="form-submit-btn-recuperacion"
                  onClick={handleSubmitUser}
                >
                  Cambiar contraseña
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RecuperarContraseña;

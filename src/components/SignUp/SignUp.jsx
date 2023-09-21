import { useNavigate } from "react-router";
import "./SignUp.css";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Validation from "../Login/validaciones";
import { registerUser } from "../../redux/login-registerActions/loginActions";
import AlertError from "../../assets/AlertError/AlertError";
import AlertSuccess from "../../assets/AlertSuccess/AlertSuccess";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setPass] = useState(false);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [verificacionEmail, setVerificacionEmail] = useState(false);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoGeneradoLocalmente, setCodigoGeneradoLocalmente] = useState("");
  const [formErrors, setFormErrors] = useState(false);

  const dispatch = useDispatch();
  // esta funcion está manejando el cambio de los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Verifica si el campo está vacío y elimina el error correspondiente
    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: "",
      });
    } else {
      // Si no está vacío, realiza la validación normal
      const fieldErrors = Validation({ ...input, [name]: value });

      setErrors({
        ...errors,
        [name]: fieldErrors[name],
      });
      //valida el submit sin errores
      const hasErrors = Object.values(fieldErrors).some(
        (error) => error !== ""
      );
      setFormErrors(hasErrors);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    if (
      input.username.trim() === "" ||
      input.email.trim() === "" ||
      input.password.trim() === ""
    ) {
      return;
    }
    setVerificacionEmail(true);
    const codigoDeVerificacion =
      Math.floor(Math.random() * (9999 - 1000) + 1000) + "";
    setCodigoGeneradoLocalmente(codigoDeVerificacion);
    console.log("codigo verificacion", codigoVerificacion);
    emailjs.send(
      "service_ckm9srh",
      "template_z7oue8n",
      {
        asunto: "Verificación de Correo Electrónico - Código de Confirmación",
        to_email: input.email,
        contexto: " Código de Confirmación de A.D.I.P ",
        mensaje:
          "Para verificar la existencia de tu correo electrónico en A.D.I.P, te proporcionamos un código de confirmación:",
        verification_code: codigoDeVerificacion,
        footer:
          "Por favor, utiliza este código en nuestra página de inicio de sesión para confirmar que tu correo electrónico está registrado en nuestra plataforma. Si no solicitaste esta acción o tienes alguna pregunta, por favor, contáctanos a través de Correo de Soporte proyectoadipweb@gmail.com",
      },
      "Vfm3hxnSN68eRyMYf"
    );
  }
  const handlerCodeVerification = (event) => {
    event.preventDefault();
    setCodigoVerificacion(event.target.value);
  };

  const sendUser = async () => {
    if (codigoGeneradoLocalmente.trim() == codigoVerificacion.trim()) {
      console.log("holas");
      setLoading(true);
      const response = await dispatch(registerUser(input));
      setLoading(false);
      if (response?.registered) {
        setShowSuccess(
          <AlertSuccess
            success={"Registrado con éxito. Será redireccionado."}
          />
        );
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/login");
        }, 3000);
      } else {
        setShowError(<AlertError error={response} />);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } else {
      console.log("EntreError");
      setShowError(<AlertError error={"Código incorrecto."} />);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="form-signUp-conteiner">
      <div className="form-signUp">
        {showError ? <div className="error-register"> {showError}</div> : null}{" "}
        {showSuccess ? (
          <div className="error-register"> {showSuccess}</div>
        ) : null}
        {loading ? (
          <div className="loading-register">
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
        {!verificacionEmail ? (
          <div>
            <div className="title-signUp">Registrate</div>
            <div className="subtitle-signUp">¡Sumate a la familia naranja!</div>

            <div className="input-container ic1">
              <input
                placeholder=""
                type="text"
                className="input-signUp"
                id="firstname"
                name="username"
                onChange={handleChange}
              />
              <div className="cut">
                <label className="iLabel" htmlFor="firstname">
                  Nombre de usuario
                </label>
              </div>
              {errors.username && (
                <span className="span-SignUp">{errors.username}</span>
              )}
            </div>

            <div className="input-container ic2">
              <input
                placeholder=""
                type="text"
                className="input-signUp"
                name="email"
                onChange={handleChange}
              />
              <div className="cut">
                <label className="iLabel">Email</label>
              </div>
              {errors.email && (
                <span className="span-SignUp">{errors.email}</span>
              )}
            </div>
            <div className="input-container ic2">
              <div className="password-conteinersignUp">
                <input
                  placeholder=""
                  className="input-signUp"
                  name="password"
                  onChange={handleChange}
                  type={showPass ? "text" : "password"}
                />
                <span onClick={() => setPass(!showPass)}>
                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
              <div className="cut">
                <label className="iLabel">Contraseña</label>
              </div>
              {errors.password && (
                <span className="span-SignUp">{errors.password}</span>
              )}
            </div>
            <button
              className="submit-signUp"
              type="submit"
              onClick={handleSubmit}
              disabled={formErrors}
            >
              ¡Unirme a la familia naranja!
            </button>
          </div>
        ) : (
          <div>
            <div>
              <div className="input-container ic2">
                <input
                  className="input-signUp"
                  onChange={handlerCodeVerification}
                  required
                  name="codigoVerificacion"
                  value={codigoVerificacion}
                />
                <div className="cut">
                  <label className="iLabel">Ingresa el código de verificación que enviaremos a tu correo</label>
                </div>
              </div>
              <div>
                <button className="submit-signUp" onClick={sendUser}>
                  Verificar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;

import { useDispatch } from "react-redux";
/* eslint-disable no-unused-vars */
import {useSelector } from "react-redux";
import Validation from "./validaciones";
import { useState, useEffect } from "react";
import { registerUser } from "../../redux/login-registerActions/loginActions";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const dispatch = useDispatch();


  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      Validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const respuesta = useSelector((state) => state.loginRegisterLocal);
  console.log("==>res" ,respuesta);
  useEffect(()=>{
    if(respuesta?.includes("éxito")){
      navigate("/login")
    }
  },[respuesta, navigate])

  function handleSubmit(e) {
    e.preventDefault();
    const tieneErrors = Object.keys(error);
    console.log(tieneErrors);
    if (tieneErrors.length === 0) {
      dispatch(registerUser(input));
    } else {
      alert("Verifique los campos");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-300 p-4 text-center">
      <h1>Crea tu cuenta aquí</h1>

      <div>
        <label htmlFor="username">
          <h3>Nombre de usuario:</h3>
        </label>

        {error.username ? <p>{error.username}</p> : null}
        <input
          type="text"
          name="username"
          placeholder="Elija su nombre de usuario"
          onChange={handleChange}
          value={input.username}
          required
        />

        <h5>✔ puedes usar letras y numeros</h5>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          <h3>Correo electrónico:</h3>
        </label>

        {error.email && <p className="text-red-500">{error.email}</p>}
        <input
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          name="email"
          value={input.email}
          type="email"
          placeholder="Ingrese su correo electrónico"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          <h3>Contraseña:</h3>
        </label>

        {error.password && <p className="text-red-500">{error.password}</p>}
        <input
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
          name="password"
          value={input.password}
          type="password"
          placeholder="Ingrese su contraseña"
          required
        />
      </div>
      <hr />
      {respuesta? <h5>{respuesta}</h5> : null}
      <div>
        <h5>⚠ Debe ser mayor a 8 caracteres</h5>
        <h5>⚠ Debe contener al menos un carácter especial</h5>
      </div>
      <hr />
      <button type="submit">Crear cuenta</button>

    </form>
  );
}

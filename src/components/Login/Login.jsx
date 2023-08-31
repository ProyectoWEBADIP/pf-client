import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState({});
  const [users, setUsers] = useState({ Email: "", password: "" });

  const handlerSubmit = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="bg-slate-300 p-4 h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido</h1>
      <form className="text-center">
        <label htmlFor="Usuario" className="block mb-1">
          Usuario:
        </label>
        {error.Email ? <p>{error.Email}</p> : null}
        <input
          className="w-full px-4 py-2 border rounded mb-2"
          name="Email"
          onChange={handlerSubmit}
          value={users.Email}
          type="email"
          placeholder="email..."
        />
        <label htmlFor="Contraseña" className="block mb-1">
          Contraseña:
        </label>
        <input
          className="w-full px-4 py-2 border rounded mb-4"
          name="password"
          onChange={handlerSubmit}
          value={users.password}
          type="password"
          placeholder="password..."
        />
      </form>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-2">
        Iniciar sesión
      </button>
      <div>
        <Link to="/login/SignUp">
          <p className="text-gray-600 hover:underline">
            ¿No estás registrado? Regístrate aquí
          </p>
        </Link>
      </div>
    </div>
  );
}

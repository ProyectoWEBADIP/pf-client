/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import Validation from "./validaciones";
import { useState } from "react";
import { registerUser } from "../../redux/login-registerActions/loginActions";

export default function SingUp(){


    const [input, setInput] = useState({nombre: "", apellido: "", DNI: "", email: "", fechaNacimiento: "", imagen: "", contraseña: "", verificacionContraseña:""})
    
    const [error, setError] = useState({})

      
      const dispatch = useDispatch()
    const handleChange = (event) => {
        
        setInput({
            ...input,
            [event.target.name] : event.target.value 
        })
        setError(Validation({
            ...input,
            [event.target.name] : event.target.value
        }) )
    }
    
    function handleSubmit(){
      dispatch(registerUser(input))
    }
    return (
        <form className="bg-slate-300 p-4 text-center">
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-1">
              Nombre:
            </label>
            {error.nombre && <p className="text-red-500">{error.nombre}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              name="nombre"
              value={input.nombre}
              type="text"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellido" className="block mb-1">
              Apellido:
            </label>
            {error.apellido && <p className="text-red-500">{error.apellido}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              name="apellido"
              value={input.apellido}
              type="text"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="DNI" className="block mb-1">
              DNI:
            </label>
            {error.DNI && <p className="text-red-500">{error.DNI}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              placeholder="Sin puntos ni comas"
              onChange={handleChange}
              name="DNI"
              value={input.DNI}
              type="number"
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="fechaNacimiento" className="block mb-1">
              Fecha de nacimiento:
            </label>
            {error.fechaNacimiento && <p className="text-red-500">{error.fechaNacimiento}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              name="fechaNacimiento"
              value={input.fechaNacimiento}
              type="date"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            {error.email && <p className="text-red-500">{error.email}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              name="email"
              value={input.email}
              type="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contraseña" className="block mb-1">
              Contraseña:
            </label>
            {error.contraseña && <p className="text-red-500">{error.contraseña}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              name="contraseña"
              value={input.contraseña}
              type="password"
              placeholder="ingrese una contraseña"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contraseña" className="block mb-1">
              Verificaion de contraseña:
            </label>
            {error.verificacionContraseña && <p className="text-red-500">{error.verificacionContraseña}</p>}
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              name="verificacionContraseña"
              value={input.verificacionContraseña}
              type="password"
              placeholder="repita su contraseña"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imagen" className="block mb-1">
              Foto:
            </label>
            <input
              className="w-full px-4 py-2 border rounded"
              onChange={handleChange}
              value={input.imagen}
              type="file"
              name="imagen"
              accept="image/*"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleChange}
          >
            Registrarse
          </button>
        </form>
      
)
}
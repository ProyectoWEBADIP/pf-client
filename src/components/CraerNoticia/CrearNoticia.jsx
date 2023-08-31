import { useState } from "react"
import validation from "./validaciones"


export default function CrearNoticia ()  {

    const [ input, setInput ] = useState({titulo: "", resumen: "", descripcion: "", imagen: ""});7
    const [ error, setError ] = useState({});

    const handleChange= (event)=>{
        
      setInput({
        ...input,
        [event.target.name] : event.target.value
      })

      setError(validation(
        {
            ...error,
            [event.target.name]: event.target.value
          })
          
      )
    }
   
    console.log(error)
  
    return (
      <div className="container mx-auto">
        <form className="bg-slate-300 p-4 text-center">
        <br/>
          <div className="mb-4">
          <label htmlFor="titulo" className="block mb-1">
            Titulo 
          </label>
          <input onChange={handleChange} value={input.titulo} className="w-full px-4 py-2 border rounded" type="text" name="titulo"/>
          {error.titulo && <p>{error.titulo}</p>}
          </div>
          <br/>  
          <div className="mb-4"> 
            <label className="block mb-1" htmlFor="resumen">Resumen de noticia:</label>
            <input onChange={handleChange}  value={input.resumen} className="w-full px-4 py-2 border rounded" type="text" name="resumen" />
            {error.resumen && <p>{error.resumen}</p>}
            
          </div>
          <br/>
          <div>            
            <select name="categoria">
              <option value="default">Seleccione categoria</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Infantiles">Infantiles</option>
              <option value="Inferiores">Inferiores</option>
              <option value="Recreativo">Recreativo</option>              
            </select>
          </div>
          <br/>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="descripcion">
              Descripcion:
            </label>
            <textarea onChange={handleChange} value={input.descripcion} className="w-full px-4 py-2 border rounded" type="text" name="descripcion"/>
            {error.descripcion && <p>{error.descripcion}</p>}
          </div>             
          <br/>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="imagen">
              Foto:
            </label>
            <input className="w-full px-4 py-2 border rounded" type="file" name="imagen" accept="image/*"/>
          </div>
          
          <br/>
  
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Crear Noticia
          </button>
          
  
        </form>
      </div>
    )
  }
  

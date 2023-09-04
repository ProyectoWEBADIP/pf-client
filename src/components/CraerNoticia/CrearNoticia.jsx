import { useState } from "react"
import validation from "./validaciones"
import { Box, Container } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { Button, MenuItem } from "@mui/base";


export default function CrearNoticia ()  {

    const [ input, setInput ] = useState({titulo: "", resumen: "", descripcion: "", imagen: "", categorias: []});
    const [ error, setError ] = useState({});

    const handleChange= (event)=>{
        
      setInput({
        ...input,
        [event.target.name] : event.target.value
      })

      console.log(input)
      setError(validation(
        {
            ...error,
            [event.target.name]: event.target.value
          })
          
      )
    }
   
    console.log(error)

    const categorias = [ "femenino", "masculino", "infantiles", "inferiores", "recreativo"]
  
    return (
      <>
      <Box component="form" fullWidth>
        <TextField label="Título"  type="text" name="titulo" value={input.titulo} required onChange={handleChange} fullWidth helperText="Entre 5 y 40 caracteres" />
        {error.titulo && <Typography variant="body1">{error.titulo}</Typography>}
        
        <TextField label="Resumen"  type="text" name="resumen" value={input.resumen} required onChange={handleChange} fullWidth helperText="Hasta 100 caracteres" />
        {error.resumen && <Typography variant="body1">{error.resumen}</Typography>}
        
        <TextField label="Descripción"  type="text" name="descripcion" value={input.descripcion} required onChange={handleChange} fullWidth helperText="Hasta 2000 caracteres" />
        {error.descripcion && <Typography variant="body1">{error.descripcion}</Typography>}

        {/* <TextField select label="Seleccionar categorías" name="categorias" value={input.categorias} onChange={handleChange}  helperText="Seleccionar una o más categorías de la noticia"
        SelectProps={{ multiple: true,}} >
          {categorias.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))} 
        </TextField> */}
        
        <TextField type="file" name="imagen" accept="image/*"/>
      
        <Button type="submit" variant="outlined" >Crear noticia</Button>
      </Box>

      {/* <div className="container mx-auto">
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
      </div> */}
      </> 
    )
  }
  
